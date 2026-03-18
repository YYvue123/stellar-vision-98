import { Button } from "@/components/ui/button";
import { Sparkles, Loader2, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Props {
  styleInput: string;
  textInput: string;
  setTextInput: (v: string) => void;
  isOptimizing: boolean;
  setIsOptimizing: (v: boolean) => void;
  tab: "idea" | "lyrics";
  setTab: (v: "idea" | "lyrics") => void;
  onSubmit?: () => void;
  pureMusic?: boolean;
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

export const GenerationForm = ({ styleInput, textInput, setTextInput, isOptimizing, setIsOptimizing, tab, setTab, onSubmit, pureMusic }: Props) => {
  const isLyricsDisabled = pureMusic && tab === "lyrics";
  const maxLen = tab === "lyrics" ? 3000 : 200;
  const optimizerLabel = tab === "lyrics" ? "歌词优化器" : "创意优化器";
  const canCreate = textInput.trim().length > 0 && !isOptimizing;

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
    <TooltipProvider delayDuration={300}>
      <div className="space-y-4">
        {/* Tabs */}
        <div className="flex gap-1 overflow-hidden rounded-full border border-border/40 bg-tab-inactive p-1">
          {(["idea", "lyrics"] as const).map((t) => (
            <button
              key={t}
              onClick={() => { if (pureMusic && t === "lyrics") return; setTab(t); setTextInput(""); }}
              className={`flex-1 cursor-pointer rounded-full border py-2 text-sm font-medium transition-all duration-200 ${
                pureMusic && t === "lyrics"
                  ? "border-transparent text-body-caption opacity-50 cursor-not-allowed"
                  : tab === t
                    ? "border-border/40 bg-menu-selected text-title shadow-sm"
                    : "border-transparent text-body-secondary hover:text-title"
              }`}
              disabled={pureMusic && t === "lyrics"}
            >
              {t === "idea" ? "想法" : "歌词"}
            </button>
          ))}
        </div>

        {/* Textarea */}
        <div className={`rounded-lg border border-border/40 bg-card-secondary p-3 input-area-focus ${isLyricsDisabled ? 'opacity-50' : ''}`}>
          <textarea
            value={isLyricsDisabled ? "" : textInput}
            onChange={(e) => {
              if (isLyricsDisabled) return;
              if (e.target.value.length <= maxLen) setTextInput(e.target.value);
            }}
            disabled={isLyricsDisabled}
            rows={4}
            placeholder={
              isLyricsDisabled
                ? "纯音乐模式下不支持歌词输入"
                : tab === "idea"
                  ? "你想唱什么？写下你的感受、故事或句子——我会把它变成歌词！🎨"
                  : "在这里输入歌词内容..."
            }
            className="w-full resize-vertical bg-transparent text-sm text-title placeholder:text-body-caption focus:outline-none prompt-textarea-scroll disabled:cursor-not-allowed"
          />
          <div className="mt-2 flex items-center justify-between text-xs text-body-caption">
            <div className="flex items-center gap-1.5">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleOptimize}
                    disabled={!textInput.trim() || isOptimizing}
                    className="flex cursor-pointer items-center gap-1 rounded-full border border-border/60 px-2.5 py-1 text-title transition-all duration-200 hover:bg-hover-bg disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isOptimizing ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <Sparkles className="h-3 w-3" />
                    )}
                    {isOptimizing ? "优化中..." : optimizerLabel}
                  </button>
                </TooltipTrigger>
                <TooltipContent>AI 智能优化你的内容</TooltipContent>
              </Tooltip>
              {textInput.trim() && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setTextInput("")}
                      className="flex cursor-pointer items-center justify-center rounded-full border border-border/60 p-1 text-body-secondary transition-all duration-200 hover:bg-hover-bg hover:text-title"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>清空</TooltipContent>
                </Tooltip>
              )}
            </div>
            <span>{textInput.length}/{maxLen}</span>
          </div>
        </div>

        {/* Create button - desktop only */}
        <div className="hidden lg:block">
          <Button variant="gradient" className="w-full" size="lg" disabled={!canCreate} onClick={onSubmit}>
            {"创建 ★20"}
          </Button>
        </div>
      </div>
    </TooltipProvider>
  );
};
