import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { Sun, Moon, Home, Clock } from "lucide-react";
import { StyleTagList } from "@/components/ai-audio/StyleTagList";
import { GenerationForm } from "@/components/ai-audio/GenerationForm";
import { ExploreCards } from "@/components/ai-audio/ExploreCards";
import { AudioPlayer } from "@/components/ai-audio/AudioPlayer";

export interface Track {
  id: string;
  title: string;
  genre: string;
  cover: string;
}

const AIAudio = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [styleInput, setStyleInput] = useState("");
  const [textInput, setTextInput] = useState("");
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleTagClick = (tag: string) => {
    setStyleInput((prev) => {
      const trimmed = prev.trim();
      if (trimmed) return `${trimmed},${tag}`;
      return tag;
    });
  };

  const handlePlay = (track: Track) => {
    if (currentTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border/40 bg-background/80 px-4 py-3 backdrop-blur-sm md:px-6">
        <h1 className="text-lg font-semibold text-title">音乐生成</h1>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-1.5 text-body-secondary">
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">首页</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-1.5 text-body-secondary">
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">历史记录</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 pb-20">
        <div className="flex w-full lg:flex-row flex-col">
          {/* Left column – generation panel */}
          <div className="w-full lg:w-[280px] flex-shrink-0 space-y-5 bg-card p-4 md:p-5">
            {/* Model selector */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-bold text-foreground">模型选择</label>
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-gradient-to-br from-orange-400 to-red-500" />
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-card px-3 py-2.5 text-sm text-title">
                Suno
              </div>
            </div>

            {/* Style */}
            <div>
              <label className="mb-2 block text-sm font-bold text-foreground">风格</label>
              <StyleTagList styleInput={styleInput} setStyleInput={setStyleInput} onTagClick={handleTagClick} />
            </div>

            {/* Pure music toggle */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-foreground">生成纯音乐</span>
              <button
                className="relative h-6 w-11 cursor-pointer rounded-full bg-border transition-colors duration-200"
              >
                <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-primary-foreground shadow transition-transform duration-200 translate-x-0" />
              </button>
            </div>

            {/* Generation form */}
            <GenerationForm styleInput={styleInput} textInput={textInput} setTextInput={setTextInput} isOptimizing={isOptimizing} setIsOptimizing={setIsOptimizing} />
          </div>

          {/* Right column – explore, centered */}
          <div className="flex flex-1 items-center justify-center p-4 md:p-6">
            <div className="w-full max-w-[1056px]">
              <ExploreCards onPlay={handlePlay} currentTrack={currentTrack} isPlaying={isPlaying} />
            </div>
          </div>
        </div>
      </div>
      {currentTrack && (
        <AudioPlayer
          track={currentTrack}
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying(!isPlaying)}
          onClose={() => { setCurrentTrack(null); setIsPlaying(false); }}
        />
      )}
    </div>
  );
};

export default AIAudio;
