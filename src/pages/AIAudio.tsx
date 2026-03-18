import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/components/ThemeProvider";
import { Sun, Moon, Home, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StyleTagList } from "@/components/ai-audio/StyleTagList";
import { GenerationForm } from "@/components/ai-audio/GenerationForm";
import { ExploreCards } from "@/components/ai-audio/ExploreCards";
import { AudioPlayer } from "@/components/ai-audio/AudioPlayer";
import { HistorySidebar, HistoryTrack, mockHistory } from "@/components/ai-audio/HistorySidebar";
import { TrackDetail, TrackDetailData } from "@/components/ai-audio/TrackDetail";
import { EditTrackDialog } from "@/components/ai-audio/EditTrackDialog";
import cover1 from "@/assets/cover1.jpg";

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
  const [pureMusic, setPureMusic] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [promptTab, setPromptTab] = useState<"idea" | "lyrics">("idea");

  // Right-side detail state
  const [detailTrack, setDetailTrack] = useState<TrackDetailData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<TrackDetailData | null>(null);

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

  const handleHistoryPlay = (track: HistoryTrack) => {
    const playerTrack: Track = {
      id: track.id,
      title: track.title,
      genre: track.genre,
      cover: track.cover,
    };
    if (currentTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(playerTrack);
      setIsPlaying(true);
    }
  };

  const handleHistorySelect = (track: HistoryTrack) => {
    // Fill left form with history track info
    setStyleInput(track.style);
    setTextInput(track.prompt);
    setPromptTab(track.promptType);
    // Show in right-side detail
    setDetailTrack({
      id: track.id,
      title: track.title,
      genre: track.genre,
      cover: track.cover,
      artist: "tfy1951",
      duration: "3:26",
    });
    // Scroll to top on mobile
    setTimeout(() => {
      const container = document.querySelector('.scrollbar-mobile');
      container?.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleCreateFrom = (track: Track) => {
    // Fill left form with explore track info
    setStyleInput(track.genre);
    setTextInput(`创作一首类似「${track.title}」风格的歌曲`);
    setPromptTab("idea");
  };

  const handleCreate = () => {
    if (!styleInput.trim() || !textInput.trim()) return;
    setIsGenerating(true);
    setDetailTrack(null);
    setTimeout(() => {
      setIsGenerating(false);
      setDetailTrack({
        id: Date.now().toString(),
        title: textInput.slice(0, 20) || "未命名作品",
        genre: styleInput,
        cover: cover1,
        artist: "tfy1951",
        duration: "3:26",
      });
      toast.success("创作完成！", { description: "你的音乐已生成成功" });
    }, 3000);
  };

  const handleDetailPlay = () => {
    if (detailTrack) {
      const t: Track = { id: detailTrack.id, title: detailTrack.title, genre: detailTrack.genre, cover: detailTrack.cover };
      handlePlay(t);
    }
  };

  const handleEdit = (track: TrackDetailData) => {
    setEditTarget(track);
    setEditDialogOpen(true);
  };

  const handleHistoryEdit = (track: HistoryTrack) => {
    handleEdit({
      id: track.id,
      title: track.title,
      genre: track.genre,
      cover: track.cover,
      artist: "tfy1951",
      duration: "3:26",
    });
  };

  const handleDownload = (_track: TrackDetailData | HistoryTrack) => {
    // Mock download
    const link = document.createElement("a");
    link.href = _track.cover;
    link.download = `${_track.title}.jpg`;
    link.click();
  };

  return (
    <div className="flex h-screen flex-col bg-background overflow-hidden">
      {/* Top bar */}
      <header className="sticky top-0 z-10 flex h-12 items-center justify-between border-b border-border/40 bg-background/80 px-4 backdrop-blur-sm md:px-6">
        <h1 className="text-lg font-semibold text-title">音乐生成</h1>
        <div className="flex items-center gap-2">
          <button onClick={() => { setDetailTrack(null); setIsGenerating(false); setStyleInput(""); setTextInput(""); setPromptTab("idea"); setPureMusic(false); }} className="flex h-8 cursor-pointer items-center gap-2 rounded-full border border-border/60 px-3 text-body-secondary transition-colors hover:bg-hover-bg hover:text-title">
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline text-sm">首页</span>
          </button>
          <button onClick={() => setHistoryOpen(true)} className="flex h-8 cursor-pointer items-center gap-2 rounded-full border border-border/60 px-3 text-body-secondary transition-colors hover:bg-hover-bg hover:text-title">
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline text-sm">历史记录</span>
          </button>
          <button onClick={toggleTheme} className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-border/60 text-body-secondary transition-colors hover:bg-hover-bg hover:text-title">
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex w-full lg:flex-row flex-col overflow-y-auto lg:overflow-hidden scrollbar-mobile">
          {/* Left column – generation panel */}
          <div className="w-full lg:w-[320px] flex-shrink-0 space-y-6 bg-bg-2 p-4 md:p-5 lg:overflow-y-auto lg:scrollbar-thin">
            {/* Model selector */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <label className="text-sm font-bold text-foreground">模型选择</label>
                <span className="inline-block h-3.5 w-3.5 rounded-full bg-gradient-to-br from-orange-400 to-red-500" />
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-card px-3 py-2.5 text-sm text-title">
                Suno
              </div>
            </div>

            {/* Style */}
            <div>
              <label className="mb-3 block text-sm font-bold text-foreground">风格</label>
              <StyleTagList styleInput={styleInput} setStyleInput={setStyleInput} onTagClick={handleTagClick} />
            </div>

            {/* Pure music toggle */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-foreground">生成纯音乐</span>
              <button
                onClick={() => {
                  const next = !pureMusic;
                  setPureMusic(next);
                  if (next && promptTab === "lyrics") {
                    setTextInput("");
                    setPromptTab("idea");
                  }
                }}
                className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors duration-200 ${pureMusic ? 'bg-primary' : 'bg-border'}`}
              >
                <span className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-primary-foreground shadow transition-transform duration-200 ${pureMusic ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            {/* Generation form */}
            <GenerationForm 
              styleInput={styleInput} 
              textInput={textInput} 
              setTextInput={setTextInput} 
              isOptimizing={isOptimizing} 
              setIsOptimizing={setIsOptimizing}
              tab={promptTab}
              setTab={setPromptTab}
              onSubmit={handleCreate}
            />
          </div>

          {/* Right column */}
          <div className="flex flex-1 flex-col lg:overflow-y-auto lg:scrollbar-thin p-4 md:p-6">
            {(isGenerating || detailTrack) ? (
              <div className="w-full max-w-[1056px] mx-auto flex flex-1 flex-col">
                <TrackDetail
                  track={detailTrack}
                  isGenerating={isGenerating}
                  isPlaying={isPlaying && currentTrack?.id === detailTrack?.id}
                  onPlay={handleDetailPlay}
                  onEdit={() => detailTrack && handleEdit(detailTrack)}
                  onDownload={() => detailTrack && handleDownload(detailTrack)}
                  onBackgroundGenerate={() => {
                    setIsGenerating(false);
                    setDetailTrack(null);
                  }}
                />
              </div>
            ) : (
              <div className="flex flex-1 items-center justify-center">
                <div className="w-full max-w-[1056px]">
                  <ExploreCards onPlay={handlePlay} onCreateFrom={handleCreateFrom} currentTrack={currentTrack} isPlaying={isPlaying} isLoading={false} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile sticky create button */}
      <div className="lg:hidden sticky bottom-0 z-10 border-t border-border/40 bg-background p-3">
        <Button 
          variant="gradient" 
          className={`w-full ${(!styleInput.trim() || !textInput.trim() || isOptimizing) ? 'opacity-50' : ''}`}
          size="lg" 
          onClick={() => {
            if (!styleInput.trim() || !textInput.trim() || isOptimizing) {
              const container = document.querySelector('.scrollbar-mobile');
              container?.scrollTo({ top: 0, behavior: 'smooth' });
              return;
            }
            handleCreate();
            // Scroll to generated content area after a short delay
            setTimeout(() => {
              const container = document.querySelector('.scrollbar-mobile');
              const rightCol = container?.querySelector('.flex-1');
              if (rightCol) {
                (rightCol as HTMLElement).scrollIntoView({ behavior: 'smooth' });
              }
            }, 100);
          }}
        >
          {"创建 ★20"}
        </Button>
      </div>

      {currentTrack && (
        <AudioPlayer
          track={currentTrack}
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying(!isPlaying)}
          onClose={() => { setCurrentTrack(null); setIsPlaying(false); }}
          onSkipBack={() => {
            const idx = mockHistory.findIndex((t) => t.id === currentTrack.id);
            const prev = mockHistory[idx > 0 ? idx - 1 : mockHistory.length - 1];
            if (prev) {
              setCurrentTrack({ id: prev.id, title: prev.title, genre: prev.genre, cover: prev.cover });
              setIsPlaying(true);
            }
          }}
          onSkipForward={() => {
            const idx = mockHistory.findIndex((t) => t.id === currentTrack.id);
            const next = mockHistory[idx < mockHistory.length - 1 ? idx + 1 : 0];
            if (next) {
              setCurrentTrack({ id: next.id, title: next.title, genre: next.genre, cover: next.cover });
              setIsPlaying(true);
            }
          }}
        />
      )}

      <HistorySidebar 
        open={historyOpen} 
        onClose={() => setHistoryOpen(false)}
        onPlay={handleHistoryPlay}
        onSelect={handleHistorySelect}
        onEdit={handleHistoryEdit}
        onDownload={handleDownload}
        currentTrackId={currentTrack?.id}
        isPlaying={isPlaying}
      />

      <EditTrackDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        track={editTarget}
        onSave={(data) => {
          if (detailTrack && editTarget?.id === detailTrack.id) {
            setDetailTrack({ ...detailTrack, title: data.title });
          }
        }}
      />
    </div>
  );
};

export default AIAudio;
