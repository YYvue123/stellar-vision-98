export const PlanInfo = () => {
  return (
    <div className="rounded-xl border border-border/40 bg-card p-4">
      <h3 className="text-sm font-semibold text-title">你的计划</h3>
      <div className="mt-2 space-y-1 text-sm">
        <div className="flex justify-between">
          <span className="text-body-secondary">订阅配额:</span>
          <span className="font-medium text-title">100 / 100</span>
        </div>
        <div className="flex justify-between">
          <span className="text-body-secondary">附加配额:</span>
          <span className="font-medium text-title">0</span>
        </div>
      </div>
      <button className="mt-3 cursor-pointer text-xs text-primary transition-opacity duration-200 hover:opacity-80">
        配额使用说明
      </button>
    </div>
  );
};
