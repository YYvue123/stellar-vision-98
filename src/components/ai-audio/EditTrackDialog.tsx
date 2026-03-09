import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon, Upload } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import type { TrackDetailData } from "./TrackDetail";

interface Props {
  open: boolean;
  onClose: () => void;
  track: TrackDetailData | null;
  onSave: (data: { title: string; description: string; coverFile?: File }) => void;
}

const EditFormContent = ({
  track,
  coverPreview,
  title,
  setTitle,
  description,
  setDescription,
  onEditPhoto,
}: {
  track: TrackDetailData | null;
  coverPreview: string | null;
  title: string;
  setTitle: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  onEditPhoto: () => void;
}) => {
  const displayCover = coverPreview || track?.cover;

  return (
    <div className="flex gap-5 mt-2">
      {/* Left: cover + edit button */}
      <div className="flex flex-col items-center gap-3 flex-shrink-0">
        <p className="text-sm font-semibold text-title self-start">编辑封面</p>
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
          onClick={onEditPhoto}
        >
          <ImageIcon className="h-3.5 w-3.5" />
          编辑照片
        </Button>
      </div>

      {/* Right: title + description */}
      <div className="flex-1 space-y-3">
        <div>
          <p className="text-sm font-semibold text-title mb-1.5">标题</p>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="输入标题" />
        </div>
        <div>
          <p className="text-sm font-semibold text-title mb-1.5">说明</p>
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter description" className="min-h-[100px] resize-y" />
        </div>
      </div>
    </div>
  );
};

export const EditTrackDialog = ({ open, onClose, track, onSave }: Props) => {
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [tempPreview, setTempPreview] = useState<string | null>(null);
  const [tempFile, setTempFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen && track) {
      setCoverPreview(null);
      setCoverFile(null);
      setTitle(track.title);
      setDescription("");
    }
    if (!isOpen) onClose();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTempFile(file);
      setTempPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    onSave({ title, description, coverFile: coverFile || undefined });
    onClose();
  };

  const openUpload = () => {
    setTempPreview(null);
    setTempFile(null);
    setUploadDialogOpen(true);
  };

  const formContent = (
    <EditFormContent
      track={track}
      coverPreview={coverPreview}
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      onEditPhoto={openUpload}
    />
  );

  const footerButtons = (
    <>
      <Button variant="outline" onClick={onClose} className="flex-1">
        取消
      </Button>
      <Button variant="gradient" className="flex-1" onClick={handleSave}>
        保存
      </Button>
    </>
  );

  // Upload sub-dialog content (shared)
  const uploadContent = (
    <>
      <div className="flex flex-col items-center gap-5 py-4">
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
        onChange={handleFileSelect}
      />
    </>
  );

  const uploadFooter = (
    <>
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
    </>
  );

  if (isMobile) {
    return (
      <>
        <Drawer open={open} onOpenChange={handleOpenChange}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>自定义设置</DrawerTitle>
            </DrawerHeader>
            <div className="px-4 pb-2">{formContent}</div>
            <DrawerFooter className="flex-row gap-2">
              {footerButtons}
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        <Drawer open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>上传封面</DrawerTitle>
            </DrawerHeader>
            <div className="px-4">{uploadContent}</div>
            <DrawerFooter className="flex-row gap-2">
              {uploadFooter}
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    );
  }

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>自定义设置</DialogTitle>
          </DialogHeader>
          {formContent}
          <DialogFooter className="mt-4">
            {footerButtons}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>上传封面</DialogTitle>
          </DialogHeader>
          {uploadContent}
          <DialogFooter>
            {uploadFooter}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
