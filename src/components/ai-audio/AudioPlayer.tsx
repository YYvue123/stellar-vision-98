import { Play, Pause, SkipBack, SkipForward, Volume2, X } from "lucide-react";
import type { Track } from "@/pages/AIAudio";

interface Props {
  track: Track;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onClose: () => void;
}

export const AudioPlayer = ({ track, isPlaying, onTogglePlay, onClose }: Props) => {
  return (
    <div className="fixed bottom-[68px] lg:bottom-4 left-0 right-0 z-50">
      {/* On large screens, offset to match right column; full width on mobile */}
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="lg:ml-[296px]">
          <div className="flex items-center gap-4 rounded-xl border border-border/40 bg-card/95 px-4 py-3 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
            {/* Track info */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <img
                src={track.cover}
                alt={track.title}
                className="h-10 w-10 rounded-lg object-cover flex-shrink-0"
              />
              <div className="min-w-0">
                <p className="text-sm font-medium text-title truncate">{track.title}</p>
                <p className="text-xs text-body-caption">{track.genre}</p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <button className="cursor-pointer text-body-secondary transition-colors hover:text-title">
                <SkipBack className="h-4 w-4" />
              </button>
              <button
                onClick={onTogglePlay}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
              </button>
              <button className="cursor-pointer text-body-secondary transition-colors hover:text-title">
                <SkipForward className="h-4 w-4" />
              </button>
            </div>

            {/* Mobile close button */}
            <button onClick={onClose} className="sm:hidden cursor-pointer text-body-secondary transition-colors hover:text-title">
              <X className="h-4 w-4" />
            </button>

            {/* Progress + volume (desktop) */}
            <div className="hidden sm:flex items-center gap-3 flex-1 justify-end">
              <span className="text-xs text-body-caption">0:00 / 3:24</span>
              <div className="h-1 w-24 rounded-full bg-border overflow-hidden">
                <div className="h-full w-1/3 rounded-full bg-primary" />
              </div>
              <Volume2 className="h-4 w-4 text-body-secondary" />
              <button onClick={onClose} className="cursor-pointer text-body-secondary transition-colors hover:text-title ml-2">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
