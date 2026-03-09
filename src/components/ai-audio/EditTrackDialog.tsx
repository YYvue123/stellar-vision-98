import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ImageIcon, Upload } from "lucide-react";
import type { TrackDetailData } from "./TrackDetail";

interface Props {
  open: boolean;
  onClose: () => void;
  track: TrackDetailData | null;
  onSave: (data: { title: string; description: string; coverFile?: File }) => void;
}

export const EditTrackDialog = ({ open, onClose, track, onSave }: Props) => {
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [tempPreview, setTempPreview] = useState<string | null>(null);
  const [tempFile, setTempFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen && track) {
      setCoverPreview(null);
      setCoverFile(null);
    }
    if (!isOpen) onClose();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
      setUploadDialogOpen(false);
    }
  };

  const displayCover = coverPreview || track?.cover;

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>自定义设置</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col items-center gap-4 mt-2">
            {/* Cover preview */}
            <div className="flex flex-col items-center gap-3">
              {displayCover ? (
                <img
                  src={displayCover}
                  alt={track?.title}
                  className="h-32 w-32 rounded-xl object-cover border border-border/40"
                />
              ) : (
                <div className="h-32 w-32 rounded-xl border-2 border-dashed border-border/60 flex items-center justify-center">
                  <ImageIcon className="h-8 w-8 text-body-caption" />
                </div>
              )}
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 text-xs"
                onClick={() => setUploadDialogOpen(true)}
              >
                <ImageIcon className="h-3.5 w-3.5" />
                编辑照片
              </Button>
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              取消
            </Button>
            <Button
              variant="gradient"
              className="flex-1"
              onClick={() => {
                onSave({ title: track?.title ?? "", description: "", coverFile: coverFile || undefined });
                onClose();
              }}
            >
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upload photo sub-dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>上传封面</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col items-center gap-5 py-4">
            {/* Preview or upload area */}
            {tempPreview ? (
              <img src={tempPreview} alt="preview" className="h-28 w-28 rounded-xl object-cover border border-border/40" />
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex h-28 w-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border/60 bg-card-secondary/30 text-body-caption transition-colors hover:border-primary/40 hover:text-primary"
              >
                <Upload className="h-6 w-6" />
                <span className="text-xs">上传照片</span>
              </button>
            )}

            {tempPreview && (
              <Button variant="outline" size="sm" className="gap-1.5 text-xs" onClick={() => fileInputRef.current?.click()}>
                <Upload className="h-3.5 w-3.5" />
                重新选择
              </Button>
            )}

            {/* Tips */}
            <div className="text-sm text-left w-full space-y-3">
              <div>
                <p className="font-semibold text-primary">上传提示</p>
                <p className="text-body-secondary mt-1">• 不符合我们政策的图片将被删除</p>
              </div>
              <div>
                <p className="font-semibold text-title">文件要求</p>
                <ul className="text-body-secondary mt-1 space-y-0.5">
                  <li>• 至少 300px</li>
                  <li>• JPG、PNG、WEBP 文件</li>
                </ul>
              </div>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleTempFileSelect}
          />

          <DialogFooter>
            <Button variant="outline" onClick={() => { setTempPreview(null); setTempFile(null); setUploadDialogOpen(false); }} className="flex-1">
              取消
            </Button>
            <Button
              variant="gradient"
              className="flex-1"
              disabled={!tempPreview}
              onClick={() => {
                if (tempFile) {
                  setCoverFile(tempFile);
                  setCoverPreview(tempPreview);
                }
                setUploadDialogOpen(false);
              }}
            >
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
