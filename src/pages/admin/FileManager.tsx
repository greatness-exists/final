import { useEffect, useState, useRef } from 'react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, FolderOpen, RefreshCw, Trash2, Replace, Search, Image as ImageIcon, FolderTree } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface FileItem {
  filename: string;
  path: string;
  folder: string;
  size: number;
  modified: number;
}

export default function FileManager() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<FileItem | null>(null);
  const [replacing, setReplacing] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceTargetRef = useRef<string | null>(null);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const res = await fetch('/admin/api/list-files.php');
      const data = await res.json();
      if (data.success) {
        setFiles(data.files);
      } else {
        throw new Error(data.error || 'Failed to load files');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to load files');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    
    try {
      const res = await fetch('/admin/api/delete-image.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: deleteTarget.path }),
      });
      const data = await res.json();
      
      if (data.success) {
        toast.success(`Deleted ${deleteTarget.filename}`);
        setFiles(files.filter(f => f.path !== deleteTarget.path));
      } else {
        throw new Error(data.error || 'Delete failed');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Delete failed');
    }
    setDeleteTarget(null);
  };

  const handleReplaceClick = (path: string) => {
    replaceTargetRef.current = path;
    setReplacing(path);
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const targetPath = replaceTargetRef.current;
    
    if (!file || !targetPath) {
      setReplacing(null);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('target', targetPath);
      formData.append('replacement', file);

      const res = await fetch('/admin/api/replace.php', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        toast.success(`Replaced ${targetPath} successfully`);
        await fetchFiles();
      } else {
        throw new Error(data.error || 'Replace failed');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Replace failed');
    }
    
    setReplacing(null);
    replaceTargetRef.current = null;
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const filteredFiles = files.filter(f => 
    f.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.folder.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const rootFiles = filteredFiles.filter(f => f.folder === 'root');
  const roomsFiles = filteredFiles.filter(f => f.folder === 'Rooms');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-12 h-12 animate-spin text-primary opacity-20" />
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-4 border-b border-primary/5">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-primary/5">
              <FolderOpen className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-6xl font-serif font-bold text-foreground tracking-tighter">
              File Manager
            </h1>
          </div>
          <p className="text-muted-foreground font-sans uppercase tracking-[0.4em] text-[10px] font-bold opacity-60 ml-16">
            Manage static images in your project
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={fetchFiles} 
          className="gap-2 h-14 px-6 font-sans uppercase tracking-widest text-[10px] font-bold border-primary/10 hover:bg-primary/5 rounded-2xl transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Refresh
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/40" />
        <Input
          placeholder="Search files..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 h-14 bg-white/50 border-primary/10 rounded-2xl font-sans"
        />
      </div>

      <div className="space-y-8">
        <FileSection 
          title="Root Folder" 
          description="Images in public/ directory"
          files={rootFiles}
          formatSize={formatSize}
          onDelete={setDeleteTarget}
          onReplace={handleReplaceClick}
          replacing={replacing}
        />
        
        <FileSection 
          title="Rooms Folder" 
          description="Images in public/Rooms/ directory"
          files={roomsFiles}
          formatSize={formatSize}
          onDelete={setDeleteTarget}
          onReplace={handleReplaceClick}
          replacing={replacing}
        />
      </div>

      <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent className="rounded-3xl border-none shadow-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-serif text-2xl">Delete Image?</AlertDialogTitle>
            <AlertDialogDescription className="font-sans">
              Are you sure you want to delete <strong>{deleteTarget?.filename}</strong>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 rounded-xl"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function FileSection({ 
  title, 
  description, 
  files, 
  formatSize, 
  onDelete, 
  onReplace,
  replacing 
}: { 
  title: string;
  description: string;
  files: FileItem[];
  formatSize: (bytes: number) => string;
  onDelete: (file: FileItem) => void;
  onReplace: (path: string) => void;
  replacing: string | null;
}) {
  if (files.length === 0) return null;

  return (
    <Card className="border-none shadow-[0_20px_50px_rgba(0,0,0,0.04)] bg-white/60 backdrop-blur-xl rounded-[2.5rem] overflow-hidden">
      <CardHeader className="bg-primary/5 px-8 py-6 border-b border-primary/5">
        <div className="flex items-center gap-3">
          <FolderTree className="w-5 h-5 text-primary" />
          <div>
            <CardTitle className="font-serif text-xl">{title}</CardTitle>
            <CardDescription className="font-sans text-[10px] uppercase tracking-widest opacity-60 mt-1">
              {description} • {files.length} files
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {files.map((file) => (
            <div 
              key={file.path}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-muted/20 border-2 border-transparent hover:border-primary/20 transition-all duration-300"
            >
              <img
                src={`/${file.path}?t=${file.modified}`}
                alt={file.filename}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://placehold.co/200x200?text=Error';
                }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                <p className="text-white text-xs font-medium truncate mb-1">{file.filename}</p>
                <p className="text-white/60 text-[10px]">{formatSize(file.size)}</p>
                
                <div className="flex gap-2 mt-3">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="flex-1 h-8 text-[10px] rounded-lg gap-1 bg-white/20 hover:bg-white/30 text-white border-none"
                    onClick={() => onReplace(file.path)}
                    disabled={replacing === file.path}
                  >
                    {replacing === file.path ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Replace className="w-3 h-3" />
                    )}
                    Replace
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="h-8 w-8 p-0 rounded-lg"
                    onClick={() => onDelete(file)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
                  <ImageIcon className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}