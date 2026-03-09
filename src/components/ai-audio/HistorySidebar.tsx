import { X, Play } from "lucide-react";
import cover1 from "@/assets/cover1.jpg";
import cover2 from "@/assets/cover2.jpg";
import cover3 from "@/assets/cover3.jpg";
import cover4 from "@/assets/cover4.jpg";
import cover5 from "@/assets/cover5.jpg";

interface HistoryTrack {
  id: string;
  title: string;
  description: string;
  cover: string;
  date: string;
}

const mockHistory: HistoryTrack[] = [
  { id: "1", title: "First Light Of The Year", description: "pop, Shimmering pop ant...", cover: cover1, date: "2026-02-04" },
  { id: "2", title: "First Light Of The Year", description: "pop, Shimmering pop ant...", cover: cover2, date: "2026-02-04" },
  { id: "3", title: "青春碎碎念", description: "Bouncy C-pop with a brig...", cover: cover3, date: "2025-12-31" },
  { id: "4", title: "青春碎碎念", description: "Bouncy C-pop with a brig...", cover: cover4, date: "2025-12-31" },
  { id: "5", title: "Dans le sillage du na...", description: "drill, dreamy, airy female v...", cover: cover5, date: "2025-11-26" },
  { id: "6", title: "Dans le sillage du na...", description: "drill, dreamy, airy female v...", cover: cover1, date: "2025-11-26" },
  { id: "7", title: "Untitled_20251126", description: "", cover: cover2, date: "2025-11-26" },
  { id: "8", title: "Untitled_20251126", description: "", cover: cover3, date: "2025-11-26" },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export const HistorySidebar = ({ open, onClose }: Props) => {
  // Group by date
  const grouped = mockHistory.reduce<Record<string, HistoryTrack[]>>((acc, track) => {
    if (!acc[track.date]) acc[track.date] = [];
    acc[track.date].push(track);
    return acc;
  }, {});

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
          {Object.entries(grouped).map(([date, tracks]) => (
            <div key={date} className="space-y-3">
              <div className="text-sm font-medium text-body-secondary">{date}</div>
              <div className="space-y-2">
                {tracks.map((track) => (
                  <div
                    key={track.id}
                    className="flex items-center gap-3 rounded-lg border border-border/40 bg-card p-3 transition-colors hover:bg-hover-bg cursor-pointer"
                  >
                    <img
                      src={track.cover}
                      alt={track.title}
                      className="h-12 w-12 rounded-md object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-title truncate">{track.title}</div>
                      {track.description && (
                        <div className="text-xs text-body-secondary truncate mt-0.5">{track.description}</div>
                      )}
                    </div>
                    <button className="flex-shrink-0 rounded-full p-1.5 text-body-secondary hover:text-title transition-colors">
                      <Play className="h-4 w-4" />
                    </button>
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
    </>
  );
};
