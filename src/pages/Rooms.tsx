import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";import { ChevronLeft, ChevronRight } from "lucide-react";
import { CloudbedsWidget } from "@/components/CloudbedsWidget";


const bookingUrl = "https://us2.cloudbeds.com/reservation/65CAqa";


const initialRooms = [  {
    id: 1,
    name: "Deluxe Double Room with Sea View",
    description:
      "Luxurious double room featuring stunning ocean views and premium amenities.",
    amenities: [
      "Sea View",
      "Double Bed",
      "Private Bathroom",
      "Air Conditioning",
      "WiFi",
      "Balcony",
    ],
    images: [
      "/Rooms/DDRWSV.jpg",
      "/Rooms/DDRWSV2.jpg",
      "/Rooms/DDRWSV3.jpg",
      "/Rooms/DDRWSV4.jpg",
      "/Rooms/DDRWSV5.jpg",
    ],
  },
  {
    id: 2,
    name: "Luxury Double Room with Sea View",
    description:
      "Experience ultimate comfort in our premium double room with breathtaking sea views.",
    amenities: [
      "Sea View",
      "Double Bed",
      "Private Bathroom",
      "Air Conditioning",
      "WiFi",
      "Balcony",
    ],
    images: [
      "/Rooms/LDRWSV.jpg",
      "/Rooms/LDRWSV2.jpg",
      "/Rooms/LDRWSV3.jpg",
      "/Rooms/LDRWSV4.jpg",
      "/Rooms/LDRWSV5.jpg",
    ],
  },
  {
    id: 3,
    name: "Family Room with Private Bathroom",
    description:
      "Spacious family accommodation perfect for groups, featuring a private bathroom.",
    amenities: [
      "Private Bathroom",
      "Multiple Beds",
      "Family Friendly",
      "Air Conditioning",
      "WiFi",
      "Balcony",
    ],
    images: [
      "/Rooms/FRWPB.jpg",
      "/Rooms/FRWPB2.jpg",
    ],
  },
  { id: 4, 
    name: "Double Room with Garden View", description: "Peaceful double room overlooking our lush tropical gardens.", 
    amenities: [ "Garden View", "Double Bed", "Private Bathroom", "Air Conditioning", "WiFi", "Balcony", ], 
    images: [ "/Rooms/DRWGV.jpg", 
      "/Rooms/DRWGV2.jpg", ], }, 
  { id: 5, 
    name: "Triple Room with Private Bathroom", description: "Comfortable triple room ideal for small groups or families.", 
    amenities: [ "Private Bathroom", "Three Beds", "Air Conditioning", "WiFi", "Balcony", ], images: [ "/Rooms/TBWPB.jpg", 
      "/Rooms/TBWPB2.jpg", 
      "/Rooms/TBWPB3.jpg", 
      "/Rooms/TBWPB4.jpg", 
      "/Rooms/TBWPB5.JPG", 
      "/Rooms/TBWPB6.jpg", 
      "/Rooms/TBWPB7.jpg", ], }, 
  { id: 6, 
    name: "Deluxe Twin Room with Sea View", description: "Premium twin room with spectacular ocean views and modern comforts.", amenities: [ "Sea View", "Twin Beds", "Private Bathroom", "Air Conditioning", "Balcony", "WiFi", ], images: [ "/Rooms/DTRWSV.jpg", 
      "/Rooms/DTRWSV2.jpg", 
      "/Rooms/DTRWSV3.jpg", 
      "/Rooms/DTRWSV4.jpg", 
      "/Rooms/DTRWSV5.jpg", ], }, 
  { id: 7, 
    name: "Twin Room with Garden View", description: "Serene twin room with views of our beautiful gardens.", amenities: [ "Garden View", "Twin Beds", "Private Bathroom", "Air Conditioning", "WiFi", "Balcony", ], images: [ "/Rooms/TRWGV.jpg", 
      "/Rooms/TRWGV2.jpg", ], }, 
  { id: 8, 
    name: "Standard Twin Room with Shared Bathroom", description: "Comfortable and affordable twin room with shared bathroom facilities.", 
    amenities: ["Twin Beds", "Shared Bathroom", "Fan", "WiFi", "Balcony"], 
    images: [ "/Rooms/STRWSB.jpg", 
      "/Rooms/STRWSB2.jpg", ], }, 
  { id: 9, 
    name: "Standard Double Room with Shared Bathroom", 
    description: "Budget-friendly double room with shared bathroom facilities.", 
    amenities: ["Double Bed", "Shared Bathroom", "Fan", "WiFi", "Balcony"], 
    images: [ "/Rooms/SDRWSB.jpg", ], },
];

// Room Card Component
const RoomCard = ({ room }: { room: any }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const images = room.images || [];
  const hasMultiple = images.length > 1;

  const next = () => setCurrentImageIndex((i) => (i + 1) % images.length);
  const prev = () =>
    setCurrentImageIndex((i) => (i - 1 + images.length) % images.length);

  const onTouchStart = (e: React.TouchEvent) =>
    setTouchStart(e.targetTouches[0].clientX);
  const onTouchMove = (e: React.TouchEvent) =>
    setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const diff = touchStart - touchEnd;
    if (diff > 50) next();
    if (diff < -50) prev();

    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <Card className="overflow-hidden transition-all hover-scale">
      <div
        className="relative h-64 overflow-hidden group"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <img
          src={images[currentImageIndex]}
          alt={room.name}
          className="w-full h-full object-cover"
        />

        {hasMultiple && (
          <>
            <button
              onClick={prev}
              className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={next}
              className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                            {images.map((_: any, i: number) => (

                <button
                  key={i}
                  onClick={() => setCurrentImageIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentImageIndex
                      ? "bg-white w-6"
                      : "bg-white/50 hover:bg-white/75"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <CardContent className="p-6">
        <h3 className="text-2xl font-bold mb-2">{room.name}</h3>
        <p className="text-muted-foreground mb-4">{room.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
{room.amenities?.map((a: string) => (            <span
              key={a}
              className="text-xs bg-muted px-3 py-1 rounded-full text-muted-foreground"
            >
              {a}
            </span>
          ))}
        </div>

        <Button asChild className="w-full">
          <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
            Book Now
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

  const Rooms = () => {
    const [rooms, setRooms] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
  
    const fetchRooms = async () => {
      try {
        const response = await fetch('/admin/api/list.php?type=rooms');
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setRooms(data);
        } else {
          setRooms(initialRooms);
        }
      } catch (error) {
        console.error('Failed to fetch rooms:', error);
        setRooms(initialRooms);
      } finally {
        setLoading(false);
      }
    };
   useEffect(() => {
      fetchRooms();
    }, []);
   if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
        </div>
      );
    }

    return (
      <div className="min-h-screen pt-20">
      {/* HERO */}
      <section
        className="relative h-96 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${"/Room3.jpg"})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
            Our Rooms
          </h1>
          <p className="text-xl mb-6 animate-fade-in">
            Find your perfect coastal sanctuary
          </p>
        </div>
      </section>

      {/* CLOUD BEDS AVAILABILITY */}
      <section className="py-16 px-4 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto max-w-5xl">
          <CloudbedsWidget />
        </div>
      </section>

      {/* ROOMS GRID */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Rooms;
