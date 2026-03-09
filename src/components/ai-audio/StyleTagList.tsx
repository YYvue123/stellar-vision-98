import { useState } from "react";
import { RefreshCw } from "lucide-react";

const allStyles = [
  "陷阱音乐", "放克", "硬核", "流行", "摇滚", "爵士", "R&B",
  "古典", "电子", "嘻哈", "乡村", "蓝调", "灵魂", "雷鬼",
  "阿拉伯流行", "格里奥", "梦幻流行", "迪斯科", "朋克", "金属",
];

interface Props {
  styleInput: string;
  setStyleInput: (v: string) => void;
  onTagClick: (tag: string) => void;
}

export const StyleTagList = ({ styleInput, setStyleInput, onTagClick }: Props) => {
  const [pool, setPool] = useState(() => allStyles.slice(0, 8));

  const handleTagClick = (tag: string) => {
    onTagClick(tag);
    setPool((prev) => prev.filter((t) => t !== tag));
  };

  const shuffle = () => {
    const shuffled = [...allStyles].sort(() => Math.random() - 0.5);
    setPool(shuffled.slice(0, 8));
  };

  return (
    <div className="rounded-lg border border-border/40 bg-card-secondary p-3 space-y-2">
      {/* Style text input */}
      <textarea
        value={styleInput}
        onChange={(e) => setStyleInput(e.target.value)}
        rows={3}
        placeholder="输入或选择音乐风格..."
        className="w-full resize-none bg-transparent text-sm text-title placeholder:text-body-caption focus:outline-none"
      />

      {/* Tags - single row horizontal scroll + fixed refresh */}
      <div className="flex items-center gap-1.5">
        <div className="flex-1 overflow-x-auto pb-1 min-w-0 style-tags-scroll">
          <div className="flex items-center gap-1.5">
            {pool.map((s) => (
              <button
                key={s}
                onClick={() => handleTagClick(s)}
                className="flex-shrink-0 cursor-pointer rounded-full border border-border/60 bg-card px-2.5 py-1 text-xs text-body-secondary transition-all duration-200 hover:bg-hover-bg hover:text-title"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={shuffle}
          className="flex-shrink-0 inline-flex cursor-pointer items-center justify-center rounded-full border border-border/60 bg-card p-1.5 text-body-secondary transition-all duration-200 hover:bg-hover-bg"
          title="刷新"
        >
          <RefreshCw className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};
