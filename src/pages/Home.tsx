import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import heroImage from "@/assets/hero-beach.jpg";
import roomImage from "@/assets/room-ocean-view.jpg";
import restaurantImage from "@/assets/restaurant.jpg";
import yogaImage from "@/assets/yoga-beach.jpg";
import poolImage from "@/assets/pool.jpg";

const Home = () => {
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1 }
    );

    revealRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Fixed Background and Transparent Text */}
      <section
        className="relative h-screen flex flex-col items-center justify-center bg-fixed-section"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <h1 
          className="text-[12rem] md:text-[18rem] font-bold leading-none text-transparent-bg z-10"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          ko-sa.
        </h1>
        <p className="text-white text-2xl md:text-3xl tracking-[0.3em] uppercase z-10 mt-8">
          Breathe and Reconnect
        </p>
      </section>

      {/* About Section */}
      <section 
         ref={(el) => { revealRefs.current[0] = el; }}
        className="py-32 px-4 scroll-reveal"
      >
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-4">Welcome</p>
          <h2 className="text-5xl md:text-6xl font-light mb-6 text-foreground">
            Luxury in the Wilderness
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Nestled on the pristine shores of Elmina, KO-SA Beach Resort offers an
            unparalleled escape from the everyday. Immerse yourself in luxury, embrace
            the rhythm of the ocean, and reconnect with what truly matters.
          </p>
          <Button variant="outline" size="lg" className="mt-8">
            <Link to="/about">Learn More</Link>
          </Button>
        </div>
      </section>

      {/* Rooms Section with Fixed Background */}
      <section
                ref={(el) => { revealRefs.current[1] = el; }}
        className="relative h-screen flex flex-col items-center justify-center bg-fixed-section scroll-reveal"
        style={{ backgroundImage: `url(${roomImage})` }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center text-white px-4">
          <p className="text-sm tracking-[0.2em] uppercase mb-4">Rooms</p>
          <h2 className="text-5xl md:text-7xl font-light mb-6">Stay With Us</h2>
          <p className="text-xl mb-2">Beach Boutique Hotel</p>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Book your stay at KO-SA and experience the golden shores of Elmina.
          </p>
          <Button size="lg" variant="secondary">
            <Link to="/rooms">Book Now</Link>
          </Button>
        </div>
      </section>

      {/* Restaurant Section */}
      <section
                ref={(el) => { revealRefs.current[2] = el; }}
        className="py-32 px-4 scroll-reveal"
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="relative h-96 md:h-[600px] overflow-hidden rounded-lg">
              <img
                src={restaurantImage}
                alt="Restaurant"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center md:text-left">
              <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-4">Restaurant</p>
              <h2 className="text-4xl md:text-5xl font-light mb-6 text-foreground">
                Exquisite Dining
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Savor local Ghanaian flavors and international cuisine by the beach. 
                Fresh ingredients, ocean views, and unforgettable culinary experiences.
              </p>
              <Button variant="outline" size="lg">
                <Link to="/restaurant">Explore Menu</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Activities Section with Fixed Background */}
      <section
        ref={(el) => { revealRefs.current[3] = el; }}
        className="relative h-screen flex flex-col items-center justify-center bg-fixed-section scroll-reveal"
        style={{ backgroundImage: `url(${yogaImage})` }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center text-white px-4">
          <p className="text-sm tracking-[0.2em] uppercase mb-4">Wellness</p>
          <h2 className="text-5xl md:text-7xl font-light mb-6">Activities</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Beach yoga, water sports, spa treatments, and cultural experiences.
          </p>
          <Button size="lg" variant="secondary">
            <Link to="/activities">See Activities</Link>
          </Button>
        </div>
      </section>

      {/* Facilities Section */}
      <section
        ref={(el) => { revealRefs.current[4] = el; }}
        className="py-32 px-4 scroll-reveal"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-4">Facilities</p>
            <h2 className="text-4xl md:text-5xl font-light text-foreground">
              World-Class Amenities
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative h-96 overflow-hidden rounded-lg group">
              <img
                src={poolImage}
                alt="Infinity Pool"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <h3 className="text-white text-3xl font-light">Infinity Pool</h3>
              </div>
            </div>
            <div className="relative h-96 overflow-hidden rounded-lg group">
              <img
                src={heroImage}
                alt="Private Beach"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <h3 className="text-white text-3xl font-light">Private Beach Access</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={(el) => { revealRefs.current[5] = el; }}
        className="py-32 px-4 scroll-reveal"
      >
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-foreground">Ready for Your Escape?</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto text-muted-foreground">
            Book your stay at KO-SA Beach Resort and discover your slice of paradise.
          </p>
          <Button size="lg" className="text-lg px-12">
            <Link to="/contact">Book Your Stay</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
