import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2, FolderOpen, RefreshCw, Trash2, Replace, Image as ImageIcon, HardDrive } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { fetchFiles as fetchFilesApi, deleteFile, replaceFile } from '@/lib/adminApi';

interface FileItem {
  filename: string;
  name: string;
  size: number;
  modified: number;
  extension: string;
}

export default function FileManager() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [replacing, setReplacing] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<FileItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    setLoading(true);
    try {
      const data = await fetchFilesApi();
      if (data.success) {
        setFiles(data.files || []);
      } else {
        throw new Error('Failed to list files');
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to fetch files';
      toast.error(message);
    }
    setLoading(false);
  };

  const handleDeleteClick = (file: FileItem) => {
    setFileToDelete(file);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!fileToDelete) return;
    
    setDeleting(fileToDelete.filename);
    setDeleteDialogOpen(false);
    
    try {
      const result = await deleteFile(fileToDelete.filename);
      
      if (result.success) {
        toast.success(`Deleted ${fileToDelete.name}`);
        setFiles(files.filter(f => f.filename !== fileToDelete.filename));
      } else {
        throw new Error(result.error || 'Delete failed');
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to delete file';
      toast.error(message);
    }
    setDeleting(null);
    setFileToDelete(null);
  };

  const handleReplaceClick = (file: FileItem) => {
    setReplacing(file.filename);
    fileInputRef.current?.click();
  };

  const handleFileSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!replacing || !event.target.files || event.target.files.length === 0) {
      setReplacing(null);
      return;
    }

    const file = event.target.files[0];

    try {
      const result = await replaceFile(replacing, file);

      if (result.success) {
        toast.success(`Replaced ${replacing}`);
        loadFiles();
      } else {
        throw new Error(result.error || 'Replace failed');
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to replace file';
      toast.error(message);
    }
    
    setReplacing(null);
    if (event.target) {
      event.target.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const rootFiles = files.filter(f => !f.filename.includes('/'));
  const roomFiles = files.filter(f => f.filename.startsWith('Rooms/'));

  if (loading) {
    return (
      <Card className="border-none shadow-[0_20px_50px_rgba(0,0,0,0.04)] bg-white/60 backdrop-blur-xl rounded-[3rem]">
        <CardContent className="flex items-center justify-center py-24">
          <Loader2 className="w-12 h-12 animate-spin text-primary opacity-20" />
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelected}
      />

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="rounded-3xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">Delete File?</DialogTitle>
            <DialogDescription className="text-base">
              This will permanently delete <strong>{fileToDelete?.name}</strong> from the server. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-3 sm:gap-0">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} className="rounded-xl">
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm} className="rounded-xl">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card className="border-none shadow-[0_20px_50px_rgba(0,0,0,0.04)] bg-white/60 backdrop-blur-xl rounded-[3rem]">
        <CardHeader className="bg-primary/5 p-10 border-b border-primary/5 flex flex-row items-center justify-between">
          <div className="space-y-2">
            <CardTitle className="text-3xl font-serif flex items-center gap-4">
              <div className="p-2.5 rounded-xl bg-primary/10">
                <HardDrive className="w-6 h-6 text-primary" />
              </div>
              Static Files
            </CardTitle>
            <CardDescription className="font-sans text-[10px] uppercase tracking-[0.4em] font-bold opacity-30 ml-14">
              Manage images in public folder
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={loadFiles}
            className="rounded-xl gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </CardHeader>
        
        <CardContent className="p-10 space-y-12">
          {rootFiles.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <FolderOpen className="w-5 h-5 text-primary/60" />
                <h3 className="text-lg font-serif">Root Images</h3>
                <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-sans">
                  {rootFiles.length} files
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {rootFiles.map((file) => (
                  <FileCard
                    key={file.filename}
                    file={file}
                    onDelete={handleDeleteClick}
                    onReplace={handleReplaceClick}
                    deleting={deleting === file.filename}
                    replacing={replacing === file.filename}
                    formatFileSize={formatFileSize}
                  />
                ))}
              </div>
            </div>
          )}

          {roomFiles.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <FolderOpen className="w-5 h-5 text-primary/60" />
                <h3 className="text-lg font-serif">Rooms Images</h3>
                <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-sans">
                  {roomFiles.length} files
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {roomFiles.map((file) => (
                  <FileCard
                    key={file.filename}
                    file={file}
                    onDelete={handleDeleteClick}
                    onReplace={handleReplaceClick}
                    deleting={deleting === file.filename}
                    replacing={replacing === file.filename}
                    formatFileSize={formatFileSize}
                  />
                ))}
              </div>
            </div>
          )}

          {files.length === 0 && (
            <div className="py-24 text-center border-4 border-dashed rounded-[2rem] bg-primary/5 flex flex-col items-center justify-center">
              <div className="p-6 rounded-full bg-primary/5 mb-6">
                <ImageIcon className="w-12 h-12 text-primary/20" />
              </div>
              <h3 className="text-2xl font-serif text-muted-foreground/60">No static files found</h3>
              <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-muted-foreground/40 mt-3">
                Upload images to the public folder
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}

interface FileCardProps {
  file: FileItem;
  onDelete: (file: FileItem) => void;
  onReplace: (file: FileItem) => void;
  deleting: boolean;
  replacing: boolean;
  formatFileSize: (bytes: number) => string;
}

function FileCard({ file, onDelete, onReplace, deleting, replacing, formatFileSize }: FileCardProps) {
  return (
    <div className="group relative">
      <div className="aspect-square rounded-2xl overflow-hidden bg-muted/20 border-2 border-white shadow-lg">
        <img
          src={`/${file.filename}?t=${file.modified}`}
          alt={file.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => (e.target as HTMLImageElement).src = 'https://placehold.co/200x200?text=Error'}
        />
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Button
            size="icon"
            variant="secondary"
            className="h-10 w-10 rounded-xl shadow-xl"
            onClick={() => onReplace(file)}
            disabled={replacing || deleting}
          >
            {replacing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Replace className="w-4 h-4" />
            )}
          </Button>
          <Button
            size="icon"
            variant="destructive"
            className="h-10 w-10 rounded-xl shadow-xl"
            onClick={() => onDelete(file)}
            disabled={replacing || deleting}
          >
            {deleting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
      <div className="mt-3 px-1">
        <p className="text-sm font-serif truncate" title={file.name}>{file.name}</p>
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground/60">
          {formatFileSize(file.size)} · {file.extension.toUpperCase()}
        </p>
      </div>
    </div>
  );
}
