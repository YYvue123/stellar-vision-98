import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { Sun, Moon, Music } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background p-4">
      <h1 className="text-3xl font-bold text-title md:text-4xl">欢迎</h1>
      <p className="text-body-secondary">选择一个功能开始体验</p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button variant="outline" size="lg" onClick={toggleTheme}>
          {theme === "light" ? <Moon className="mr-2 h-5 w-5" /> : <Sun className="mr-2 h-5 w-5" />}
          {theme === "light" ? "暗色模式" : "浅色模式"}
        </Button>
        <Button variant="gradient" size="lg" onClick={() => navigate("/ai-audio")}>
          <Music className="mr-2 h-5 w-5" />
          AI 音频
        </Button>
      </div>
    </div>
  );
};

export default Index;
