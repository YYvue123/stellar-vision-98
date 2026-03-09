import { useState } from "react";
import { X, Play, MoreHorizontal, Trash2 } from "lucide-react";
import cover1 from "@/assets/cover1.jpg";
import cover2 from "@/assets/cover2.jpg";
import cover3 from "@/assets/cover3.jpg";
import cover4 from "@/assets/cover4.jpg";
import cover5 from "@/assets/cover5.jpg";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface HistoryTrack {
  id: string;
  title: string;
  genre: string;
  cover: string;
  date: string;
  style: string;
  prompt: string;
  promptType: "idea" | "lyrics";
}

const mockHistory: HistoryTrack[] = [
  { 
    id: "1", 
    title: "First Light Of The Year", 
    genre: "pop, Shimmering pop ant...", 
    cover: cover1, 
    date: "2026-02-04",
    style: "流行,电子,梦幻流行",
    prompt: "新年的第一缕阳光，温暖而充满希望，象征着新的开始",
    promptType: "idea"
  },
  { 
    id: "2", 
    title: "午夜霓虹", 
    genre: "电子, 赛博朋克", 
    cover: cover2, 
    date: "2026-02-04",
    style: "电子,陷阱音乐,嘻哈",
    prompt: "[Verse 1]\n霓虹灯闪烁在午夜的街头\n我独自漫步在这城市的尽头\n\n[Chorus]\n谁在呼唤我的名字\n在这喧嚣中寻找真实",
    promptType: "lyrics"
  },
  { 
    id: "3", 
    title: "青春碎碎念", 
    genre: "Bouncy C-pop with a brig...", 
    cover: cover3, 
    date: "2025-12-31",
    style: "流行,R&B,灵魂",
    prompt: "校园里的青春回忆，那些年我们一起追过的梦想",
    promptType: "idea"
  },
  { 
    id: "4", 
    title: "夏日海风", 
    genre: "轻快流行", 
    cover: cover4, 
    date: "2025-12-31",
    style: "流行,放克,迪斯科",
    prompt: "海边度假的美好时光，阳光沙滩和冰凉的饮料",
    promptType: "idea"
  },
  { 
    id: "5", 
    title: "Dans le sillage du na...", 
    genre: "drill, dreamy, airy female v...", 
    cover: cover5, 
    date: "2025-11-26",
    style: "爵士,古典,灵魂",
    prompt: "[Verse 1]\n月光洒满了屋顶\n猫咪在窗台打盹\n我弹着那把旧吉他\n\n[Chorus]\n生活是一首长诗\n有时候押韵 有时候随意",
    promptType: "lyrics"
  },
  { 
    id: "6", 
    title: "星空下的约定", 
    genre: "民谣, 治愈系", 
    cover: cover1, 
    date: "2025-11-26",
    style: "民谣,古典,蓝调",
    prompt: "仰望星空，许下最美的愿望，和最爱的人一起看流星",
    promptType: "idea"
  },
  { 
    id: "7", 
    title: "Untitled_20251126", 
    genre: "实验电子", 
    cover: cover2, 
    date: "2025-11-26",
    style: "电子,金属,朋克",
    prompt: "一段疯狂的实验，打破常规的节奏",
    promptType: "idea"
  },
  { 
    id: "8", 
    title: "回忆的温度", 
    genre: "抒情流行", 
    cover: cover3, 
    date: "2025-11-25",
    style: "流行,R&B",
    prompt: "[Verse 1]\n翻开旧相册\n那些泛黄的照片\n记录着我们的笑颜\n\n[Chorus]\n回忆有温度\n即使隔着时光\n依然温暖如初",
    promptType: "lyrics"
  },
];

interface Props {
  open: boolean;
  onClose: () => void;
  onPlay: (track: HistoryTrack) => void;
  onSelect: (track: HistoryTrack) => void;
}

export const HistorySidebar = ({ open, onClose, onPlay, onSelect }: Props) => {
  const [tracks, setTracks] = useState(mockHistory);
  const [deleteTarget, setDeleteTarget] = useState<HistoryTrack | null>(null);

  // Group by date
  const grouped = tracks.reduce<Record<string, HistoryTrack[]>>((acc, track) => {
    if (!acc[track.date]) acc[track.date] = [];
    acc[track.date].push(track);
    return acc;
  }, {});

  const handleDelete = () => {
    if (deleteTarget) {
      setTracks((prev) => prev.filter((t) => t.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  const handleCardClick = (track: HistoryTrack) => {
    onSelect(track);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/30" onClick={onClose} />
      )}

      {/* Sidebar panel */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-[383px] max-w-full flex-col bg-background border-l border-border/40 shadow-xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex h-12 items-center justify-between border-b border-border/40 px-4">
          <h2 className="text-base font-semibold text-title">我的音乐</h2>
          <button onClick={onClose} className="cursor-pointer rounded-md p-1 text-body-secondary hover:bg-hover-bg hover:text-title transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {Object.entries(grouped).map(([date, dateTracks]) => (
            <div key={date} className="space-y-3">
              <div className="text-sm font-medium text-body-secondary">{date}</div>
              <div className="space-y-2">
                {dateTracks.map((track) => (
                  <div
                    key={track.id}
                    onClick={() => handleCardClick(track)}
                    className="flex items-center gap-3 rounded-lg border border-border/40 bg-card p-3 transition-colors hover:bg-hover-bg cursor-pointer"
                  >
                    <img
                      src={track.cover}
                      alt={track.title}
                      className="h-12 w-12 rounded-md object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-title truncate">{track.title}</div>
                      {track.genre && (
                        <div className="text-xs text-body-secondary truncate mt-0.5">{track.genre}</div>
                      )}
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button 
                        onClick={(e) => { e.stopPropagation(); onPlay(track); }}
                        className="rounded-full p-1.5 text-body-secondary hover:text-title hover:bg-hover-bg transition-colors"
                      >
                        <Play className="h-4 w-4" />
                      </button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button 
                            onClick={(e) => e.stopPropagation()}
                            className="rounded-full p-1.5 text-body-secondary hover:text-title hover:bg-hover-bg transition-colors"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem 
                            onClick={(e) => { e.stopPropagation(); setDeleteTarget(track); }}
                            className="text-destructive focus:text-destructive cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            删除
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-border/40 p-3">
          <button
            onClick={onClose}
            className="w-full cursor-pointer rounded-full border border-border/60 py-2 text-sm text-body-secondary hover:bg-hover-bg hover:text-title transition-colors"
          >
            关闭
          </button>
        </div>
      </div>

      {/* Delete confirmation dialog */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              确定要删除「{deleteTarget?.title}」吗？此操作无法撤销。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
