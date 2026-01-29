import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Upload, X, Link as LinkIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { uploadFile } from '@/lib/adminApi';
import { getImageUrl } from '@/lib/utils';

interface ImageUploadProps {
  onUpload: (url: string) => void;
  currentUrl?: string;
  label?: string;
  compact?: boolean;
  category?: string;

}

export default function ImageUpload({ onUpload, currentUrl, label, compact, category }: ImageUploadProps) {  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentUrl || null);
  const [urlInput, setUrlInput] = useState(currentUrl || '');

  useEffect(() => {
    setPreview(currentUrl || null);
    setUrlInput(currentUrl || '');
  }, [currentUrl]);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
            
      // Create immediate local preview
      const localPreview = URL.createObjectURL(file);
      setPreview(localPreview);
      setUploading(true);

const result = await uploadFile(file, undefined, category);      
      if (!result.success) {
        setPreview(currentUrl || null);
                URL.revokeObjectURL(localPreview);
        throw new Error(result.error || 'Upload failed');
      }

  // Set server URL
      const serverUrl = result.url || '';
      setPreview(serverUrl);
      setUrlInput(serverUrl);
      onUpload(serverUrl);
      
      // Cleanup local preview AFTER a short delay to allow the new image to start loading
      setTimeout(() => {
        URL.revokeObjectURL(localPreview);
      }, 2000);
      
      toast.success('Image uploaded successfully');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error uploading image';
      toast.error(message);
    } finally {
      setUploading(false);
    }
  };

  const handleUrlSubmit = () => {
    if (urlInput) {
      setPreview(urlInput);
      onUpload(urlInput);
      toast.success('Image URL updated');
    }
  };

  if (compact) {
    return (
      <div className="relative">
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full h-12 w-12 shadow-xl hover:scale-110 active:scale-95 bg-white/90 hover:bg-white text-primary"
          disabled={uploading}
          asChild
        >
          <label className="cursor-pointer">
            {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
            <input 
              type="file" 
              className="hidden" 
              accept="image/*"
              onChange={handleUpload}
              disabled={uploading}
            />
          </label>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {label && <Label className="text-sm font-serif uppercase tracking-widest opacity-60">{label}</Label>}
      
      <div className="grid gap-6">
        {preview && (
            <div className="relative aspect-video rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-muted/20 group">
              <img 
                src={getImageUrl(preview)} 
                alt="Preview" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                onError={(e) => (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Invalid+Image+URL'}
              />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button 
                variant="destructive" 
                size="icon" 
                type="button" 
                className="h-12 w-12 rounded-2xl shadow-xl"
                onClick={() => {
                  setPreview(null);
                  setUrlInput('');
                  onUpload('');
                }}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>
        )}

        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-primary/5 p-1 rounded-2xl h-12">
            <TabsTrigger value="upload" className="rounded-xl gap-2 font-sans text-xs uppercase tracking-widest">
              <Upload className="w-3 h-3" /> Upload
            </TabsTrigger>
            <TabsTrigger value="url" className="rounded-xl gap-2 font-sans text-xs uppercase tracking-widest">
              <LinkIcon className="w-3 h-3" /> External URL
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="mt-4">
            <Label 
              htmlFor="image-upload" 
              className="flex flex-col items-center justify-center py-10 rounded-2xl border-4 border-dashed border-primary/10 hover:border-primary/30 hover:bg-primary/5 transition-all cursor-pointer bg-white/50"
            >
              <div className="flex flex-col items-center gap-3 text-muted-foreground text-center px-4">
                {uploading ? (
                  <Loader2 className="w-10 h-10 animate-spin text-primary" />
                ) : (
                  <>
                    <div className="p-4 rounded-2xl bg-primary/5">
                      <Upload className="w-8 h-8 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-serif text-foreground">Click to upload image</p>
                      <p className="text-[10px] uppercase tracking-widest opacity-60">PNG, JPG or WebP (Max 5MB)</p>
                    </div>
                  </>
                )}
              </div>
            </Label>
            <Input 
              id="image-upload" 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleUpload}
              disabled={uploading}
            />
          </TabsContent>
          
          <TabsContent value="url" className="mt-4">
            <div className="flex gap-2">
              <Input 
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="h-12 bg-white/50 border-muted focus:border-primary transition-all rounded-xl px-4 font-sans"
              />
              <Button 
                type="button" 
                onClick={handleUrlSubmit}
                className="h-12 rounded-xl bg-primary px-6 font-serif"
              >
                Apply
              </Button>
            </div>
            <p className="mt-3 text-[10px] text-muted-foreground px-1 uppercase tracking-widest leading-relaxed">
              Use this to link existing project images (e.g., /772A2174.jpg) or external assets.
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
