export interface Track {
  id: string;
  youtubeId: string;
  title: string;
  artist: string;
  album?: string;
  artwork?: string;
  duration?: string;
  source?: "youtube" | "preset";
}

export const playlist: Track[] = [
  {
    id: "preset-1",
    youtubeId: "jfKfPfyJRdk",
    title: "Lofi Girl - Beats to Relax/Study to",
    artist: "Lofi Girl",
    album: "Lofi Beats",
    artwork: "https://i.ytimg.com/vi/jfKfPfyJRdk/hqdefault.jpg",
    duration: "Live Stream",
    source: "preset",
  },
  {
    id: "preset-2",
    youtubeId: "4xDzrJKXOOY",
    title: "Synthwave Radio - Chill Synth / Retro Beats",
    artist: "Lofi Girl Synthwave",
    album: "Neon Chill",
    artwork: "https://i.ytimg.com/vi/4xDzrJKXOOY/hqdefault.jpg",
    duration: "Live Stream",
    source: "preset",
  },
  {
    id: "preset-3",
    youtubeId: "cWrSjCZ5AeE",
    title: "Evaluasi",
    artist: "Hindia",
    album: "Menari Dalam Bayangan",
    artwork: "https://i.ytimg.com/vi/cWrSjCZ5AeE/hqdefault.jpg",
    duration: "3:24",
    source: "preset",
  },
  {
    id: "preset-4",
    youtubeId: "E7kHvjvU6JY",
    title: "Hati-Hati di Jalan",
    artist: "Tulus",
    album: "Manusia",
    artwork: "https://i.ytimg.com/vi/E7kHvjvU6JY/hqdefault.jpg",
    duration: "4:02",
    source: "preset",
  },
  {
    id: "preset-5",
    youtubeId: "TURbeWK62zp",
    title: "Coding in the Rain - Deep Work Lofi",
    artist: "Chillhop Music",
    album: "Deep Work Session",
    artwork: "https://i.ytimg.com/vi/TURbeWK62zp/hqdefault.jpg",
    duration: "3:45:00",
    source: "preset",
  },
];
