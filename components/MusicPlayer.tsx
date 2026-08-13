import React, { useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Music,
  Minus,
  Maximize2,
  Search,
  X,
  Loader2,
  Radio,
  Repeat,
  Shuffle,
  Sparkles,
  Tv,
  Youtube
} from "lucide-react";
import { playlist, Track } from "../content/playlist";
import { useLanguage } from "../lib/LanguageProvider";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

export default function MusicPlayer() {
  const { t } = useLanguage();

  // Player States
  const [currentQueue, setCurrentQueue] = useState<Track[]>(playlist);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  // Search & Tab States
  const [activeTab, setActiveTab] = useState<"search" | "preset">("preset");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  // YouTube Player Ref
  const ytPlayerRef = useRef<any>(null);
  const playerContainerId = "yt-player-container-unique";
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentTrack = currentQueue[trackIndex] || playlist[0];

  // Quick genre recommendation tags
  const genreTags = ["Coldplay", "Hindia", "Feast", "NIKI", "Lofi Beats", "Synthwave", "Anime OST", "J-Pop"];

  // Safe YouTube API Helper Functions
  const safePlay = () => {
    if (ytPlayerRef.current && typeof ytPlayerRef.current.playVideo === "function") {
      try {
        ytPlayerRef.current.playVideo();
      } catch (e) {
        console.warn("YouTube playVideo error:", e);
      }
    }
  };

  const safePause = () => {
    if (ytPlayerRef.current && typeof ytPlayerRef.current.pauseVideo === "function") {
      try {
        ytPlayerRef.current.pauseVideo();
      } catch (e) {
        console.warn("YouTube pauseVideo error:", e);
      }
    }
  };

  const safeLoadVideo = (youtubeId: string) => {
    if (ytPlayerRef.current && typeof ytPlayerRef.current.loadVideoById === "function") {
      try {
        ytPlayerRef.current.loadVideoById(youtubeId);
      } catch (e) {
        console.warn("YouTube loadVideoById error:", e);
      }
    }
  };

  const safeSeekTo = (seconds: number) => {
    if (ytPlayerRef.current && typeof ytPlayerRef.current.seekTo === "function") {
      try {
        ytPlayerRef.current.seekTo(seconds, true);
      } catch (e) {
        console.warn("YouTube seekTo error:", e);
      }
    }
  };

  // Helper format time
  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds <= 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Initialize YouTube IFrame API
  useEffect(() => {
    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return;

      const containerEl = document.getElementById(playerContainerId);
      if (!containerEl) return;

      if (ytPlayerRef.current) return; // Already initialized

      try {
        ytPlayerRef.current = new window.YT.Player(playerContainerId, {
          height: "100%",
          width: "100%",
          videoId: currentTrack.youtubeId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            rel: 0,
            playsinline: 1,
          },
          events: {
            onReady: (event: any) => {
              setIsPlayerReady(true);
              if (typeof event.target.setVolume === "function") {
                event.target.setVolume(volume);
              }
            },
            onStateChange: (event: any) => {
              // YT.PlayerState: 1 = PLAYING, 2 = PAUSED, 0 = ENDED
              if (event.data === 1) {
                setIsPlaying(true);
              } else if (event.data === 2) {
                setIsPlaying(false);
              } else if (event.data === 0) {
                setIsPlaying(false);
                handleNext();
              }
            },
          },
        });
      } catch (err) {
        console.warn("Failed to construct YT.Player:", err);
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      if (!document.getElementById("yt-iframe-api")) {
        const tag = document.createElement("script");
        tag.id = "yt-iframe-api";
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      }

      const prevOnReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevOnReady) prevOnReady();
        initPlayer();
      };
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Sync Progress Bar and Duration
  useEffect(() => {
    if (isPlaying && isPlayerReady) {
      timerRef.current = setInterval(() => {
        if (ytPlayerRef.current && typeof ytPlayerRef.current.getCurrentTime === "function") {
          try {
            const cur = ytPlayerRef.current.getCurrentTime() || 0;
            const dur = ytPlayerRef.current.getDuration() || 0;
            setCurrentTime(cur);
            setDuration(dur);
          } catch (e) {
            // Ignore error during state transitions
          }
        }
      }, 500);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isPlayerReady]);

  // Load new track when currentTrack changes
  useEffect(() => {
    if (isPlayerReady && currentTrack?.youtubeId) {
      safeLoadVideo(currentTrack.youtubeId);
      if (isPlaying) {
        safePlay();
      }
    }
  }, [currentTrack?.youtubeId, isPlayerReady]);

  // Multi-endpoint YouTube Search (Piped API & Invidious API)
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      setSearchError(null);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setIsSearching(true);
      setSearchError(null);

      const searchEndpoints = [
        `https://api.piped.private.coffee/search?q=${encodeURIComponent(searchQuery)}&filter=music_songs`,
        `https://pipedapi.kavin.rocks/search?q=${encodeURIComponent(searchQuery)}&filter=music_songs`,
        `https://inv.id.my.id/api/v1/search?q=${encodeURIComponent(searchQuery)}&type=video`,
        `https://invidious.nerdvpn.de/api/v1/search?q=${encodeURIComponent(searchQuery)}&type=video`,
      ];

      let foundTracks: Track[] = [];

      for (const endpoint of searchEndpoints) {
        if (controller.signal.aborted) break;

        try {
          const response = await fetch(endpoint, {
            signal: controller.signal,
          });

          if (response.ok) {
            const data = await response.json();
            const items = data.items || data;

            if (Array.isArray(items) && items.length > 0) {
              foundTracks = items
                .filter((item: any) => (item.url && item.url.includes("v=")) || item.videoId || item.id)
                .slice(0, 16)
                .map((item: any, idx: number) => {
                  let videoId = item.videoId || item.id;
                  if (!videoId && item.url) {
                    const match = item.url.match(/v=([^&]+)/);
                    if (match) videoId = match[1];
                  }

                  const durationSec = item.duration || item.lengthSeconds || 200;
                  const mins = Math.floor(durationSec / 60);
                  const secs = Math.floor(durationSec % 60);
                  const durationFormatted = `${mins}:${secs < 10 ? "0" : ""}${secs}`;

                  const titleStr = item.title || "Unknown Track";
                  const artistStr = item.uploaderName || item.author || "YouTube Music";
                  const artworkUrl = item.thumbnail || (videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : "");

                  return {
                    id: `yt-search-${videoId}-${idx}`,
                    youtubeId: videoId,
                    title: titleStr,
                    artist: artistStr,
                    album: "Full YouTube Song",
                    artwork: artworkUrl,
                    duration: durationFormatted,
                    source: "youtube" as const,
                  };
                });

              if (foundTracks.length > 0) {
                break;
              }
            }
          }
        } catch (err: any) {
          if (err.name === "AbortError") break;
        }
      }

      if (!controller.signal.aborted) {
        setIsSearching(false);
        if (foundTracks.length > 0) {
          setSearchResults(foundTracks);
          setSearchError(null);
        } else {
          setSearchResults([]);
          setSearchError("No songs found. Try a different artist or title.");
        }
      }
    }, 400);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [searchQuery]);

  // Play Specified Track
  const playTrack = (track: Track, newQueue?: Track[]) => {
    const queueToUse = newQueue || currentQueue;
    let index = queueToUse.findIndex((t) => t.youtubeId === track.youtubeId);

    if (newQueue) {
      setCurrentQueue(newQueue);
      if (index !== -1) {
        setTrackIndex(index);
      } else {
        setCurrentQueue([track, ...newQueue]);
        setTrackIndex(0);
      }
    } else {
      if (index === -1) {
        setCurrentQueue([track, ...currentQueue]);
        setTrackIndex(0);
      } else {
        setTrackIndex(index);
      }
    }

    setIsPlaying(true);
    safeLoadVideo(track.youtubeId);
    safePlay();
  };

  // Toggle Play/Pause
  const togglePlay = () => {
    if (isPlaying) {
      safePause();
      setIsPlaying(false);
    } else {
      safePlay();
      setIsPlaying(true);
    }
  };

  // Next Track
  const handleNext = () => {
    if (currentQueue.length === 0) return;

    let nextIdx: number;
    if (isShuffle) {
      nextIdx = Math.floor(Math.random() * currentQueue.length);
    } else {
      nextIdx = (trackIndex + 1) % currentQueue.length;
    }

    setTrackIndex(nextIdx);
    setIsPlaying(true);
  };

  // Prev Track
  const handlePrev = () => {
    if (currentQueue.length === 0) return;

    if (currentTime > 4) {
      safeSeekTo(0);
      return;
    }

    let prevIdx: number;
    if (isShuffle) {
      prevIdx = Math.floor(Math.random() * currentQueue.length);
    } else {
      prevIdx = (trackIndex - 1 + currentQueue.length) % currentQueue.length;
    }

    setTrackIndex(prevIdx);
    setIsPlaying(true);
  };

  // Volume Change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setVolume(val);
    if (ytPlayerRef.current && typeof ytPlayerRef.current.setVolume === "function") {
      try {
        ytPlayerRef.current.setVolume(val);
      } catch (err) {}
    }
    if (val === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  // Mute Toggle
  const toggleMute = () => {
    if (!ytPlayerRef.current) return;
    try {
      if (isMuted) {
        if (typeof ytPlayerRef.current.unMute === "function") ytPlayerRef.current.unMute();
        setIsMuted(false);
      } else {
        if (typeof ytPlayerRef.current.mute === "function") ytPlayerRef.current.mute();
        setIsMuted(true);
      }
    } catch (e) {}
  };

  // Seek
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekSec = parseFloat(e.target.value);
    setCurrentTime(seekSec);
    safeSeekTo(seekSec);
  };

  return (
    <aside
      aria-label="Floating Music Player"
      className="fixed bottom-5 right-5 z-50 transition-all duration-300"
    >
      {/* PERSISTENT YOUTUBE IFRAME CONTAINER (Always in DOM) */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          !isMinimized && showVideo
            ? "w-80 sm:w-96 h-48 mb-2 rounded-2xl bg-black border border-slate-800 shadow-2xl"
            : "fixed -top-[9999px] -left-[9999px] w-1 h-1 opacity-0 pointer-events-none"
        }`}
      >
        <div id={playerContainerId} className="w-full h-full" />
      </div>

      {/* MINIMIZED FLOATING BADGE */}
      {isMinimized ? (
        <button
          onClick={() => {
            setIsMinimized(false);
            if (!isPlaying) {
              safePlay();
              setIsPlaying(true);
            }
          }}
          className={`group flex items-center space-x-3 px-4 py-3 rounded-full shadow-2xl backdrop-blur-xl border transition-all duration-300 transform hover:scale-105 ${
            isPlaying
              ? "bg-slate-900/90 border-emerald-500/50 text-emerald-400 shadow-emerald-500/20"
              : "bg-slate-900/90 border-slate-700/70 text-slate-200 hover:border-slate-500"
          }`}
          aria-label="Expand Music Player"
          title="Open Music Player & Search Full Songs"
        >
          {/* Cover Art / Icon */}
          <div className="relative w-7 h-7 rounded-full overflow-hidden flex items-center justify-center bg-slate-800 border border-slate-700 shrink-0">
            {currentTrack?.artwork ? (
              <img
                src={currentTrack.artwork}
                alt={currentTrack.title}
                className={`w-full h-full object-cover ${isPlaying ? "animate-spin-slow" : ""}`}
              />
            ) : (
              <Music className={`w-3.5 h-3.5 ${isPlaying ? "text-emerald-400 animate-pulse" : ""}`} />
            )}
            {isPlaying && (
              <span className="absolute inset-0 bg-emerald-500/20 animate-ping rounded-full" />
            )}
          </div>

          <div className="flex flex-col text-left max-w-[130px]">
            <span className="text-xs font-bold truncate text-slate-100">
              {currentTrack?.title || "YouTube Player"}
            </span>
            <span className="text-[10px] text-slate-400 truncate">
              {isPlaying ? currentTrack?.artist : "Search full YouTube songs"}
            </span>
          </div>

          <div className="flex items-center space-x-1 pl-1 text-slate-400 group-hover:text-white">
            <Search className="w-3.5 h-3.5" />
            <Maximize2 className="w-3.5 h-3.5" />
          </div>
        </button>
      ) : (
        /* EXPANDED MINI PLAYER & MUSIC SEARCH WINDOW */
        <div className="w-80 sm:w-96 rounded-2xl bg-slate-950/95 border border-slate-800 text-slate-100 shadow-2xl backdrop-blur-2xl p-4 space-y-3 transition-all animate-fadeIn">
          {/* Top Header */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20 flex items-center space-x-1">
                <Youtube className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                YouTube Music Player
              </span>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={() => setShowVideo(!showVideo)}
                className={`p-1.5 rounded-lg text-xs font-medium transition-colors flex items-center space-x-1 ${
                  showVideo
                    ? "bg-red-500/20 text-red-400 border border-red-500/30"
                    : "bg-slate-800/60 text-slate-400 hover:text-white"
                }`}
                title="Toggle Video Display"
              >
                <Tv className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setActiveTab(activeTab === "search" ? "preset" : "search")}
                className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors flex items-center space-x-1 ${
                  activeTab === "search"
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-slate-800/60 text-slate-400 hover:text-white"
                }`}
                title="Search YouTube Music"
              >
                <Search className="w-3 h-3" />
                <span>Search</span>
              </button>

              <button
                onClick={() => setIsMinimized(true)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                aria-label="Minimize Player"
                title="Minimize Player"
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* SEARCH INPUT BAR */}
          <div className="space-y-2">
            <div className="relative flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab !== "search") setActiveTab("search");
                }}
                onFocus={() => {
                  if (activeTab !== "search") setActiveTab("search");
                }}
                placeholder="Search full track, artist, or YouTube song..."
                className="w-full pl-9 pr-8 py-2 text-xs bg-slate-900 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-red-500/80 focus:ring-1 focus:ring-red-500/40 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 p-1 text-slate-400 hover:text-white"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Genre Recommendation Chips */}
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
              <span className="text-slate-500 shrink-0 font-semibold px-0.5">Top:</span>
              {genreTags.map((genre) => (
                <button
                  key={genre}
                  onClick={() => {
                    setSearchQuery(genre);
                    setActiveTab("search");
                  }}
                  className="shrink-0 px-2 py-0.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-red-400 transition-colors"
                >
                  #{genre}
                </button>
              ))}
            </div>
          </div>

          {/* CONTENT PANEL: SEARCH RESULTS OR PRESET PLAYLIST */}
          <div className="max-h-40 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
            {activeTab === "search" ? (
              /* SEARCH TAB RESULTS */
              <div>
                {isSearching ? (
                  <div className="flex items-center justify-center space-x-2 py-6 text-slate-400 text-xs">
                    <Loader2 className="w-4 h-4 animate-spin text-red-400" />
                    <span>Searching YouTube...</span>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 px-1 pb-1">
                      <span>YouTube Songs ({searchResults.length})</span>
                      <span className="text-[10px] text-emerald-400 font-mono">Full Duration</span>
                    </div>
                    {searchResults.map((track) => {
                      const isCurrent = currentTrack?.youtubeId === track.youtubeId;
                      return (
                        <button
                          key={track.id}
                          onClick={() => playTrack(track, searchResults)}
                          className={`w-full flex items-center space-x-2.5 p-1.5 rounded-xl text-left transition-all group ${
                            isCurrent
                              ? "bg-red-500/15 border border-red-500/30 text-red-400"
                              : "hover:bg-slate-900 border border-transparent text-slate-300"
                          }`}
                        >
                          <img
                            src={track.artwork || `https://i.ytimg.com/vi/${track.youtubeId}/hqdefault.jpg`}
                            alt={track.title}
                            className="w-8 h-8 rounded-lg object-cover shrink-0 border border-slate-800"
                          />
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs font-semibold truncate ${isCurrent ? "text-red-400" : "text-slate-200 group-hover:text-white"}`}>
                              {track.title}
                            </p>
                            <p className="text-[10px] text-slate-400 truncate">
                              {track.artist}
                            </p>
                          </div>
                          <div className="shrink-0 text-xs font-mono text-slate-400">
                            {isCurrent && isPlaying ? (
                              <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                            ) : (
                              <span>{track.duration}</span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : searchQuery ? (
                  <div className="text-center py-6 text-xs text-slate-400">
                    <p>{searchError || "No YouTube songs found."}</p>
                  </div>
                ) : (
                  <div className="text-center py-5 text-xs text-slate-400 space-y-1">
                    <Sparkles className="w-5 h-5 mx-auto text-red-400 opacity-80" />
                    <p>Type any song name, singer, or band above to search full YouTube tracks!</p>
                  </div>
                )}
              </div>
            ) : (
              /* PRESET PLAYLIST TAB */
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 px-1 pb-1">
                  <span>Featured Playlist</span>
                  <span className="text-[10px] text-emerald-400 font-mono">Full Audio</span>
                </div>
                {playlist.map((track) => {
                  const isCurrent = currentTrack?.youtubeId === track.youtubeId;
                  return (
                    <button
                      key={track.id}
                      onClick={() => playTrack(track, playlist)}
                      className={`w-full flex items-center space-x-2.5 p-1.5 rounded-xl text-left transition-all group ${
                        isCurrent
                          ? "bg-red-500/15 border border-red-500/30 text-red-400"
                          : "hover:bg-slate-900 border border-transparent text-slate-300"
                      }`}
                    >
                      <img
                        src={track.artwork}
                        alt={track.title}
                        className="w-8 h-8 rounded-lg object-cover shrink-0 border border-slate-800"
                      />
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-semibold truncate ${isCurrent ? "text-red-400" : "text-slate-200 group-hover:text-white"}`}>
                          {track.title}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate">{track.artist}</p>
                      </div>
                      <div className="shrink-0 text-xs font-mono text-slate-400">
                        {isCurrent && isPlaying ? (
                          <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                        ) : (
                          <span>{track.duration}</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* NOW PLAYING DISPLAY & PLAYER CONTROLS */}
          <div className="pt-2 border-t border-slate-800 space-y-2.5">
            {/* Active Track Info Card */}
            <div className="flex items-center space-x-3 bg-slate-900/80 p-2 rounded-xl border border-slate-800">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-700 bg-slate-800">
                {currentTrack?.artwork ? (
                  <img
                    src={currentTrack.artwork}
                    alt={currentTrack.title}
                    className={`w-full h-full object-cover ${isPlaying ? "scale-105 transition-transform duration-500" : ""}`}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-red-400">
                    <Music className="w-5 h-5" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-1.5">
                  <h4 className="text-xs font-bold text-white truncate">
                    {currentTrack?.title || "No Track Selected"}
                  </h4>
                </div>
                <p className="text-[11px] text-slate-400 truncate">
                  {currentTrack?.artist || "Unknown Artist"}
                </p>
              </div>
            </div>

            {/* SEEK BAR & TIME DISPLAY */}
            <div className="space-y-1">
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* CONTROLS ROW */}
            <div className="flex items-center justify-between">
              {/* Left toggles: Shuffle & Repeat */}
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setIsShuffle(!isShuffle)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isShuffle ? "text-red-400 bg-red-500/10" : "text-slate-500 hover:text-slate-300"
                  }`}
                  title="Shuffle"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setIsRepeat(!isRepeat)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isRepeat ? "text-red-400 bg-red-500/10" : "text-slate-500 hover:text-slate-300"
                  }`}
                  title="Repeat Track"
                >
                  <Repeat className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Main Playback Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrev}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                  aria-label="Previous Track"
                  title="Previous Track"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                <button
                  onClick={togglePlay}
                  className="p-2.5 rounded-xl bg-red-500 hover:bg-red-400 text-white font-bold transition-all transform hover:scale-105 active:scale-95 shadow-md shadow-red-500/20"
                  aria-label={isPlaying ? "Pause" : "Play"}
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-current" />
                  ) : (
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  )}
                </button>

                <button
                  onClick={handleNext}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                  aria-label="Next Track"
                  title="Next Track"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>

              {/* Right: Volume Control */}
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={toggleMute}
                  className="text-slate-400 hover:text-white transition-colors p-1"
                  aria-label="Toggle mute"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-14 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500"
                  aria-label="Volume"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

