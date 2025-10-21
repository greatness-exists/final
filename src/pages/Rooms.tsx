import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import roomImage from "@/assets/room-ocean-view.jpg";

const bookingUrl = "https://us2.cloudbeds.com/reservation/65CAqa";

const rooms = [
  {
    id: 1,
    name: "Deluxe Double Room with Sea View",
    description: "Luxurious double room featuring stunning ocean views and premium amenities.",
    amenities: ["Sea View", "Double Bed", "Private Bathroom", "Air Conditioning", "WiFi"],
  },
  {
    id: 2,
    name: "Luxury Double Room with Sea View",
    description: "Experience ultimate comfort in our premium double room with breathtaking sea views.",
    amenities: ["Sea View", "Double Bed", "Private Bathroom", "Mini Bar", "Balcony"],
  },
  {
    id: 3,
    name: "Family Room with Private Bathroom",
    description: "Spacious family accommodation perfect for groups, featuring a private bathroom.",
    amenities: ["Private Bathroom", "Multiple Beds", "Family Friendly", "Air Conditioning"],
  },
  {
    id: 4,
    name: "Double Room with Garden View",
    description: "Peaceful double room overlooking our lush tropical gardens.",
    amenities: ["Garden View", "Double Bed", "Private Bathroom", "WiFi"],
  },
  {
    id: 5,
    name: "Triple Room with Private Bathroom",
    description: "Comfortable triple room ideal for small groups or families.",
    amenities: ["Private Bathroom", "Three Beds", "Air Conditioning", "WiFi"],
  },
  {
    id: 6,
    name: "Deluxe Twin Room with Sea View",
    description: "Premium twin room with spectacular ocean views and modern comforts.",
    amenities: ["Sea View", "Twin Beds", "Private Bathroom", "Balcony", "Mini Bar"],
  },
  {
    id: 7,
    name: "Twin Room with Garden View",
    description: "Serene twin room with views of our beautiful gardens.",
    amenities: ["Garden View", "Twin Beds", "Private Bathroom", "WiFi"],
  },
  {
    id: 8,
    name: "Standard Twin Room with Shared Bathroom",
    description: "Comfortable and affordable twin room with shared bathroom facilities.",
    amenities: ["Twin Beds", "Shared Bathroom", "Fan", "WiFi"],
  },
  {
    id: 9,
    name: "Standard Double Room with Shared Bathroom",
    description: "Budget-friendly double room with shared bathroom facilities.",
    amenities: ["Double Bed", "Shared Bathroom", "Fan", "WiFi"],
  },
];

const Rooms = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section
        className="relative h-96 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${roomImage})` }}
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
              <Card key={room.id} className="overflow-hidden hover-scale transition-all">
                <img
                  src={roomImage}
                  alt={room.name}
                  className="w-full h-64 object-cover"
                />
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
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Rooms;