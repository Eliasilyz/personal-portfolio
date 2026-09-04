"use client"

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
  Tv,
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
  const [activeTab, setActiveTab] = useState<"search" | "preset">("preset");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const ytPlayerRef = useRef<any>(null);
  const playerContainerId = "yt-player-container-unique";
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const currentTrack = currentQueue[trackIndex] || playlist[0];
  const genreTags = ["Coldplay", "Hindia", "Feast", "NIKI", "Lofi", "Synthwave", "Anime OST", "J-Pop"];

  const safePlay = () => {
    if (ytPlayerRef.current && typeof ytPlayerRef.current.playVideo === "function") {
      try { ytPlayerRef.current.playVideo(); } catch {}
    }
  };
  const safePause = () => {
    if (ytPlayerRef.current && typeof ytPlayerRef.current.pauseVideo === "function") {
      try { ytPlayerRef.current.pauseVideo(); } catch {}
    }
  };
  const safeLoadVideo = (youtubeId: string) => {
    if (ytPlayerRef.current && typeof ytPlayerRef.current.loadVideoById === "function") {
      try { ytPlayerRef.current.loadVideoById(youtubeId); } catch {}
    }
  };
  const safeSeekTo = (seconds: number) => {
    if (ytPlayerRef.current && typeof ytPlayerRef.current.seekTo === "function") {
      try { ytPlayerRef.current.seekTo(seconds, true); } catch {}
    }
  };
  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds <= 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  useEffect(() => {
    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return;
      const containerEl = document.getElementById(playerContainerId);
      if (!containerEl) return;
      if (ytPlayerRef.current) return;
      try {
        ytPlayerRef.current = new window.YT.Player(playerContainerId, {
          host: "https://www.youtube-nocookie.com",
          height: "100%",
          width: "100%",
          videoId: currentTrack.youtubeId,
          playerVars: {
            autoplay: 0, controls: 0, disablekb: 1, fs: 0, modestbranding: 1, rel: 0, playsinline: 1, enablejsapi: 1,
            origin: typeof window !== "undefined" ? window.location.origin : undefined,
            widget_referrer: typeof window !== "undefined" ? window.location.origin : undefined,
          },
          events: {
            onReady: (event: any) => {
              setIsPlayerReady(true);
              if (typeof event.target.setVolume === "function") event.target.setVolume(volume);
            },
            onStateChange: (event: any) => {
              if (event.data === 1) setIsPlaying(true);
              else if (event.data === 2) setIsPlaying(false);
              else if (event.data === 0) { setIsPlaying(false); handleNext(); }
            },
          },
        });
      } catch {}
    };
    const loadScriptAndInit = () => {
      if (window.YT && window.YT.Player) initPlayer();
      else {
        if (!document.getElementById("yt-iframe-api")) {
          const tag = document.createElement("script");
          tag.id = "yt-iframe-api";
          tag.src = "https://www.youtube.com/iframe_api";
          const firstScriptTag = document.getElementsByTagName("script")[0];
          firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
        }
        const prevOnReady = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => { if (prevOnReady) prevOnReady(); initPlayer(); };
      }
    };
    const handleUserInteraction = () => { loadScriptAndInit(); cleanupListeners(); };
    const cleanupListeners = () => {
      window.removeEventListener("pointerdown", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
      window.removeEventListener("scroll", handleUserInteraction);
    };
    window.addEventListener("pointerdown", handleUserInteraction, { passive: true });
    window.addEventListener("keydown", handleUserInteraction, { passive: true });
    window.addEventListener("scroll", handleUserInteraction, { passive: true });
    return () => { cleanupListeners(); if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  useEffect(() => {
    if (isPlaying && isPlayerReady) {
      timerRef.current = setInterval(() => {
        if (ytPlayerRef.current && typeof ytPlayerRef.current.getCurrentTime === "function") {
          try {
            const cur = ytPlayerRef.current.getCurrentTime() || 0;
            const dur = ytPlayerRef.current.getDuration() || 0;
            setCurrentTime(cur); setDuration(dur);
          } catch {}
        }
      }, 500);
    } else { if (timerRef.current) clearInterval(timerRef.current); }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPlaying, isPlayerReady]);

  useEffect(() => {
    if (isPlayerReady && currentTrack?.youtubeId) {
      safeLoadVideo(currentTrack.youtubeId);
      if (isPlaying) safePlay();
    }
  }, [currentTrack?.youtubeId, isPlayerReady]);

  useEffect(() => {
    if (!searchQuery.trim()) { setSearchResults([]); setIsSearching(false); setSearchError(null); return; }
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setIsSearching(true); setSearchError(null);
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
          const response = await fetch(endpoint, { signal: controller.signal });
          if (response.ok) {
            const data = await response.json();
            const items = data.items || data;
            if (Array.isArray(items) && items.length > 0) {
              foundTracks = items.filter((item: any) => (item.url && item.url.includes("v=")) || item.videoId || item.id).slice(0, 12).map((item: any, idx: number) => {
                let videoId = item.videoId || item.id;
                if (!videoId && item.url) { const match = item.url.match(/v=([^&]+)/); if (match) videoId = match[1]; }
                const durationSec = item.duration || item.lengthSeconds || 200;
                const mins = Math.floor(durationSec / 60);
                const secs = Math.floor(durationSec % 60);
                const durationFormatted = `${mins}:${secs < 10 ? "0" : ""}${secs}`;
                return {
                  id: `yt-search-${videoId}-${idx}`,
                  youtubeId: videoId,
                  title: item.title || "Unknown Track",
                  artist: item.uploaderName || item.author || "YouTube Music",
                  album: "YouTube",
                  artwork: item.thumbnail || (videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : ""),
                  duration: durationFormatted,
                  source: "youtube" as const,
                };
              });
              if (foundTracks.length > 0) break;
            }
          }
        } catch (err: any) { if (err.name === "AbortError") break; }
      }
      if (!controller.signal.aborted) {
        setIsSearching(false);
        if (foundTracks.length > 0) { setSearchResults(foundTracks); setSearchError(null); }
        else { setSearchResults([]); setSearchError("No songs found."); }
      }
    }, 400);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [searchQuery]);

  const playTrack = (track: Track, newQueue?: Track[]) => {
    const queueToUse = newQueue || currentQueue;
    let index = queueToUse.findIndex((t) => t.youtubeId === track.youtubeId);
    if (newQueue) {
      setCurrentQueue(newQueue);
      if (index !== -1) setTrackIndex(index);
      else { setCurrentQueue([track, ...newQueue]); setTrackIndex(0); }
    } else {
      if (index === -1) { setCurrentQueue([track, ...currentQueue]); setTrackIndex(0); }
      else setTrackIndex(index);
    }
    setIsPlaying(true); safeLoadVideo(track.youtubeId); safePlay();
  };
  const togglePlay = () => {
    if (isPlaying) { safePause(); setIsPlaying(false); }
    else { safePlay(); setIsPlaying(true); }
  };
  const handleNext = () => {
    if (currentQueue.length === 0) return;
    let nextIdx: number;
    if (isShuffle) nextIdx = Math.floor(Math.random() * currentQueue.length);
    else nextIdx = (trackIndex + 1) % currentQueue.length;
    setTrackIndex(nextIdx); setIsPlaying(true);
  };
  const handlePrev = () => {
    if (currentQueue.length === 0) return;
    if (currentTime > 4) { safeSeekTo(0); return; }
    let prevIdx: number;
    if (isShuffle) prevIdx = Math.floor(Math.random() * currentQueue.length);
    else prevIdx = (trackIndex - 1 + currentQueue.length) % currentQueue.length;
    setTrackIndex(prevIdx); setIsPlaying(true);
  };
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setVolume(val);
    if (ytPlayerRef.current && typeof ytPlayerRef.current.setVolume === "function") {
      try { ytPlayerRef.current.setVolume(val); } catch {}
    }
    if (val === 0) setIsMuted(true); else if (isMuted) setIsMuted(false);
  };
  const toggleMute = () => {
    if (!ytPlayerRef.current) return;
    try {
      if (isMuted) { if (typeof ytPlayerRef.current.unMute === "function") ytPlayerRef.current.unMute(); setIsMuted(false); }
      else { if (typeof ytPlayerRef.current.mute === "function") ytPlayerRef.current.mute(); setIsMuted(true); }
    } catch {}
  };
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekSec = parseFloat(e.target.value);
    setCurrentTime(seekSec); safeSeekTo(seekSec);
  };

  return (
    <aside aria-label="Music Player" className="fixed bottom-5 right-5 z-50">
      <div className={`${!isMinimized && showVideo ? "w-80 sm:w-96 h-48 mb-2 rounded-[20px] overflow-hidden border border-black bg-black" : "fixed -top-[9999px] -left-[9999px] w-1 h-1 opacity-0 pointer-events-none"}`}>
        <div id={playerContainerId} className="w-full h-full" />
      </div>

      {isMinimized ? (
        <button
          onClick={() => { setIsMinimized(false); if (!isPlaying) { safePlay(); setIsPlaying(true); } }}
          className="group flex items-center gap-3 px-4 py-3 rounded-full border border-[#d4cfc6] bg-[#f7f4ef] hover:border-[#e8a020] transition-colors duration-150 shadow-lg"
          aria-label="Expand Music Player"
          title="Open Music Player"
        >
          <div className="relative w-8 h-8 rounded-full border border-[#d4cfc6] overflow-hidden bg-[#ebe8e1] shrink-0 flex items-center justify-center">
            {currentTrack?.artwork ? (
              <img src={currentTrack.artwork} alt={currentTrack.title} className={`w-full h-full object-cover ${isPlaying ? "animate-spin-slow" : ""}`} />
            ) : (
              <Music className={`w-3.5 h-3.5 ${isPlaying ? "text-[#e8a020]" : "text-[#6b6560]"}`} />
            )}
          </div>
          <div className="flex flex-col text-left max-w-[140px]">
            <span className="text-xs font-semibold truncate text-[#0f0d0a]">{currentTrack?.title || "Music Player"}</span>
            <span className="text-[11px] font-mono text-[#6b6560] truncate">{isPlaying ? currentTrack?.artist : "Tap to search · YouTube"}</span>
          </div>
          <span className="text-[#6b6560] group-hover:text-[#e8a020] pl-1">
            <Maximize2 className="w-3.5 h-3.5" />
          </span>
        </button>
      ) : (
        <div className="w-80 sm:w-96 rounded-[24px] border border-[#d4cfc6] bg-[#f7f4ef] p-4 space-y-3 animate-fadeIn shadow-2xl">
          <div className="flex items-center justify-between border-b border-[#d4cfc6] pb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#e8a020] animate-pulse" aria-hidden />
              <span className="text-xs font-mono uppercase tracking-widest text-[#0f0d0a]">YouTube Player</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button onClick={() => setShowVideo(!showVideo)} className={`p-1.5 rounded-[10px] border text-xs transition-colors ${showVideo ? "bg-[#0f0d0a] text-[#f7f4ef] border-[#0f0d0a]" : "border-[#d4cfc6] text-[#6b6560] hover:border-[#e8a020] hover:text-[#0f0d0a]"}`} title="Toggle video" aria-label="Toggle video">
                <Tv className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => setActiveTab(activeTab === "search" ? "preset" : "search")} className={`px-2.5 py-1 rounded-full text-xs font-mono uppercase tracking-wider border transition-colors ${activeTab === "search" ? "bg-[#0f0d0a] text-[#f7f4ef] border-[#0f0d0a]" : "border-[#d4cfc6] text-[#6b6560] hover:border-[#e8a020] hover:text-[#0f0d0a]"}`}>
                Search
              </button>
              <button onClick={() => setIsMinimized(true)} className="p-1.5 rounded-[10px] border border-[#d4cfc6] hover:border-[#e8a020] text-[#6b6560] hover:text-[#0f0d0a] transition-colors" aria-label="Minimize">
                <Minus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="space-y-2">
              <div className="relative flex items-center">
              <Search className="absolute left-3 w-3.5 h-3.5 text-[#6b6560]" aria-hidden="true" />
              <label htmlFor="music-search" className="sr-only">Search YouTube music</label>
              <input
                id="music-search"
                type="text"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); if (activeTab !== "search") setActiveTab("search"); }}
                onFocus={() => { if (activeTab !== "search") setActiveTab("search"); }}
                placeholder="Search track, artist…"
                aria-label="Search YouTube music"
                autoComplete="off"
                className="w-full pl-9 pr-8 py-2 rounded-full text-xs font-mono bg-[#ebe8e1] border border-[#d4cfc6] text-[#0f0d0a] placeholder:text-[#6b6560] focus:outline-none focus:border-[#e8a020] transition-colors"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-2 p-1 text-[#6b6560] hover:text-[#0f0d0a]">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px] font-mono">
              <span className="text-[#6b6560] shrink-0">Top:</span>
              {genreTags.map((genre) => (
                <button key={genre} onClick={() => { setSearchQuery(genre); setActiveTab("search"); }} className="shrink-0 px-2 py-1 rounded-full border border-[#d4cfc6] bg-[#f7f4ef] hover:border-[#e8a020] text-[#6b6560] hover:text-[#0f0d0a] transition-colors">
                  {genre}
                </button>
              ))}
            </div>
          </div>

          <div className="max-h-40 overflow-y-auto space-y-1 pr-1 custom-scrollbar border-t border-[#d4cfc6] pt-2">
            {activeTab === "search" ? (
              <div>
                {isSearching ? (
                  <div className="flex items-center justify-center gap-2 py-6 text-[#6b6560] text-xs font-mono">
                    <Loader2 className="w-4 h-4 animate-spin text-[#e8a020]" />
                    <span>Searching…</span>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="space-y-1">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-[#6b6560] px-1 pb-1">Results · {searchResults.length}</div>
                    {searchResults.map((track) => {
                      const isCurrent = currentTrack?.youtubeId === track.youtubeId;
                      return (
                        <button key={track.id} onClick={() => playTrack(track, searchResults)} className={`w-full flex items-center gap-2.5 p-1.5 rounded-[12px] text-left border transition-colors ${isCurrent ? "bg-[#e8a020]/15 border-[#e8a020] text-[#0f0d0a]" : "border-transparent hover:bg-[#ebe8e1] text-[#0f0d0a]"}`}>
                          <img src={track.artwork || `https://i.ytimg.com/vi/${track.youtubeId}/hqdefault.jpg`} alt={track.title} className="w-8 h-8 rounded-[8px] object-cover border border-[#d4cfc6] shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold truncate text-[#0f0d0a]">{track.title}</p>
                            <p className="text-[11px] font-mono text-[#6b6560] truncate">{track.artist}</p>
                          </div>
                          <span className="shrink-0 text-xs font-mono text-[#6b6560]">{isCurrent && isPlaying ? <Radio className="w-3.5 h-3.5 text-[#e8a020] animate-pulse" /> : track.duration}</span>
                        </button>
                      );
                    })}
                  </div>
                ) : searchQuery ? (
                  <div className="text-center py-6 text-xs font-mono text-[#6b6560]">
                    <p>{searchError || "No songs found."}</p>
                  </div>
                ) : (
                  <div className="text-center py-5 text-xs font-mono text-[#6b6560] space-y-1">
                    <p>Type a song or artist above to search.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-1">
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#6b6560] px-1 pb-1">Featured</div>
                {playlist.map((track) => {
                  const isCurrent = currentTrack?.youtubeId === track.youtubeId;
                  return (
                    <button key={track.id} onClick={() => playTrack(track, playlist)} className={`w-full flex items-center gap-2.5 p-1.5 rounded-[12px] text-left border transition-colors ${isCurrent ? "bg-[#e8a020]/15 border-[#e8a020] text-[#0f0d0a]" : "border-transparent hover:bg-[#ebe8e1] text-[#0f0d0a]"}`}>
                      <img src={track.artwork} alt={track.title} className="w-8 h-8 rounded-[8px] object-cover border border-[#d4cfc6] shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold truncate text-[#0f0d0a]">{track.title}</p>
                        <p className="text-[11px] font-mono text-[#6b6560] truncate">{track.artist}</p>
                      </div>
                      <span className="shrink-0 text-xs font-mono text-[#6b6560]">{isCurrent && isPlaying ? <Radio className="w-3.5 h-3.5 text-[#e8a020] animate-pulse" /> : track.duration}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-[#d4cfc6] space-y-3">
            <div className="flex items-center gap-3 border border-[#d4cfc6] bg-[#ebe8e1] p-2 rounded-[16px]">
              <div className="w-10 h-10 rounded-[10px] border border-[#d4cfc6] bg-[#f7f4ef] overflow-hidden shrink-0 relative">
                {currentTrack?.artwork ? <img src={currentTrack.artwork} alt={currentTrack.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-[#6b6560]"><Music className="w-4 h-4" /></div>}
                {isPlaying && <span className="absolute inset-0 border-2 border-[#e8a020]/30 rounded-[10px] pointer-events-none" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate text-[#0f0d0a] flex items-center gap-1.5">{currentTrack?.title || "No Track"} {isPlaying && <span className="flex gap-0.5"><span className="w-0.5 h-3 bg-[#e8a020] animate-pulse" style={{ animationDelay: "0ms" }} /><span className="w-0.5 h-2 bg-[#e8a020] animate-pulse" style={{ animationDelay: "150ms" }} /><span className="w-0.5 h-3 bg-[#e8a020] animate-pulse" style={{ animationDelay: "300ms" }} /></span>}</p>
                <p className="text-[11px] font-mono truncate text-[#0f0d0a]">{currentTrack?.artist || "—"}</p>
              </div>
            </div>

            <div className="px-2 py-1.5 rounded-full bg-[#0f0d0a] text-[#f7f4ef] text-[10px] font-mono text-center leading-none">Built with YouTube Data API — custom search, queue & volume control</div>

            <div className="space-y-1">
              <input type="range" min="0" max={duration || 100} value={currentTime} onChange={handleSeek} className="w-full h-1 bg-[#d4cfc6] appearance-none cursor-pointer accent-[#e8a020] rounded-full" />
              <div className="flex justify-between text-[11px] font-mono text-[#6b6560] tabular-nums">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <button onClick={() => setIsShuffle(!isShuffle)} aria-label="Shuffle" aria-pressed={isShuffle} className={`touch-hit p-1.5 rounded-[10px] border transition-colors ${isShuffle ? "bg-[#e8a020] text-white border-[#e8a020]" : "border-[#d4cfc6] text-[#6b6560] hover:border-[#e8a020] hover:text-[#0f0d0a]"}`} title="Shuffle"><Shuffle className="w-3.5 h-3.5" aria-hidden="true" /></button>
                <button onClick={() => setIsRepeat(!isRepeat)} aria-label="Repeat track" aria-pressed={isRepeat} className={`touch-hit p-1.5 rounded-[10px] border transition-colors ${isRepeat ? "bg-[#e8a020] text-white border-[#e8a020]" : "border-[#d4cfc6] text-[#6b6560] hover:border-[#e8a020] hover:text-[#0f0d0a]"}`} title="Repeat"><Repeat className="w-3.5 h-3.5" aria-hidden="true" /></button>
              </div>
              <div className="flex items-center gap-1.5">
                <button onClick={handlePrev} className="touch-hit p-1.5 rounded-[10px] border border-[#d4cfc6] hover:border-[#e8a020] text-[#0f0d0a] transition-colors" aria-label="Previous"><SkipBack className="w-4 h-4" /></button>
                <button onClick={togglePlay} className="touch-hit p-2.5 rounded-[12px] bg-[#0f0d0a] text-[#f7f4ef] hover:bg-[#e8a020] hover:text-black transition-colors" aria-label={isPlaying ? "Pause" : "Play"}>
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                </button>
                <button onClick={handleNext} className="touch-hit p-1.5 rounded-[10px] border border-[#d4cfc6] hover:border-[#e8a020] text-[#0f0d0a] transition-colors" aria-label="Next"><SkipForward className="w-4 h-4" /></button>
              </div>
              <div className="flex items-center gap-1.5">
                <button onClick={toggleMute} className="touch-hit p-1 text-[#6b6560] hover:text-[#0f0d0a] transition-colors" aria-label="Mute">{isMuted || volume === 0 ? <VolumeX className="w-3.5 h-3.5 text-[#e8a020]" /> : <Volume2 className="w-3.5 h-3.5" />}</button>
                <input type="range" min="0" max="100" value={isMuted ? 0 : volume} onChange={handleVolumeChange} className="w-14 h-1 bg-[#d4cfc6] appearance-none cursor-pointer accent-[#e8a020] rounded-full" aria-label="Volume" />
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
