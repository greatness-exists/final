import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, Plus, Trash2, Bed, DollarSign, ListChecks, FileText, Image as ImageIcon, Sparkles, ShieldCheck } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

interface RoomItem {
  id: string;
  name: string;
  description: string;
  price: string | null;
  image_url: string | null;
  amenities: string[];
  images: string[];
  order_index: number;
}

export default function AdminRooms() {
  const [rooms, setRooms] = useState<RoomItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setLoading(true);
      try {
      const response = await fetch('/admin/api/list.php?type=rooms');
      const data = await response.json();
      setRooms(data || []);
    } catch (error) {
      toast.error('Failed to fetch rooms');
    }
    setLoading(false);
  };

  const handleRoomUpdate = async (id: string, field: string, value: any) => {
    setSaving(id);
     try {
      const response = await fetch('/admin/api/save.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update',
          type: 'rooms',
          id: id,
          updates: { [field]: value }
        })
      });
      const result = await response.json();
      
      if (result.success) {
        toast.success(`Room updated`);
        setRooms(rooms.map(room => room.id === id ? { ...room, [field]: value } : room));
      } else {
        throw new Error(result.error || 'Failed to update room');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to update room');
    }
    setSaving(null);
  };

  const handleAddRoom = async () => {
    const newRoom = {
      name: 'New Luxury Suite',
      description: 'Elegant beachside accommodation...',
      amenities: ['Private Terrace', 'Ocean View', 'King Bed'],
      images: [],
      order_index: rooms.length
    };

      try {
      const response = await fetch('/admin/api/save.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add',
          type: 'rooms',
          data: newRoom
        })
      });
      const result = await response.json();
      
      if (result.success) {
        toast.success('New room type created');
        setRooms([...rooms, result.item]);
      } else {
        throw new Error(result.error || 'Failed to add room');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to add room');
    }
  };

  const handleDeleteRoom = async (id: string) => {
    if (!window.confirm('Permanently remove this room type? This action cannot be undone.')) return;

     try {
      const response = await fetch('/admin/api/delete.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'rooms',
          id: id
        })
      });
      const result = await response.json();
      
      if (result.success) {
        toast.success('Room type removed');
        setRooms(rooms.filter(room => room.id !== id));
      } else {
        throw new Error(result.error || 'Failed to delete room');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete room');
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
              <Bed className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-6xl font-serif font-bold text-foreground tracking-tighter">
              Accommodation
            </h1>
          </div>
          <p className="text-muted-foreground font-sans uppercase tracking-[0.4em] text-[10px] font-bold opacity-60 ml-16">Boutique Suites & Spaces</p>
        </div>
        <Button onClick={handleAddRoom} className="w-full md:w-auto gap-3 font-serif text-2xl h-16 px-10 rounded-[2rem] shadow-xl hover:shadow-primary/20 hover:-translate-y-1 transition-all">
          <Plus className="w-6 h-6" /> Create Suite
        </Button>
      </div>

      <div className="grid gap-16">
        {rooms.map((room) => (
          <Card key={room.id} className="overflow-hidden border-none shadow-[0_20px_50px_rgba(0,0,0,0.04)] bg-white/60 backdrop-blur-xl rounded-[3rem] group transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-primary/5 p-10 border-b border-primary/5">
              <div className="space-y-2">
                <CardTitle className="text-4xl font-serif font-bold tracking-tight">{room.name}</CardTitle>
                <CardDescription className="font-sans text-[10px] uppercase tracking-[0.4em] font-bold opacity-30 flex items-center gap-3">
                  <div className="p-1 rounded bg-white/50">
                    <code className="opacity-60">{room.id.split('-')[0]}</code>
                  </div>
                  System Reference
                </CardDescription>
              </div>
              <Button 
                variant="destructive" 
                size="icon" 
                className="h-14 w-14 rounded-2xl shadow-xl hover:shadow-red-500/20 transition-all hover:-translate-y-1"
                onClick={() => handleDeleteRoom(room.id)}
              >
                <Trash2 className="w-6 h-6" />
              </Button>
            </CardHeader>
            <CardContent className="p-10 space-y-16">
              <div className="grid gap-12 lg:grid-cols-2">
                <div className="space-y-10">
                  <div className="grid gap-4">
                    <Label className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground opacity-60 flex items-center gap-3 ml-2">
                      <Bed className="w-3.5 h-3.5" /> Room Identity
                    </Label>
                    <Input 
                      defaultValue={room.name}
                      className="font-sans text-xl h-20 bg-white/40 border-primary/5 focus:border-primary/20 transition-all rounded-3xl px-8 shadow-inner"
                      onBlur={(e) => {
                        if (e.target.value !== room.name) {
                          handleRoomUpdate(room.id, 'name', e.target.value);
                        }
                      }}
                    />
                  </div>
                  <div className="grid gap-4">
                    <Label className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground opacity-60 flex items-center gap-3 ml-2">
                      <DollarSign className="w-3.5 h-3.5" /> Boutique Pricing
                    </Label>
                    <Input 
                      defaultValue={room.price || ''}
                      placeholder="$150 / night"
                      className="font-sans text-xl h-20 bg-white/40 border-primary/5 focus:border-primary/20 transition-all rounded-3xl px-8 shadow-inner"
                      onBlur={(e) => {
                        if (e.target.value !== room.price) {
                          handleRoomUpdate(room.id, 'price', e.target.value);
                        }
                      }}
                    />
                  </div>
                  <div className="grid gap-4">
                    <Label className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground opacity-60 flex items-center gap-3 ml-2">
                      <ListChecks className="w-3.5 h-3.5" /> Sanctuary Amenities
                    </Label>
                    <Input 
                      defaultValue={room.amenities?.join(', ') || ''}
                      placeholder="Wifi, Ocean View, King Bed..."
                      className="font-sans text-xl h-20 bg-white/40 border-primary/5 focus:border-primary/20 transition-all rounded-3xl px-8 shadow-inner"
                      onBlur={(e) => {
                        const newValue = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                        if (JSON.stringify(newValue) !== JSON.stringify(room.amenities)) {
                          handleRoomUpdate(room.id, 'amenities', newValue);
                        }
                      }}
                    />
                    <p className="text-[10px] text-muted-foreground px-4 uppercase tracking-widest opacity-40">Separate features with commas</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Label className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground opacity-60 flex items-center gap-3 ml-2">
                    <FileText className="w-3.5 h-3.5" /> Experience Description
                  </Label>
                  <Textarea 
                    defaultValue={room.description}
                    className="min-h-[380px] font-sans text-xl bg-white/40 border-primary/5 focus:border-primary/20 transition-all rounded-[2.5rem] p-10 leading-relaxed shadow-inner"
                    onBlur={(e) => {
                      if (e.target.value !== room.description) {
                        handleRoomUpdate(room.id, 'description', e.target.value);
                      }
                    }}
                  />
                </div>
              </div>

              <div className="space-y-10 pt-10 border-t border-primary/5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-1">
                    <h3 className="text-3xl font-serif font-bold">Visual Portfolio</h3>
                    <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-muted-foreground opacity-40">Showcase the sanctuary experience</p>
                  </div>
                  <div className="relative">
                    <ImageUpload 
                      onUpload={(url) => {
                        if (url) {
                          const newImages = [...(room.images || []), url];
                          handleRoomUpdate(room.id, 'images', newImages);
                        }
                      }}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                  {room.images?.map((img, i) => (
                    <div key={i} className="group relative aspect-square rounded-[2rem] overflow-hidden border-8 border-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                      <img 
                        src={img} 
                        alt="" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => (e.target as HTMLImageElement).src = 'https://placehold.co/400x300?text=Invalid+URL'}
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button 
                          variant="destructive" 
                          size="icon" 
                          className="h-12 w-12 rounded-2xl shadow-xl transform scale-75 group-hover:scale-100 transition-all"
                          onClick={() => {
                            const newImages = room.images.filter((_, idx) => idx !== i);
                            handleRoomUpdate(room.id, 'images', newImages);
                          }}
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
                      {i === 0 && (
                        <div className="absolute top-4 left-4 bg-primary text-white text-[9px] font-sans uppercase font-bold px-3 py-1.5 rounded-full shadow-2xl backdrop-blur-md border border-white/20">
                          Main Feature
                        </div>
                      )}
                    </div>
                  ))}
                  {(!room.images || room.images.length === 0) && (
                    <div className="col-span-full py-24 text-center border-4 border-dashed rounded-[3rem] bg-primary/5 flex flex-col items-center justify-center space-y-4">
                        <ImageIcon className="w-16 h-16 text-primary/20" />
                        <div className="space-y-1">
                          <p className="text-muted-foreground font-serif text-2xl">No imagery uploaded</p>
                          <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30">Add photos to inspire future guests</p>
                        </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-primary/5 py-8 px-10 border-t border-primary/5 flex items-center justify-between">
              <span className="flex items-center gap-3 text-[9px] font-sans uppercase tracking-[0.4em] text-muted-foreground font-bold opacity-40">
                <Sparkles className="w-3.5 h-3.5 text-primary/40" /> Refined Boutique Experience
              </span>
              <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground flex items-center gap-3 font-bold opacity-60">
                {saving === room.id ? (
                  <><Loader2 className="w-4 h-4 animate-spin text-primary" /> Securing Assets...</>
                ) : (
                  <><ShieldCheck className="w-4 h-4 text-primary/40" /> Sanctuary Synchronized</>
                )}
              </span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
