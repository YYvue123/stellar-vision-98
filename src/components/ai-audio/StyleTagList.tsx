import { useState } from "react";
import { RefreshCw, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
    <TooltipProvider delayDuration={300}>
      <div className="relative flex flex-col rounded-lg border border-border/40 bg-card-secondary resize-y overflow-hidden min-h-[150px] input-area-focus">
        <textarea
          value={styleInput}
          onChange={(e) => setStyleInput(e.target.value)}
          rows={3}
          placeholder="输入或选择音乐风格..."
          className="flex-1 w-full bg-transparent p-3 pb-1 text-base text-title placeholder:text-body-caption focus:outline-none resize-none border-none prompt-textarea-scroll"
        />

        <div className="flex flex-wrap items-center gap-1.5 px-2 pb-2 flex-shrink-0">
            {pool.map((s) => (
              <button
                key={s}
                onClick={() => handleTagClick(s)}
                className="flex-shrink-0 cursor-pointer rounded-full border border-border/60 bg-card px-2.5 py-1 text-xs text-body-secondary transition-all duration-200 hover:bg-hover-bg hover:text-title"
              >
                {s}
              </button>
            ))}
          {styleInput.trim() && (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setStyleInput("")}
                  className="flex-shrink-0 inline-flex cursor-pointer items-center justify-center rounded-full border border-border/60 bg-card p-1.5 text-body-secondary transition-all duration-200 hover:bg-hover-bg hover:text-title"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </TooltipTrigger>
              <TooltipContent>清空</TooltipContent>
            </Tooltip>
          )}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={shuffle}
                className="flex-shrink-0 inline-flex cursor-pointer items-center justify-center rounded-full border border-border/60 bg-card p-1.5 text-body-secondary transition-all duration-200 hover:bg-hover-bg hover:text-title"
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent>刷新</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
};
