

## 移动端删除确认弹窗适配 Drawer

### 改动

**`src/components/ai-audio/HistorySidebar.tsx`**

- 导入 `useIsMobile`、`Drawer`/`DrawerContent`/`DrawerHeader`/`DrawerTitle`/`DrawerFooter`
- 导入 `Button` 组件
- 删除确认部分改为条件渲染：
  - **桌面端**：保持现有 `AlertDialog`
  - **移动端**：使用 `Drawer`，内含删除提示文案 + 取消/删除两个按钮（横排布局），删除按钮用 `destructive` 样式
- 模式与 `EditTrackDialog` 一致：`if (isMobile)` 渲染 Drawer，否则渲染 AlertDialog

