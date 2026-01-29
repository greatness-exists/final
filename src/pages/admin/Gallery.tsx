import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import {
  Loader2,
  Plus,
  Trash2,
  Image as ImageIcon,
  Sparkles,
} from 'lucide-react';
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
import ImageUpload from '@/components/admin/ImageUpload';
import FileManager from '@/components/admin/FileManager';
import { fetchAdminData, saveAdminData, deleteAdminData } from '@/lib/adminApi';
import { getImageUrl } from '@/lib/utils';

interface GalleryItem {
  id: string;
  image_url: string;
  category: string;
  order_index: number;
  description: string | null;
}

export default function AdminGallery() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [showFileManager, setShowFileManager] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<GalleryItem | null>(null);

  const [newGalleryItem, setNewGalleryItem] = useState({
    image_url: '',
    category: 'general',
    description: '',
  });

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const data = await fetchAdminData<GalleryItem>('gallery');
      setGallery(data || []);
    } catch {
      toast.error('Failed to fetch gallery');
    }
    setLoading(false);
  };

  const handleAddGallery = async () => {
    if (!newGalleryItem.image_url) {
      toast.error('Please upload an image first');
      return;
    }

    setAdding(true);
    try {
      const result = await saveAdminData<GalleryItem>('add', 'gallery', {
        ...newGalleryItem,
        order_index: gallery.length,
      });

      if (!result.success) throw new Error(result.error);

      if (result.item) {
        setGallery([...gallery, result.item]);
      }
      setNewGalleryItem({
        image_url: '',
        category: 'general',
        description: '',
      });

      toast.success('Image added');
    } catch (e: any) {
      toast.error(e.message || 'Failed to add image');
    }
    setAdding(false);
  };

  const handleDeleteClick = (item: GalleryItem) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;
    
    setDeleteDialogOpen(false);
    try {
      const result = await deleteAdminData('gallery', itemToDelete.id, itemToDelete.image_url);
      if (!result.success) throw new Error(result.error);

      setGallery(gallery.filter((i) => i.id !== itemToDelete.id));
      toast.success('Image removed');
    } catch (e: any) {
      toast.error(e.message || 'Failed to delete image');
    }
    setItemToDelete(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-12 h-12 animate-spin text-primary opacity-20" />
      </div>
    );
  }

    return (
      <div className="space-y-8 pb-32 animate-in fade-in duration-700 min-h-screen">
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-serif text-2xl">Remove Image?</AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              This will remove <strong>{itemToDelete?.description || 'this image'}</strong> from the gallery. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3 sm:gap-0">
            <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="rounded-xl bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex justify-between items-end border-b pb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-primary/5">
            <ImageIcon className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-5xl font-serif font-bold">Gallery</h1>
        </div>

        <Button onClick={() => setShowFileManager(true)}>
          Open File Manager
        </Button>
      </div>

      {showFileManager && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[85vh] overflow-auto relative">
            <div className="sticky top-0 bg-white z-10 p-4 border-b flex justify-between items-center">
              <h2 className="font-serif text-xl">File Manager</h2>
              <button
                className="px-4 py-2 text-sm rounded-xl bg-gray-100 hover:bg-gray-200 transition"
                onClick={() => setShowFileManager(false)}
              >
                Close
              </button>
            </div>
            <div className="p-6">
              <FileManager />
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-1 rounded-[2rem] h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Plus /> New Entry
            </CardTitle>
            <CardDescription>Add a new image</CardDescription>
          </CardHeader>

            <CardContent className="space-y-6">
              <ImageUpload
                label="Select Image"
                category={newGalleryItem.category}
                currentUrl={newGalleryItem.image_url}
                onUpload={(url) =>
                  setNewGalleryItem({ ...newGalleryItem, image_url: url })
                }
              />

            <div>
              <Label>Category</Label>
              <select
                className="w-full h-12 rounded-xl px-4 border border-input bg-background"
                value={newGalleryItem.category}
                onChange={(e) =>
                  setNewGalleryItem({
                    ...newGalleryItem,
                    category: e.target.value,
                  })
                }
              >
                <option value="general">General</option>
                <option value="rooms">Rooms</option>
                <option value="food">Food</option>
                <option value="activities">Activities</option>
                <option value="wellness">Wellness</option>
                <option value="nature">Nature</option>
              </select>
            </div>

            <div>
              <Label>Description</Label>
              <Input
                value={newGalleryItem.description}
                onChange={(e) =>
                  setNewGalleryItem({
                    ...newGalleryItem,
                    description: e.target.value,
                  })
                }
              />
            </div>
          </CardContent>

          <CardFooter>
            <Button
              className="w-full"
              disabled={adding}
              onClick={handleAddGallery}
            >
              {adding ? (
                <Loader2 className="animate-spin" />
              ) : (
                'Publish'
              )}
            </Button>
          </CardFooter>
        </Card>

        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {gallery.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden rounded-[2rem]"
            >
                <div className="aspect-[4/5] relative group">
                  <img
                    src={getImageUrl(item.image_url)}
                    alt={item.description || 'Gallery image'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => (e.target as HTMLImageElement).src = 'https://placehold.co/400x500?text=Invalid+URL'}
                  />

                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition-all duration-300">
                    <Button
                      variant="destructive"
                      size="icon"
                      className="rounded-full h-12 w-12 shadow-xl hover:scale-110 active:scale-95"
                      onClick={() => handleDeleteClick(item)}
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                    
                    <ImageUpload 
                      onUpload={async (url) => {
                        const result = await saveAdminData('update', 'gallery', { image_url: url }, item.id);
                        if (result.success) {
                          toast.success('Image replaced');
                          setGallery(gallery.map(g => g.id === item.id ? { ...g, image_url: url } : g));
                        }
                      }}
                      compact
                    />
                  </div>
                </div>

              <CardFooter className="flex justify-between py-4">
                <div>
                  <p className="font-serif italic truncate max-w-[180px]">
                    {item.description || 'Untitled'}
                  </p>
                  <p className="text-xs opacity-40">{item.category}</p>
                </div>
                <Sparkles className="opacity-30" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
