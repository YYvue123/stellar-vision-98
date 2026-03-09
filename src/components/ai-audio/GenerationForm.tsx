import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";

interface Props {
  styleInput: string;
  textInput: string;
  setTextInput: (v: string) => void;
  isOptimizing: boolean;
  setIsOptimizing: (v: boolean) => void;
}

const fakeOptimizedIdeas = [
  "一首关于夏日海边回忆的轻快流行歌曲，带有怀旧的旋律和温暖的和声",
  "深夜城市霓虹灯下的孤独旅人，融合电子节拍与钢琴的忧郁曲风",
  "青春校园里的初恋故事，甜蜜又带一点酸涩的民谣风格",
];

const fakeOptimizedLyrics = [
  `[Verse 1]
夜色温柔地落下
城市灯火像星河
我在街角等风来
把思念吹向远方

[Chorus]
如果时光能倒流
我会紧握你的手
在那个夏天的路口
不再让你独自走

[Verse 2]
雨滴敲打着窗棂
回忆在脑海翻涌
那些未说完的话
化作今夜的歌声`,
  `[Verse 1]
月光洒满了屋顶
猫咪在窗台打盹
我弹着那把旧吉他
哼着没有名字的旋律

[Chorus]
生活是一首长诗
有时候押韵 有时候随意
但每个音符都算数
每段旅程都值得记录`,
];

export const GenerationForm = ({ styleInput, textInput, setTextInput, isOptimizing, setIsOptimizing }: Props) => {
  const [tab, setTab] = useState<"idea" | "lyrics">("idea");
  

  const maxLen = tab === "lyrics" ? 3000 : 200;
  const optimizerLabel = tab === "lyrics" ? "歌词优化器" : "创意优化器";
  const canCreate = styleInput.trim().length > 0 && textInput.trim().length > 0 && !isOptimizing;

  const handleOptimize = () => {
    if (!textInput.trim()) return;
    setIsOptimizing(true);
    setTimeout(() => {
      if (tab === "lyrics") {
        const idx = Math.floor(Math.random() * fakeOptimizedLyrics.length);
        setTextInput(fakeOptimizedLyrics[idx]);
      } else {
        const idx = Math.floor(Math.random() * fakeOptimizedIdeas.length);
        setTextInput(fakeOptimizedIdeas[idx]);
      }
      setIsOptimizing(false);
    }, 1500);
  };

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex overflow-hidden rounded-full border border-border/60 bg-card-secondary">
        {(["idea", "lyrics"] as const).map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); setTextInput(""); }}
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
          value={textInput}
          onChange={(e) => {
            if (e.target.value.length <= maxLen) setTextInput(e.target.value);
          }}
          rows={4}
          placeholder={
            tab === "idea"
              ? "你想唱什么？写下你的感受、故事或句子——我会把它变成歌词！🎨"
              : "在这里输入歌词内容..."
          }
          className="w-full resize-none bg-transparent text-sm text-title placeholder:text-body-caption focus:outline-none"
        />
        <div className="mt-2 flex items-center justify-between text-xs text-body-caption">
          <button
            onClick={handleOptimize}
            disabled={!textInput.trim() || isOptimizing}
            className="flex cursor-pointer items-center gap-1 rounded-full border border-border/60 px-2.5 py-1 transition-all duration-200 hover:bg-hover-bg disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isOptimizing ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <Sparkles className="h-3 w-3" />
            )}
            {isOptimizing ? "优化中..." : optimizerLabel}
          </button>
          <span>{textInput.length}/{maxLen}</span>
        </div>
      </div>

      {/* Create button */}
      <Button variant="gradient" className="w-full" size="lg" disabled={!canCreate}>
        {"创建 ★20"}
      </Button>
    </div>
  );
};
