import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("q") || "";

  if (!query.trim()) {
    return NextResponse.json({ results: [] });
  }

  try {
    // 1. Try Piped API instances first for fast structured metadata
    const pipedInstances = [
      `https://api.piped.private.coffee/search?q=${encodeURIComponent(query)}&filter=music_songs`,
      `https://pipedapi.kavin.rocks/search?q=${encodeURIComponent(query)}&filter=music_songs`,
    ];

    for (const endpoint of pipedInstances) {
      try {
        const res = await fetch(endpoint, {
          headers: { "User-Agent": "Mozilla/5.0" },
          next: { revalidate: 60 },
          signal: AbortSignal.timeout(3000),
        });

        if (res.ok) {
          const data = await res.json();
          const items = data.items || data;
          if (Array.isArray(items) && items.length > 0) {
            const results = items
              .filter((item: any) => item.type === "stream" || item.url?.includes("/watch?v="))
              .slice(0, 15)
              .map((item: any) => {
                const videoId = item.url ? item.url.replace("/watch?v=", "") : item.id;
                const durationSec = item.duration || 180;
                const mins = Math.floor(durationSec / 60);
                const secs = Math.floor(durationSec % 60);
                const durationStr = `${mins}:${secs < 10 ? "0" : ""}${secs}`;

                return {
                  id: `yt-${videoId}`,
                  youtubeId: videoId,
                  title: item.title || "Unknown Title",
                  artist: item.uploaderName || "YouTube Music",
                  album: "YouTube Track",
                  artwork: item.thumbnail || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
                  duration: durationStr,
                  durationSec: durationSec,
                };
              });

            if (results.length > 0) {
              return NextResponse.json({ results });
            }
          }
        }
      } catch (e) {
        // Continue to fallback
      }
    }

    // 2. Direct YouTube Scraping Fallback
    const ytUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    const ytRes = await fetch(ytUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
      signal: AbortSignal.timeout(4000),
    });

    if (ytRes.ok) {
      const html = await ytRes.text();
      // Extract video items from YouTube initial response
      const videoMatches = [
        ...html.matchAll(
          /"videoRenderer":\{"videoId":"([^"]+)".*?"title":\{"runs":\[\{"text":"([^"]+)"\}[^}]*\}\}.*?"ownerText":\{"runs":\[\{"text":"([^"]+)"/g
        ),
      ];

      if (videoMatches.length > 0) {
        const results = videoMatches.slice(0, 15).map((match) => {
          const videoId = match[1];
          const title = match[2];
          const artist = match[3] || "YouTube Artist";

          return {
            id: `yt-${videoId}`,
            youtubeId: videoId,
            title: title,
            artist: artist,
            album: "YouTube Track",
            artwork: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
            duration: "Full Song",
            durationSec: 200,
          };
        });

        return NextResponse.json({ results });
      }
    }

    return NextResponse.json({ results: [] });
  } catch (error) {
    console.error("YouTube search error:", error);
    return NextResponse.json({ results: [], error: "Search failed" }, { status: 500 });
  }
}
