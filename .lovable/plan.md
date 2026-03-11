

## 添加音量滑块控制

### 改动

**`src/components/ai-audio/AudioPlayer.tsx`**

- 添加 `volume` state（0-100，默认 80）
- 将 `Volume2` 图标改为可点击按钮，点击切换静音（`Volume2` / `VolumeX`）
- 在图标旁添加一个 `w-20` 的小滑块（使用 `input[type=range]` 或直接用自定义 div 实现），拖动控制音量值
- 滑块样式：`h-1 rounded-full bg-border`，填充部分 `bg-primary`，thumb 用小圆点
- 仅在桌面端（`hidden sm:flex` 区域内）显示滑块，移动端不展示

结构：`[VolumeIcon 可点击] [滑块 w-20]`，替换当前第 58 行的纯装饰图标。

