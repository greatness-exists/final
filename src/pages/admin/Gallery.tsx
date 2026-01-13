import { useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, Plus, Trash2, Image as ImageIcon, Camera, LayoutGrid, Sparkles } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

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
  const [newGalleryItem, setNewGalleryItem] = useState({ image_url: '', category: 'general', description: '' });

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) toast.error('Failed to fetch gallery');
    else setGallery(data || []);
    setLoading(false);
  };

  const handleAddGallery = async () => {
    if (!newGalleryItem.image_url) return toast.error('Please upload an image first');
    
    setAdding(true);
    const { data, error } = await supabase
      .from('gallery')
      .insert([{ 
        ...newGalleryItem, 
        order_index: gallery.length 
      }])
      .select();

    if (error) {
      toast.error('Failed to add gallery item');
    } else {
      toast.success('Image added to gallery');
      if (data) setGallery([...gallery, data[0]]);
      setNewGalleryItem({ image_url: '', category: 'general', description: '' });
    }
    setAdding(false);
  };

  const handleDeleteGallery = async (item: GalleryItem) => {
    if (!window.confirm('Remove this image from the gallery?')) return;

    const { error } = await supabase
      .from('gallery')
      .delete()
      .eq('id', item.id);

    if (error) {
      toast.error('Failed to delete gallery item');
    } else {
      toast.success('Image removed');
      setGallery(gallery.filter(i => i.id !== item.id));
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
    <div className="space-y-16 animate-in fade-in duration-1000">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-4 border-b border-primary/5">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-primary/5">
              <ImageIcon className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-6xl font-serif font-bold text-foreground tracking-tighter">
              Gallery
            </h1>
          </div>
          <p className="text-muted-foreground font-sans uppercase tracking-[0.4em] text-[10px] font-bold opacity-60 ml-16">Visual Library of Resort Moments</p>
        </div>
      </div>

      <div className="grid gap-12 lg:grid-cols-3">
        <Card className="lg:col-span-1 border-none shadow-[0_20px_50px_rgba(0,0,0,0.04)] bg-white/60 backdrop-blur-xl rounded-[3rem] h-fit sticky top-28">
          <CardHeader className="bg-primary/5 p-10 border-b border-primary/5">
            <CardTitle className="text-3xl font-serif flex items-center gap-4">
              <div className="p-2.5 rounded-xl bg-primary/10">
                <Plus className="w-6 h-6 text-primary" />
              </div>
              New Entry
            </CardTitle>
            <CardDescription className="font-sans text-[10px] uppercase tracking-[0.4em] font-bold opacity-30 mt-2 ml-14">
              Add a new visual to the site
            </CardDescription>
          </CardHeader>
          <CardContent className="p-10 space-y-10">
            <ImageUpload 
              label="Select Image"
              currentUrl={newGalleryItem.image_url}
              onUpload={(url) => setNewGalleryItem({...newGalleryItem, image_url: url})}
            />
            
            <div className="grid gap-4">
              <Label className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground opacity-60 flex items-center gap-3 ml-2">
                <LayoutGrid className="w-3.5 h-3.5" /> Category
              </Label>
              <div className="relative group">
                <select 
                  className="flex h-16 w-full rounded-2xl border-primary/5 bg-white/40 px-6 py-2 text-lg font-serif focus:ring-primary focus:border-primary transition-all appearance-none cursor-pointer shadow-inner"
                  value={newGalleryItem.category}
                  onChange={(e) => setNewGalleryItem({...newGalleryItem, category: e.target.value})}
                >
                  <option value="general">General Resort</option>
                  <option value="rooms">Suites & Rooms</option>
                  <option value="food">Dining & Drinks</option>
                  <option value="activities">Guest Activities</option>
                  <option value="wellness">Spa & Wellness</option>
                  <option value="nature">Nature & Eco</option>
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                  <LayoutGrid className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <Label className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground opacity-60 flex items-center gap-3 ml-2">
                <Camera className="w-3.5 h-3.5" /> Context
              </Label>
              <Input 
                placeholder="Morning waves at Elmina..." 
                className="font-sans text-lg h-16 bg-white/40 border-primary/5 focus:border-primary/20 transition-all rounded-2xl px-6 shadow-inner"
                value={newGalleryItem.description}
                onChange={(e) => setNewGalleryItem({...newGalleryItem, description: e.target.value})}
              />
            </div>
          </CardContent>
          <CardFooter className="p-10 bg-primary/5 border-t border-primary/5">
            <Button 
              onClick={handleAddGallery} 
              disabled={adding || !newGalleryItem.image_url} 
              className="w-full h-16 text-xl font-serif rounded-2xl shadow-xl hover:shadow-primary/20 transition-all hover:-translate-y-1 active:translate-y-0"
            >
              {adding ? <Loader2 className="w-6 h-6 animate-spin mr-3" /> : <Plus className="w-6 h-6 mr-3" />} 
              Publish Moment
            </Button>
          </CardFooter>
        </Card>

        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-10 h-fit">
          {gallery.map((item, i) => (
            <Card key={item.id} className="overflow-hidden group border-none shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] transition-all duration-700 rounded-[2.5rem] bg-white/40 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-8" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="aspect-[4/5] relative overflow-hidden">
                <img 
                  src={item.image_url} 
                  alt={item.description || 'Gallery'} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  onError={(e) => (e.target as HTMLImageElement).src = 'https://placehold.co/400x500?text=Invalid+URL'}
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button 
                    variant="destructive" 
                    size="icon"
                    className="h-16 w-16 rounded-[1.5rem] shadow-2xl transform scale-75 group-hover:scale-100 transition-all duration-500"
                    onClick={() => handleDeleteGallery(item)}
                  >
                    <Trash2 className="w-6 h-6" />
                  </Button>
                </div>
                <div className="absolute top-6 left-6">
                  <span className="bg-white/90 backdrop-blur-md text-[9px] uppercase font-bold tracking-[0.4em] px-4 py-2 rounded-full shadow-2xl text-primary border border-white/20">
                    {item.category}
                  </span>
                </div>
              </div>
              <CardFooter className="p-8 bg-white/30 backdrop-blur-md flex items-center justify-between border-t border-white/20">
                <div className="space-y-1">
                  <p className="text-xl font-serif italic text-foreground truncate max-w-[180px]">{item.description || 'Untitled Moment'}</p>
                  <p className="text-[9px] uppercase tracking-widest opacity-30 font-bold">Sanctuary Asset</p>
                </div>
                <div className="p-2.5 rounded-xl bg-primary/5">
                  <Sparkles className="w-4 h-4 text-primary/40" />
                </div>
              </CardFooter>
            </Card>
          ))}
          
          {gallery.length === 0 && (
            <div className="col-span-full py-48 text-center border-4 border-dashed rounded-[4rem] bg-primary/5 flex flex-col items-center justify-center animate-pulse">
              <div className="p-8 rounded-full bg-primary/5 mb-8">
                <ImageIcon className="w-20 h-20 text-primary/20" />
              </div>
              <h3 className="text-4xl font-serif text-muted-foreground/60">Sanctuary is silent</h3>
              <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-muted-foreground/40 mt-4">Start by adding your first resort moment</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
