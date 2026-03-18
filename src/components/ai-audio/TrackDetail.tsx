import { useState } from "react";
import { Play, Pause, Pencil, Download, Music, Headphones, Monitor, ChevronDown, ChevronUp, Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export interface TrackDetailData {
  id: string;
  title: string;
  artist?: string;
  genre: string;
  cover: string;
  duration?: string;
  lyrics?: string;
}

interface Props {
  track: TrackDetailData | null;
  isGenerating: boolean;
  isPlaying: boolean;
  onPlay: () => void;
  onEdit: () => void;
  onDownload: () => void;
  onBackgroundGenerate?: () => void;
}

const MOCK_LYRICS = `在城市的霓虹灯下
我独自走过每条街
回忆像风一样吹过
带走了曾经的誓言

副歌:
你说过的永远
如今变成了昨天
我在这夜色中寻找
那一份遗失的温暖

桥段:
也许时间会给答案
也许泪水会被风干
在下一个路口转弯
会不会遇见新的晴天`;

export const TrackDetail = ({ track, isGenerating, isPlaying, onPlay, onEdit, onDownload, onBackgroundGenerate }: Props) => {
  const [lyricsOpen, setLyricsOpen] = useState(true);

  if (isGenerating) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-5">
        <Music className="h-16 w-16 text-primary/30" strokeWidth={1.5} />
        <p className="text-sm text-body-secondary flex items-center gap-1.5">
          音乐正在酝酿中，大约 2 分钟后精彩呈现！
          <Headphones className="h-4 w-4 text-body-caption" />
        </p>
        <Button variant="gradient" className="gap-2 mt-2" onClick={onBackgroundGenerate}>
          <Monitor className="h-4 w-4" />
          在后台生成
        </Button>
      </div>
    );
  }

  if (!track) return null;

  const lyrics = track.lyrics || MOCK_LYRICS;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-title truncate">{track.title}</h2>
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

      <div className="rounded-xl border border-border/40 bg-card p-5">
        <div className="flex items-start gap-4">
          <div
            className="relative h-24 w-24 flex-shrink-0 cursor-pointer overflow-hidden rounded-xl group"
            onClick={onPlay}
          >
            <img src={track.cover} alt={track.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-title truncate">{track.title}</h3>
            {track.artist && <p className="text-sm text-primary mt-0.5">{track.artist}</p>}
            {track.duration && <p className="text-sm text-body-secondary mt-1">{track.duration}</p>}
            <p className="text-sm text-body-caption mt-1 truncate">{track.genre}</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border/40 bg-card p-5">
        <div className="flex items-center justify-between mb-1">
          <button
            className="flex items-center gap-1.5 cursor-pointer text-sm font-semibold text-title hover:text-primary transition-colors"
            onClick={() => setLyricsOpen(!lyricsOpen)}
          >
            {lyricsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            歌词
          </button>
          <button
            className="flex items-center gap-1.5 cursor-pointer text-xs text-body-secondary hover:text-title transition-colors"
            onClick={() => {
              navigator.clipboard.writeText(lyrics);
              toast.success("歌词已复制到剪贴板");
            }}
          >
            <Copy className="h-3.5 w-3.5" />
            复制
          </button>
        </div>
        {lyricsOpen && (
          <div className="max-h-60 overflow-y-auto lyrics-scroll mt-3">
            <pre className="text-sm text-body-secondary whitespace-pre-wrap font-sans leading-relaxed">
              {lyrics}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
