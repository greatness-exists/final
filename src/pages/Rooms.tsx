import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import roomImage from "@/assets/room-ocean-view.jpg";

const bookingUrl = "https://us2.cloudbeds.com/reservation/65CAqa";

const rooms = [
  {
    id: 1,
    name: "Deluxe Double Room with Sea View",
    description: "Luxurious double room featuring stunning ocean views and premium amenities.",
    amenities: ["Sea View", "Double Bed", "Private Bathroom", "Air Conditioning", "WiFi"],
    images: ["https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Deluxe%20Double%20rooms%20with%20sea%20view/DDRWSV.jpg",
    "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Deluxe%20Double%20rooms%20with%20sea%20view/DDRWSV2.jpg",
    "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Deluxe%20Double%20rooms%20with%20sea%20view/DDRWSV3.jpg",
    "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Deluxe%20Double%20rooms%20with%20sea%20view/DDRWSV4.jpg",
    "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Deluxe%20Double%20rooms%20with%20sea%20view/DDRWSV5.jpg",
    ],
  },
  {
    id: 2,
    name: "Luxury Double Room with Sea View",
    description: "Experience ultimate comfort in our premium double room with breathtaking sea views.",
    amenities: ["Sea View", "Double Bed", "Private Bathroom", "Mini Bar", "Balcony"],
    images: ["https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Luxury%20double%20room%20with%20sea%20view/LDRWSV.jpg",
    "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Luxury%20double%20room%20with%20sea%20view/LDRWSV2.jpg",
    "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Luxury%20double%20room%20with%20sea%20view/LDRWSV3.jpg",
    "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Luxury%20double%20room%20with%20sea%20view/LDRWSV4.jpg",
    "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Luxury%20double%20room%20with%20sea%20view/LDRWSV5.jpg",
    ],
  },
  {
    id: 3,
    name: "Family Room with Private Bathroom",
    description: "Spacious family accommodation perfect for groups, featuring a private bathroom.",
    amenities: ["Private Bathroom", "Multiple Beds", "Family Friendly", "Air Conditioning"],
    images: ["https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Family%20room%20with%20private%20bathroom/FRWPB.jpg",
    "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Family%20room%20with%20private%20bathroom/FRWPB2.jpg",
    ],
  },
  {
    id: 4,
    name: "Double Room with Garden View",
    description: "Peaceful double room overlooking our lush tropical gardens.",
    amenities: ["Garden View", "Double Bed", "Private Bathroom", "WiFi"],
    images: ["https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Double%20room%20with%20graden%20view/DRWGV.jpg",
    "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Double%20room%20with%20graden%20view/DRWGV2.jpg",
    ],
  },
  {
    id: 5,
    name: "Triple Room with Private Bathroom",
    description: "Comfortable triple room ideal for small groups or families.",
    amenities: ["Private Bathroom", "Three Beds", "Air Conditioning", "WiFi"],
    images: [
      "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Triple%20Bedroom%20W%20Private%20Bathroom/TBWPB.jpg",
      "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Triple%20Bedroom%20W%20Private%20Bathroom/TBWPB2.jpg",
      "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Triple%20Bedroom%20W%20Private%20Bathroom/TBWPB3.jpg",
      "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Triple%20Bedroom%20W%20Private%20Bathroom/TBWPB4.jpg",
      "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Triple%20Bedroom%20W%20Private%20Bathroom/TBWPB5.JPG",
      "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Triple%20Bedroom%20W%20Private%20Bathroom/TBWPB6.jpg",
      "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Triple%20Bedroom%20W%20Private%20Bathroom/TBWPB7.jpg",
    ],
  },
  {
    id: 6,
    name: "Deluxe Twin Room with Sea View",
    description: "Premium twin room with spectacular ocean views and modern comforts.",
    amenities: ["Sea View", "Twin Beds", "Private Bathroom", "Balcony", "Mini Bar"],
    images: ["https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Double%20Twin%20Room%20with%20Sea%20view/DTRWSV.JPG" , 
    "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Double%20Twin%20Room%20with%20Sea%20view/DTRWSV2.jpg" ,
    "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Double%20Twin%20Room%20with%20Sea%20view/DTRWSV3.jpg",
    "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Double%20Twin%20Room%20with%20Sea%20view/DTRWSV4.jpg",
    "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Double%20Twin%20Room%20with%20Sea%20view/DTRWSV5.jpg",
    ],
  },
  {
    id: 7,
    name: "Twin Room with Garden View",
    description: "Serene twin room with views of our beautiful gardens.",
    amenities: ["Garden View", "Twin Beds", "Private Bathroom", "WiFi"],
    images: ["https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Twin%20room%20with%20garden%20view/TRWGV.jpg",
    "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Twin%20room%20with%20garden%20view/TRWGV2.jpg",
    ],
  },
  {
    id: 8,
    name: "Standard Twin Room with Shared Bathroom",
    description: "Comfortable and affordable twin room with shared bathroom facilities.",
    amenities: ["Twin Beds", "Shared Bathroom", "Fan", "WiFi"],
    images: ["https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Standard%20Twin%20Room%20with%20Shared%20Bathroom/STRWSB.jpg",
    "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Standard%20Twin%20Room%20with%20Shared%20Bathroom/STRWSB2.jpg",
    ],
  },
  {
    id: 9,
    name: "Standard Double Room with Shared Bathroom",
    description: "Budget-friendly double room with shared bathroom facilities.",
    amenities: ["Double Bed", "Shared Bathroom", "Fan", "WiFi"],
    images: ["https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Standard%20Double%20Room%20with%20Shared%20Bathroom/SDRWSB.jpg",
    ],
  },
];

const RoomCard = ({ room }: { room: typeof rooms[0] }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const images = room.images || [roomImage];
  const hasMultipleImages = images.length > 1;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextImage();
    }
    if (isRightSwipe) {
      prevImage();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <Card className="overflow-hidden hover-scale transition-all">
      <div 
        className="relative h-64 overflow-hidden group"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={images[currentImageIndex]}
          alt={`${room.name} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        {hasMultipleImages && (
          <>
            {/* Desktop Navigation Buttons */}
            <button
              onClick={prevImage}
              className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Image Indicators */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex
                      ? "bg-white w-6"
                      : "bg-white/50 hover:bg-white/75"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <CardContent className="p-6">
        <h3 className="text-2xl font-bold mb-2 text-foreground">{room.name}</h3>
        <p className="text-muted-foreground mb-4">{room.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {room.amenities.map((amenity) => (
            <span
              key={amenity}
              className="text-xs bg-muted px-3 py-1 rounded-full text-muted-foreground"
            >
              {amenity}
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
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section
        className="relative h-96 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url("https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Room3.JPG")` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in">Our Rooms</h1>
          <p className="text-xl mb-6 animate-fade-in">Find your perfect coastal sanctuary</p>
        </div>
      </section>

      {/* Rooms Grid */}
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