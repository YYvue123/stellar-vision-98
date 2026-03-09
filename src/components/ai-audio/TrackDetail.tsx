import { Play, Pause, Pencil, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface TrackDetailData {
  id: string;
  title: string;
  artist?: string;
  genre: string;
  cover: string;
  duration?: string;
}

interface Props {
  track: TrackDetailData | null;
  isGenerating: boolean;
  isPlaying: boolean;
  onPlay: () => void;
  onEdit: () => void;
  onDownload: () => void;
}

export const TrackDetail = ({ track, isGenerating, isPlaying, onPlay, onEdit, onDownload }: Props) => {
  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-sm text-body-secondary">正在生成中，请稍候...</p>
      </div>
    );
  }

  if (!track) return null;

  return (
    <div className="rounded-xl border border-border/40 bg-card p-5">
      <div className="flex items-start gap-4">
        {/* Cover with play overlay */}
        <div
          className="relative h-24 w-24 flex-shrink-0 cursor-pointer overflow-hidden rounded-xl group"
          onClick={onPlay}
        >
          <img src={track.cover} alt={track.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-title truncate">{track.title}</h3>
          {track.artist && (
            <p className="text-sm text-primary mt-0.5">{track.artist}</p>
          )}
          {track.duration && (
            <p className="text-sm text-body-secondary mt-1">{track.duration}</p>
          )}
          <p className="text-sm text-body-caption mt-1 truncate">{track.genre}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button variant="outline" size="sm" className="gap-2" onClick={onEdit}>
            <Pencil className="h-4 w-4" />
            编辑
          </Button>
          <Button variant="gradient" size="sm" className="gap-2" onClick={onDownload}>
            <Download className="h-4 w-4" />
            下载
          </Button>
        </div>
      </div>
    </div>
  );
};
