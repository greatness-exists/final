import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import roomImage from "@/assets/room-ocean-view.jpg";

const rooms = [
  {
    id: 1,
    name: "Ocean View Suite",
    description: "Spacious suite with panoramic ocean views, king-size bed, and private balcony.",
    price: "$250",
    amenities: ["Ocean View", "King Bed", "Private Balcony", "Mini Bar"],
  },
  {
    id: 2,
    name: "Deluxe Beach Room",
    description: "Modern comfort with direct beach access and contemporary African decor.",
    price: "$180",
    amenities: ["Beach Access", "Queen Bed", "Air Conditioning", "WiFi"],
  },
  {
    id: 3,
    name: "Family Villa",
    description: "Perfect for families with two bedrooms, living area, and ocean-facing terrace.",
    price: "$400",
    amenities: ["2 Bedrooms", "Living Room", "Kitchen", "Ocean View"],
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
          <p className="text-xl animate-fade-in">Find your perfect coastal sanctuary</p>
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
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      {room.price}
                      <span className="text-sm text-muted-foreground">/night</span>
                    </span>
                    <Button>Book Now</Button>
                  </div>
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
