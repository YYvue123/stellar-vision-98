import { useState } from "react";
import { RefreshCw } from "lucide-react";

const allStyles = [
  "陷阱音乐", "放克", "硬核", "流行", "摇滚", "爵士", "R&B",
  "古典", "电子", "嘻哈", "乡村", "蓝调", "灵魂", "雷鬼",
];

export const StyleTagList = () => {
  const [selected, setSelected] = useState<string[]>(["陷阱音乐"]);
  const [visibleCount, setVisibleCount] = useState(6);

  const toggle = (s: string) =>
    setSelected((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  const shuffle = () => {
    const shuffled = [...allStyles].sort(() => Math.random() - 0.5);
    setVisibleCount(6);
    setSelected([shuffled[0]]);
  };

  return (
    <div className="rounded-lg border border-border/40 bg-card-secondary p-3">
      <p className="mb-2 text-xs text-body-caption">
        想要什么风格？HipHop、Melody……统统都能造！输入关键词，音乐立刻开始制作
      </p>
      <div className="flex flex-wrap items-center gap-2">
        {allStyles.slice(0, visibleCount).map((s) => (
          <button
            key={s}
            onClick={() => toggle(s)}
            className={`cursor-pointer rounded-full border px-3 py-1 text-xs transition-all duration-200 ${
              selected.includes(s)
                ? "border-primary bg-primary/10 text-primary"
                : "border-border/60 bg-card text-body-secondary hover:bg-hover-bg"
            }`}
          >
            {s}
          </button>
        ))}
        <button
          onClick={shuffle}
          className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-border/60 bg-card px-3 py-1 text-xs text-body-secondary transition-all duration-200 hover:bg-hover-bg"
        >
          <RefreshCw className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};
