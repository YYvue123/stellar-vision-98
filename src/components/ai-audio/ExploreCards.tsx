import { Headphones, FileText, Mic, Music } from "lucide-react";

const cards = [
  { icon: Headphones, title: "音效", desc: "生成各种音效素材", gradient: "from-theme-purple/20 to-theme-green/20" },
  { icon: FileText, title: "博客", desc: "音频相关资讯", gradient: "from-theme-green/20 to-theme-purple/20" },
  { icon: Mic, title: "配音", desc: "AI 智能配音", gradient: "from-theme-purple/20 to-blue-400/20" },
  { icon: Music, title: "文本转音频", desc: "即将推出", gradient: "from-blue-400/20 to-theme-green/20", disabled: true },
];

export const ExploreCards = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-title">探索</h2>

      {/* Welcome banner */}
      <div className="rounded-xl bg-gradient-to-r from-theme-purple/10 to-theme-green/10 p-5">
        <p className="text-lg font-semibold text-title">👏🏻 欢迎使用 AI 音频</p>
        <p className="mt-1 text-sm text-body-secondary">
          这是你的专属音乐空间！说出灵感，音乐立刻开始制作！✨
        </p>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        {cards.map((c) => (
          <button
            key={c.title}
            disabled={c.disabled}
            className={`group cursor-pointer rounded-xl border border-border/40 bg-card p-4 text-left shadow-sm transition-all duration-200 hover:bg-hover-bg hover:shadow-md ${
              c.disabled ? "cursor-not-allowed opacity-60" : ""
            }`}
          >
            <div className={`mb-3 inline-flex rounded-lg bg-gradient-to-br ${c.gradient} p-2.5`}>
              <c.icon className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm font-medium text-title">{c.title}</p>
            <p className="mt-0.5 text-xs text-body-caption">{c.desc}</p>
            {c.disabled && (
              <span className="mt-2 inline-block rounded-full bg-card-secondary px-2 py-0.5 text-[10px] text-body-caption">
                即将推出
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Latest updates section */}
      <div>
        <h3 className="mb-3 text-base font-semibold text-title">最新动态</h3>
        <div className="rounded-xl border border-border/40 bg-card p-6 text-center text-sm text-body-caption">
          暂无最新动态
        </div>
      </div>
    </div>
  );
};
