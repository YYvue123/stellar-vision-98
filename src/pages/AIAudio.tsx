import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { ArrowLeft, Sun, Moon, RefreshCw, Sparkles, Music, Mic, FileText, Headphones } from "lucide-react";
import { StyleTagList } from "@/components/ai-audio/StyleTagList";
import { GenerationForm } from "@/components/ai-audio/GenerationForm";
import { ExploreCards } from "@/components/ai-audio/ExploreCards";
import { PlanInfo } from "@/components/ai-audio/PlanInfo";

const AIAudio = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border/40 bg-background/80 px-4 py-3 backdrop-blur-sm md:px-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-title">音乐生成</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
          {/* Left column – generation panel */}
          <div className="space-y-6">
            {/* Model selector */}
            <div>
              <label className="mb-2 block text-sm font-medium text-title">模型选择</label>
              <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-card px-4 py-3 text-sm text-title">
                <span className="inline-block h-5 w-5 rounded-full bg-gradient-to-br from-orange-400 to-red-500" />
                Suno
              </div>
            </div>

            {/* Style */}
            <div>
              <label className="mb-2 block text-sm font-medium text-title">风格</label>
              <StyleTagList />
            </div>

            {/* Generation form */}
            <GenerationForm />

            {/* Plan info */}
            <PlanInfo />
          </div>

          {/* Right column – explore */}
          <ExploreCards />
        </div>
      </div>
    </div>
  );
};

export default AIAudio;
