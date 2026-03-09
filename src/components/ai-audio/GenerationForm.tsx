import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export const GenerationForm = () => {
  const [tab, setTab] = useState<"idea" | "lyrics">("idea");
  const [text, setText] = useState("");
  const [pureMusic, setPureMusic] = useState(false);

  return (
    <div className="space-y-4">
      {/* Pure music toggle */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-title">生成纯音乐</span>
        <button
          onClick={() => setPureMusic(!pureMusic)}
          className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors duration-200 ${
            pureMusic ? "bg-primary" : "bg-border"
          }`}
        >
          <span
            className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-primary-foreground shadow transition-transform duration-200 ${
              pureMusic ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex overflow-hidden rounded-full border border-border/60 bg-card-secondary">
        {(["idea", "lyrics"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 cursor-pointer py-2 text-sm font-medium transition-all duration-200 ${
              tab === t
                ? "bg-menu-selected text-title shadow-sm"
                : "text-body-secondary hover:text-title"
            }`}
          >
            {t === "idea" ? "想法" : "歌词"}
          </button>
        ))}
      </div>

      {/* Textarea */}
      <div className="rounded-lg border border-border/40 bg-card-secondary p-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          placeholder={
            tab === "idea"
              ? "快来输入灵感关键词，比如"青春"或"夏天的风"，马上生成属于你的旋律！"
              : "在这里输入歌词内容..."
          }
          className="w-full resize-none bg-transparent text-sm text-title placeholder:text-body-caption focus:outline-none"
        />
        <div className="mt-2 flex items-center justify-between text-xs text-body-caption">
          <button className="flex cursor-pointer items-center gap-1 rounded-full border border-border/60 px-2.5 py-1 transition-all duration-200 hover:bg-hover-bg">
            <Sparkles className="h-3 w-3" />
            创意生成器
          </button>
          <span>{text.length}/200</span>
        </div>
      </div>

      {/* Create button */}
      <Button variant="gradient" className="w-full" size="lg">
        创建 ★20
      </Button>
    </div>
  );
};
