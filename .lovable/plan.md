

## 添加生成成功 Toast 提示

### 改动

**`src/pages/AIAudio.tsx`**
- 在 `handleCreate` 的 `setTimeout` 回调中（生成完成后），调用 `toast` 显示成功提示
- 导入 `import { toast } from "sonner";`
- 在 `setDetailTrack(...)` 之后添加 `toast.success("创作完成！", { description: "你的音乐已生成成功" });`

一处改动，使用已有的 Sonner toast 组件。

