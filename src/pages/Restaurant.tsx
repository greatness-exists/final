import { Card, CardContent } from "@/components/ui/card";
import restaurantImage from "@/assets/restaurant.jpg";

const Restaurant = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section
        className="relative h-96 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${restaurantImage})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in">Dining Experience</h1>
          <p className="text-xl animate-fade-in">Taste the flavors of Ghana by the sea</p>
        </div>
      </section>

      {/* About */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6 text-foreground">Coastal Cuisine</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">
            Our beachfront restaurant celebrates the rich culinary heritage of Ghana while
            offering international favorites. Enjoy fresh seafood, locally sourced ingredients,
            and stunning ocean views.
          </p>
        </div>
      </section>

      {/* Dining Options */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Dining Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold mb-3 text-foreground">Breakfast</h3>
                <p className="text-muted-foreground mb-2">7:00 AM - 11:00 AM</p>
                <p className="text-sm text-muted-foreground">
                  Continental and traditional Ghanaian breakfast options
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold mb-3 text-foreground">Lunch</h3>
                <p className="text-muted-foreground mb-2">12:00 PM - 4:00 PM</p>
                <p className="text-sm text-muted-foreground">
                  Light bites, salads, and fresh seafood specialties
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold mb-3 text-foreground">Dinner</h3>
                <p className="text-muted-foreground mb-2">6:00 PM - 10:00 PM</p>
                <p className="text-sm text-muted-foreground">
                  Fine dining with local and international cuisine
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Menu Highlights */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Signature Dishes
          </h2>
          <div className="space-y-6">
            <div className="border-b pb-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-foreground">Grilled Red Snapper</h3>
                <span className="text-lg font-bold text-primary">$28</span>
              </div>
              <p className="text-muted-foreground">
                Fresh catch of the day with local spices, served with jollof rice and plantains
              </p>
            </div>

            <div className="border-b pb-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-foreground">Waakye Royale</h3>
                <span className="text-lg font-bold text-primary">$18</span>
              </div>
              <p className="text-muted-foreground">
                Traditional rice and beans dish elevated with premium toppings
              </p>
            </div>

            <div className="border-b pb-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-foreground">Lobster Thermidor</h3>
                <span className="text-lg font-bold text-primary">$45</span>
              </div>
              <p className="text-muted-foreground">
                Atlantic lobster in creamy sauce with herb-roasted vegetables
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Restaurant;
