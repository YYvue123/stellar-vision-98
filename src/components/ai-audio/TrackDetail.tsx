import { useState } from "react";
import { Play, Pause, Pencil, Download, Music, Headphones, Monitor, ChevronDown, ChevronUp, Copy } from "lucide-react";
import { toast } from "sonner";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
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
  tracks: TrackDetailData[];
  isGenerating: boolean;
  currentPlayingId?: string;
  isPlaying: boolean;
  onPlay: (track: TrackDetailData) => void;
  onEdit: (track: TrackDetailData) => void;
  onDownload: (track: TrackDetailData) => void;
  onBackgroundGenerate?: () => void;
}

const MOCK_LYRICS_1 = `在城市的霓虹灯下
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

const MOCK_LYRICS_2 = `月光洒在窗台上
思绪飘向远方
那些年少的梦想
还在心中回荡

副歌:
我们曾经约定
要一起看日出
穿过山川和大海
找到属于我们的路

桥段:
风吹过的地方
都有你的模样
就算世界再大
你是我的方向`;

const MOCK_LYRICS = [MOCK_LYRICS_1, MOCK_LYRICS_2];

const TrackCard = ({
  track,
  index,
  isPlaying,
  isCurrentPlaying,
  onPlay,
  onEdit,
  onDownload,
}: {
  track: TrackDetailData;
  index: number;
  isPlaying: boolean;
  isCurrentPlaying: boolean;
  onPlay: () => void;
  onEdit: () => void;
  onDownload: () => void;
}) => {
  const [lyricsOpen, setLyricsOpen] = useState(true);
  const lyrics = track.lyrics || MOCK_LYRICS[index % MOCK_LYRICS.length];

  return (
    <div className="space-y-4 rounded-xl border border-border/40 bg-card p-4 md:p-5">
      {/* Header: title + actions */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-title truncate">{track.title}</h3>
        <div className="flex items-center gap-2 flex-shrink-0">
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={onEdit}>
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>编辑</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="gradient" size="icon" className="h-8 w-8" onClick={onDownload}>
                  <Download className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>下载</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Cover + info */}
      <div className="flex items-start gap-4">
        <div
          className="relative h-20 w-20 flex-shrink-0 cursor-pointer overflow-hidden rounded-xl group"
          onClick={onPlay}
        >
          <img src={track.cover} alt={track.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              {isCurrentPlaying && isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
            </div>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-title truncate">{track.title}</h4>
          {track.artist && <p className="text-xs text-primary mt-0.5">{track.artist}</p>}
          {track.duration && <p className="text-xs text-body-secondary mt-1">{track.duration}</p>}
          <p className="text-xs text-body-caption mt-1 truncate">{track.genre}</p>
        </div>
      </div>

      {/* Lyrics */}
      <div className="border-t border-b border-border/40 py-3">
        <div className="flex items-center justify-between">
          <button
            className="flex items-center gap-1.5 cursor-pointer text-sm font-semibold text-title hover:text-primary transition-colors"
            onClick={() => setLyricsOpen(!lyricsOpen)}
          >
            {lyricsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            歌词
          </button>
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="flex items-center justify-center h-7 w-7 rounded-md cursor-pointer text-body-secondary hover:text-title hover:bg-hover-bg transition-colors"
                  onClick={() => {
                    navigator.clipboard.writeText(lyrics);
                    toast.success("歌词已复制到剪贴板");
                  }}
                >
                  <Copy className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>复制</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {lyricsOpen && (
          <div className="max-h-48 overflow-y-auto lyrics-scroll mt-2">
            <pre className="text-sm text-body-secondary whitespace-pre-wrap font-sans leading-relaxed">
              {lyrics}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export const TrackDetail = ({ tracks, isGenerating, currentPlayingId, isPlaying, onPlay, onEdit, onDownload, onBackgroundGenerate }: Props) => {
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

  if (tracks.length === 0) return null;

  return (
    <div className="space-y-4">
      {tracks.map((track, index) => (
        <TrackCard
          key={track.id}
          track={track}
          index={index}
          isPlaying={isPlaying}
          isCurrentPlaying={currentPlayingId === track.id}
          onPlay={() => onPlay(track)}
          onEdit={() => onEdit(track)}
          onDownload={() => onDownload(track)}
        />
      ))}
    </div>
  );
};
