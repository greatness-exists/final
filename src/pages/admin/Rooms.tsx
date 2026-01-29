import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, Plus, Trash2, Bed, DollarSign, ListChecks, FileText, Image as ImageIcon, Sparkles, ShieldCheck, RefreshCw } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import ImageUpload from '@/components/admin/ImageUpload';
import { fetchAdminData, saveAdminData, deleteAdminData } from '@/lib/adminApi';
import { getImageUrl } from '@/lib/utils';

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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState<string | null>(null);


  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const data = await fetchAdminData<RoomItem>('rooms');
      setRooms(data || []);
    } catch {
      toast.error('Failed to fetch rooms');
    }
    setLoading(false);
  };

  const handleRoomUpdate = async (id: string, field: string, value: any) => {
    setSaving(id);
    try {
      const result = await saveAdminData('update', 'rooms', { [field]: value }, id);
      
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
      name: 'New Room',
      description: 'Enter room description...',
      price: '$100 / night',
      amenities: ['WiFi', 'Air Conditioning'],
      images: [],
      order_index: rooms.length
    };

    try {
      const result = await saveAdminData<RoomItem>('add', 'rooms', newRoom);
      
      if (result.success && result.item) {
        toast.success('New room created');
        setRooms([...rooms, result.item]);
      } else {
        throw new Error(result.error || 'Failed to add room');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to add room');
    }
  };

  const handleDeleteClick = (id: string) => {
    setRoomToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!roomToDelete) return;
    
    setDeleteDialogOpen(false);
    try {
      const result = await deleteAdminData('rooms', roomToDelete);
      
      if (result.success) {
        toast.success('Room removed');
        setRooms(rooms.filter(room => room.id !== roomToDelete));
      } else {
        throw new Error(result.error || 'Failed to delete room');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete room');
    }
    setRoomToDelete(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-12 h-12 animate-spin text-primary opacity-20" />
      </div>
    );
  }

    return (
      <div className="space-y-8 pb-32 animate-in fade-in duration-1000 min-h-screen">
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-serif text-2xl">Remove Room?</AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              This will permanently remove this room and all its images. This action cannot be undone.
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

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-4 border-b border-primary/5">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-primary/5">
              <Bed className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-5xl font-serif font-bold text-foreground tracking-tighter">
              Rooms
            </h1>
          </div>
          <p className="text-muted-foreground font-sans uppercase tracking-[0.3em] text-[10px] font-bold opacity-60 ml-16">
            {rooms.length} Room Types
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={fetchRooms} className="gap-2 rounded-xl">
            <RefreshCw className="w-4 h-4" /> Refresh
          </Button>
          <Button onClick={handleAddRoom} className="gap-2 rounded-xl">
            <Plus className="w-4 h-4" /> Add Room
          </Button>
        </div>
      </div>

      <div className="grid gap-8">
        {rooms.map((room) => (
          <Card key={room.id} className="overflow-hidden border-none shadow-lg bg-white/80 backdrop-blur-xl rounded-[2rem]">
            <CardHeader className="flex flex-row items-center justify-between bg-primary/5 p-6 border-b border-primary/5">
              <div className="space-y-1">
                <CardTitle className="text-2xl font-serif font-bold">{room.name}</CardTitle>
                <CardDescription className="font-sans text-[10px] uppercase tracking-[0.3em] opacity-50">
                  ID: {room.id}
                </CardDescription>
              </div>
              <Button 
                variant="destructive" 
                size="icon" 
                className="h-10 w-10 rounded-xl"
                onClick={() => handleDeleteClick(room.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </CardHeader>
            
            <CardContent className="p-6 space-y-8">
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground opacity-60 flex items-center gap-2">
                      <Bed className="w-3 h-3" /> Room Name
                    </Label>
                    <Input 
                      defaultValue={room.name}
                      className="h-12 rounded-xl"
                      onBlur={(e) => {
                        if (e.target.value !== room.name) {
                          handleRoomUpdate(room.id, 'name', e.target.value);
                        }
                      }}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground opacity-60 flex items-center gap-2">
                      <DollarSign className="w-3 h-3" /> Price
                    </Label>
                    <Input 
                      defaultValue={room.price || ''}
                      placeholder="$100 / night"
                      className="h-12 rounded-xl"
                      onBlur={(e) => {
                        if (e.target.value !== room.price) {
                          handleRoomUpdate(room.id, 'price', e.target.value);
                        }
                      }}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground opacity-60 flex items-center gap-2">
                      <ListChecks className="w-3 h-3" /> Amenities (comma-separated)
                    </Label>
                    <Input 
                      defaultValue={room.amenities?.join(', ') || ''}
                      placeholder="WiFi, Ocean View, King Bed..."
                      className="h-12 rounded-xl"
                      onBlur={(e) => {
                        const newValue = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                        if (JSON.stringify(newValue) !== JSON.stringify(room.amenities)) {
                          handleRoomUpdate(room.id, 'amenities', newValue);
                        }
                      }}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground opacity-60 flex items-center gap-2">
                    <FileText className="w-3 h-3" /> Description
                  </Label>
                  <Textarea 
                    defaultValue={room.description}
                    className="min-h-[200px] rounded-xl resize-none"
                    onBlur={(e) => {
                      if (e.target.value !== room.description) {
                        handleRoomUpdate(room.id, 'description', e.target.value);
                      }
                    }}
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-primary/5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-serif font-bold">Room Images</h3>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground opacity-50">
                      {room.images?.length || 0} photos
                    </p>
                  </div>
                    <ImageUpload 
                      category="rooms"
                      onUpload={(url: string) => {
                        if (url) {
                          const newImages = [...(room.images || []), url];
                          handleRoomUpdate(room.id, 'images', newImages);
                        }
                      }}
                    />
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {room.images?.map((img, i) => (
                    <div key={i} className="group relative aspect-square rounded-xl overflow-hidden border-2 border-white shadow-lg">
                      <img 
                        src={getImageUrl(img)} 
                        alt={`${room.name} ${i+1}`} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => (e.target as HTMLImageElement).src = 'https://placehold.co/400x300?text=Invalid+URL'}
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button 
                          variant="destructive" 
                          size="icon" 
                          className="h-8 w-8 rounded-lg"
                          onClick={() => {
                            const newImages = room.images.filter((_, idx) => idx !== i);
                            handleRoomUpdate(room.id, 'images', newImages);
                          }}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>

                          <ImageUpload 
                            category="rooms"
                            onUpload={(url: string) => {
                              const newImages = [...room.images];
                              newImages[i] = url;
                              handleRoomUpdate(room.id, 'images', newImages);
                            }}
                            compact
                          />
                      </div>
                      {i === 0 && (
                        <div className="absolute top-2 left-2 bg-primary text-white text-[8px] font-sans uppercase font-bold px-2 py-1 rounded-full">
                          Main
                        </div>
                      )}
                    </div>
                  ))}
                  {(!room.images || room.images.length === 0) && (
                    <div className="col-span-full py-12 text-center border-2 border-dashed rounded-xl bg-primary/5">
                      <ImageIcon className="w-8 h-8 text-primary/20 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">No images yet</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="bg-primary/5 py-4 px-6 border-t border-primary/5 flex items-center justify-between">
              <span className="flex items-center gap-2 text-[9px] font-sans uppercase tracking-[0.3em] text-muted-foreground opacity-50">
                <Sparkles className="w-3 h-3" /> Order: {room.order_index}
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2 opacity-60">
                {saving === room.id ? (
                  <><Loader2 className="w-3 h-3 animate-spin" /> Saving...</>
                ) : (
                  <><ShieldCheck className="w-3 h-3" /> Saved</>
                )}
              </span>
            </CardFooter>
          </Card>
        ))}
      </div>

      {rooms.length === 0 && (
        <div className="py-24 text-center border-2 border-dashed rounded-[2rem] bg-primary/5">
          <Bed className="w-16 h-16 text-primary/20 mx-auto mb-4" />
          <h3 className="text-2xl font-serif text-muted-foreground/60">No rooms yet</h3>
          <p className="text-sm text-muted-foreground/40 mt-2">Click "Add Room" to create your first room</p>
        </div>
      )}
    </div>
  );
}
