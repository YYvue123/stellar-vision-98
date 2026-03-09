import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon } from "lucide-react";
import type { TrackDetailData } from "./TrackDetail";

interface Props {
  open: boolean;
  onClose: () => void;
  track: TrackDetailData | null;
  onSave: (data: { title: string; description: string }) => void;
}

export const EditTrackDialog = ({ open, onClose, track, onSave }: Props) => {
  const [title, setTitle] = useState(track?.title ?? "");
  const [description, setDescription] = useState("");

  // Sync when track changes
  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen && track) {
      setTitle(track.title);
      setDescription("");
    }
    if (!isOpen) onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>自定义设置</DialogTitle>
        </DialogHeader>

        <div className="flex gap-5 mt-2">
          {/* Cover section */}
          <div className="flex flex-col items-center gap-2 flex-shrink-0">
            <p className="text-sm font-semibold text-primary self-start">编辑封面</p>
            {track && (
              <img
                src={track.cover}
                alt={track.title}
                className="h-28 w-28 rounded-xl object-cover"
              />
            )}
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <ImageIcon className="h-3.5 w-3.5" />
              编辑照片
            </Button>
          </div>

          {/* Fields */}
          <div className="flex-1 space-y-3">
            <div>
              <p className="text-sm font-semibold text-title mb-1.5">标题</p>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="输入标题"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-title mb-1.5">说明</p>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                rows={5}
                className="resize-none"
              />
            </div>
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
              onSave({ title, description });
              onClose();
            }}
          >
            保存
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
