import { Headphones, FileText, Mic, Music, Play, Pause } from "lucide-react";
import type { Track } from "@/pages/AIAudio";

import cover1 from "@/assets/cover1.jpg";
import cover2 from "@/assets/cover2.jpg";
import cover3 from "@/assets/cover3.jpg";
import cover4 from "@/assets/cover4.jpg";
import cover5 from "@/assets/cover5.jpg";

const tracks: Track[] = [
  { id: "1", title: "자아 진채성", genre: "K-Pop", cover: cover1 },
  { id: "2", title: "Your Dark Eyes", genre: "Jazz", cover: cover2 },
  { id: "3", title: "Misaligned Emotions", genre: "Italo disco", cover: cover3 },
  { id: "4", title: "Living on Hope", genre: "Soul", cover: cover4 },
  { id: "5", title: "Missing Youth", genre: "Folk", cover: cover5 },
];

const features = [
  { icon: Headphones, title: "音效", desc: "生成各种音效素材" },
  { icon: FileText, title: "博客", desc: "音频相关资讯" },
  { icon: Mic, title: "配音", desc: "AI 智能配音" },
  { icon: Music, title: "文本转音频", desc: "即将推出", disabled: true },
];

interface Props {
  onPlay: (track: Track) => void;
  currentTrack: Track | null;
  isPlaying: boolean;
}

export const ExploreCards = ({ onPlay, currentTrack, isPlaying }: Props) => {
  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="text-center py-8">
        <p className="text-2xl font-semibold text-title">👏🏻 欢迎使用 Rita</p>
        <p className="mt-2 text-sm text-body-secondary">
          这是你的专属音乐空间！说出灵感，音乐立刻开始制作！✨
        </p>
      </div>

      {/* Explore section */}
      <div className="rounded-xl border border-border/40 bg-card p-5">
        <h2 className="mb-4 text-lg font-semibold text-title">探索</h2>

        {/* Music cards - horizontal scroll on mobile, grid on desktop */}
        <div className="flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-5 sm:overflow-visible">
          {tracks.map((track) => {
            const active = currentTrack?.id === track.id && isPlaying;
            return (
              <div
                key={track.id}
                className="group relative min-w-[140px] flex-shrink-0 cursor-pointer sm:min-w-0"
                onClick={() => onPlay(track)}
              >
                <div className="relative overflow-hidden rounded-xl aspect-square">
                  <img
                    src={track.cover}
                    alt={track.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Play overlay */}
                  <div className={`absolute inset-0 flex items-end justify-end p-2 transition-opacity duration-200 ${
                    active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                      {active ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-sm font-medium text-title truncate">{track.title}</p>
                <p className="text-xs text-body-caption">{track.genre}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {features.map((c) => (
          <button
            key={c.title}
            disabled={c.disabled}
            className={`group cursor-pointer rounded-xl border border-border/40 bg-card p-4 text-left shadow-sm transition-all duration-200 hover:bg-hover-bg hover:shadow-md ${
              c.disabled ? "cursor-not-allowed opacity-60" : ""
            }`}
          >
            <div className="mb-3 inline-flex rounded-lg bg-gradient-to-br from-theme-purple/20 to-theme-green/20 p-2.5">
              <c.icon className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm font-medium text-title">{c.title}</p>
            <p className="mt-0.5 text-xs text-body-caption">{c.desc}</p>
            {c.disabled && (
              <span className="mt-2 inline-block rounded-full bg-card-secondary px-2 py-0.5 text-[10px] text-body-caption">
                即将推出
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
