import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import roomImage from "@/assets/room-ocean-view.jpg";

const rooms = [
  {
    id: 1,
    name: "Deluxe Double Room with Sea View",
    description: "Luxurious double room featuring stunning panoramic views of the Atlantic Ocean.",
    amenities: ["Sea View", "Double Bed", "Private Bathroom", "Air Conditioning", "WiFi"],
  },
  {
    id: 2,
    name: "Luxury Double Room with Sea View",
    description: "Premium comfort with breathtaking ocean vistas and elegant furnishings.",
    amenities: ["Sea View", "Double Bed", "Private Bathroom", "Mini Bar", "Balcony"],
  },
  {
    id: 3,
    name: "Family Room with Private Bathroom",
    description: "Spacious accommodation perfect for families, with comfortable sleeping arrangements.",
    amenities: ["Private Bathroom", "Multiple Beds", "Air Conditioning", "WiFi", "Extra Space"],
  },
  {
    id: 4,
    name: "Double Room with Garden View",
    description: "Peaceful retreat overlooking our lush tropical gardens and resort grounds.",
    amenities: ["Garden View", "Double Bed", "Private Bathroom", "Air Conditioning", "WiFi"],
  },
  {
    id: 5,
    name: "Triple Room with Private Bathroom",
    description: "Comfortable room designed for three guests with modern amenities.",
    amenities: ["Private Bathroom", "Three Beds", "Air Conditioning", "WiFi", "Spacious"],
  },
  {
    id: 6,
    name: "Deluxe Twin Room with Sea View",
    description: "Elegant twin-bedded room with spectacular ocean views and premium comfort.",
    amenities: ["Sea View", "Twin Beds", "Private Bathroom", "Balcony", "WiFi"],
  },
  {
    id: 7,
    name: "Twin Room with Garden View",
    description: "Serene twin room overlooking the resort's beautiful tropical gardens.",
    amenities: ["Garden View", "Twin Beds", "Private Bathroom", "Air Conditioning", "WiFi"],
  },
  {
    id: 8,
    name: "Standard Twin Room with Shared Bathroom",
    description: "Comfortable and affordable twin room with access to shared bathroom facilities.",
    amenities: ["Twin Beds", "Shared Bathroom", "Air Conditioning", "WiFi", "Value Option"],
  },
  {
    id: 9,
    name: "Standard Double Room with Shared Bathroom",
    description: "Cozy double room offering great value with shared bathroom facilities.",
    amenities: ["Double Bed", "Shared Bathroom", "Air Conditioning", "WiFi", "Budget Friendly"],
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
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Accommodation Options</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from our range of comfortable rooms, each designed to make your stay memorable. 
              From stunning sea views to peaceful garden vistas.
            </p>
          </div>

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
                  <Button className="w-full">Book Now</Button>
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