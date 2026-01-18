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
  Camera,
  LayoutGrid,
  Sparkles,
} from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';
import FileManager from '@/components/admin/FileManager';

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
      const response = await fetch('/admin/api/list.php?type=gallery');
      const data = await response.json();
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
      const response = await fetch('/admin/api/save.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add',
          type: 'gallery',
          data: {
            ...newGalleryItem,
            order_index: gallery.length,
          },
        }),
      });

      const result = await response.json();

      if (!result.success) throw new Error(result.error);

      setGallery([...gallery, result.item]);
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

  const handleDeleteGallery = async (item: GalleryItem) => {
    if (!window.confirm('Remove this image from the gallery?')) return;

    try {
      const response = await fetch('/admin/api/delete.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'gallery',
          id: item.id,
          path: item.image_url,
        }),
      });

      const result = await response.json();
      if (!result.success) throw new Error(result.error);

      setGallery(gallery.filter((i) => i.id !== item.id));
      toast.success('Image removed');
    } catch (e: any) {
      toast.error(e.message || 'Failed to delete image');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-12 h-12 animate-spin text-primary opacity-20" />
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {/* Header */}
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

      {/* File Manager Modal */}
      {showFileManager && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[85vh] overflow-auto relative p-6">
            <button
              className="absolute top-4 right-4 px-3 py-1 text-sm rounded bg-gray-200"
              onClick={() => setShowFileManager(false)}
            >
              Close
            </button>
            <FileManager />
          </div>
        </div>
      )}

      <div className="grid gap-12 lg:grid-cols-3">
        {/* Add New */}
        <Card className="lg:col-span-1 rounded-[3rem] sticky top-28">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Plus /> New Entry
            </CardTitle>
            <CardDescription>Add a new image</CardDescription>
          </CardHeader>

          <CardContent className="space-y-8">
            <ImageUpload
              label="Select Image"
              currentUrl={newGalleryItem.image_url}
              onUpload={(url) =>
                setNewGalleryItem({ ...newGalleryItem, image_url: url })
              }
            />

            <div>
              <Label>Category</Label>
              <select
                className="w-full h-14 rounded-xl px-4"
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

        {/* Gallery Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {gallery.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden rounded-[2.5rem]"
            >
              <div className="aspect-[4/5] relative">
                <img
                  src={item.image_url}
                  alt={item.description || 'Gallery image'}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 flex items-center justify-center transition">
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDeleteGallery(item)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </div>

              <CardFooter className="flex justify-between">
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
