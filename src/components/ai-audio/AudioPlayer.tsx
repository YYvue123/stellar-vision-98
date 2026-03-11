import { useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, X } from "lucide-react";
import type { Track } from "@/pages/AIAudio";

interface Props {
  track: Track;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onClose: () => void;
}

export const AudioPlayer = ({ track, isPlaying, onTogglePlay, onClose }: Props) => {
  const [volume, setVolume] = useState(80);
  const [prevVolume, setPrevVolume] = useState(80);
  const [showMobileVolume, setShowMobileVolume] = useState(false);

  const toggleMute = () => {
    if (volume > 0) {
      setPrevVolume(volume);
      setVolume(0);
    } else {
      setVolume(prevVolume);
    }
  };

  return (
    <div className="fixed bottom-[68px] lg:bottom-4 left-0 right-0 z-50">
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

            {/* Mobile: volume + close */}
            <div className="flex sm:hidden items-center gap-2">
              <div className="relative">
                <button
                  onClick={() => setShowMobileVolume(!showMobileVolume)}
                  className="cursor-pointer text-body-secondary transition-colors hover:text-title"
                >
                  {volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </button>
                {/* Vertical volume slider popup */}
                {showMobileVolume && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 flex flex-col items-center rounded-xl border border-border/40 bg-card/95 backdrop-blur-md shadow-lg px-2.5 py-3">
                    <div className="relative w-4 h-28 flex justify-center">
                      <div className="absolute w-1 h-full rounded-full bg-border overflow-hidden">
                        <div
                          className="absolute bottom-0 w-full rounded-full bg-primary"
                          style={{ height: `${volume}%` }}
                        />
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={volume}
                        onChange={(e) => setVolume(Number(e.target.value))}
                        className="absolute w-28 h-4 opacity-0 cursor-pointer"
                        style={{ transform: "rotate(-90deg)", transformOrigin: "center center", top: "calc(50% - 8px)" }}
                      />
                      <div
                        className="absolute w-3 h-3 rounded-full bg-primary shadow-sm pointer-events-none"
                        style={{ bottom: `calc(${volume}% - 6px)` }}
                      />
                    </div>
                  </div>
                )}
              </div>
              <button onClick={onClose} className="cursor-pointer text-body-secondary transition-colors hover:text-title">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Desktop: progress + volume */}
            <div className="hidden sm:flex items-center gap-3 flex-1 justify-end">
              <span className="text-xs text-body-caption">0:00 / 3:24</span>
              <div className="h-1 w-24 rounded-full bg-border overflow-hidden">
                <div className="h-full w-1/3 rounded-full bg-primary" />
              </div>
              <button onClick={toggleMute} className="cursor-pointer text-body-secondary transition-colors hover:text-title">
                {volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
              <div className="relative w-20 h-4 flex items-center group">
                <div className="absolute h-1 w-full rounded-full bg-border overflow-hidden">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${volume}%` }} />
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="absolute w-full h-full opacity-0 cursor-pointer"
                />
                <div
                  className="absolute h-2.5 w-2.5 rounded-full bg-primary shadow-sm pointer-events-none transition-opacity opacity-0 group-hover:opacity-100"
                  style={{ left: `calc(${volume}% - 5px)` }}
                />
              </div>
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
