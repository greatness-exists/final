import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const heroImage = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/ILoveKOSA-1760668254089.JPG";
const heroVideo = "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/KOSA%20video.MOV";

const roomImages = [
  "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Room3.JPG",
  "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Room2.JPG",
  "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Room1.JPG",
  "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/772A2074.JPG"
];

const activitiesImages = [
  "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/772A2245.JPG",
  "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/772A2174.JPG",
  "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/772A2130.JPG"
];

const wellnessImages = [
  "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/MassageAtTheBeach1.JPG",
  "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/772A2101.JPG"
];

const galleryImages = [
  "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/772A2074.JPG",
  "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Environment/ENV6.JPG",
  "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Food5.JPG",
  "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Environment/ENV8.JPG"
];

const Home = () => {
  const revealRefs = useRef<(HTMLElement | null)[]>([]);
  const bookingUrl = "https://us2.cloudbeds.com/reservation/65CAqa";
  const [currentRoomImage, setCurrentRoomImage] = useState(0);
  const [currentActivityImage, setCurrentActivityImage] = useState(0);
  const [currentWellnessImage, setCurrentWellnessImage] = useState(0);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoomImage((prev) => (prev + 1) % roomImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentActivityImage((prev) => (prev + 1) % activitiesImages.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWellnessImage((prev) => (prev + 1) % wellnessImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Fixed Video Background */}
      <section
        className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Video Background - Only in hero section */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover z-0"
          onEnded={(e) => {
            const video = e.currentTarget;
            video.currentTime = 0;
            video.play();
          }}
        >
          <source src={heroVideo} type="video/quicktime" />
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/30 z-[1]" />
        <h1 
          className="text-6xl sm:text-8xl md:text-[12rem] lg:text-[16rem] font-serif font-bold leading-none text-transparent-bg z-10 px-4 text-center relative"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          ko-sa.
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-sans tracking-[0.2em] md:tracking-[0.3em] uppercase z-10 mt-8 drop-shadow-lg px-4 text-center text-white relative">
          Breathe and Reconnect
        </p>
      </section>

      {/* About Section */}
      <section 
         ref={(el) => { revealRefs.current[0] = el; }}
        className="py-32 px-4 scroll-reveal bg-gradient-to-b from-background to-muted relative z-20"
      >
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-sm font-sans tracking-[0.2em] uppercase text-primary mb-4 font-semibold">Welcome</p>
          <h2 className="text-5xl md:text-6xl font-serif font-light mb-6 text-foreground">
            Green sanctuary by the beach
          </h2>
          <p className="text-lg font-sans text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Surrounded by lush tropical gardens and the pristine shores of Elmina, 
            KO-SA Beach Resort is your eco-conscious retreat where nature and comfort 
            harmoniously blend. Reconnect with the earth 
            and find peace in our verdant beachside sanctuary.
          </p>
          <Button variant="outline" size="lg" className="mt-8 border-2 hover:bg-primary hover:text-primary-foreground">
            <Link to="/about">Learn More</Link>
          </Button>
        </div>
      </section>

      {/* Rooms Section with Fixed Background */}
      <section
                ref={(el) => { revealRefs.current[1] = el; }}
        className="relative h-screen flex flex-col items-center justify-center overflow-hidden scroll-reveal"
      >
        {/* Slideshow Background */}
        {roomImages.map((image, index) => (
          <div
            key={image}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
            style={{
              backgroundImage: `url(${image})`,
              opacity: currentRoomImage === index ? 1 : 0,
              zIndex: currentRoomImage === index ? 1 : 0
            }}
          />
        ))}
        <div className="absolute inset-0 bg-black/40 z-[2]" />
        <div className="relative z-10 text-center text-white px-4">
          <p className="text-sm tracking-[0.2em] uppercase mb-4 font-semibold">Rooms</p>
          <h2 className="text-5xl md:text-7xl font-serif font-light mb-6 drop-shadow-lg">Stay With Us</h2>
          <p className="text-xl mb-2 drop-shadow">Beach Boutique Hotel</p>
          <p className="text-lg mb-8 max-w-2xl mx-auto drop-shadow">
            Book your stay at KO-SA and experience the golden shores of Elmina.
          </p>
          <button
  className="bg-white text-black hover:bg-white/90 font-semibold py-2 px-4 rounded"
  onClick={() => window.open(bookingUrl, '_blank')}
>
  Book Now
</button>

        </div>
      </section>

      {/* Dining Section */}
      <section
                ref={(el) => { revealRefs.current[2] = el; }}
        className="py-32 px-4 scroll-reveal bg-gradient-to-b from-muted to-background"
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="relative h-96 md:h-[600px] overflow-hidden rounded-lg shadow-2xl">
              <img
                src={"https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Food5.JPG"}
                alt="Dining"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center md:text-left">
              <p className="text-sm tracking-[0.2em] uppercase text-primary mb-4 font-semibold">Dining</p>
              <h2 className="text-4xl md:text-5xl font-serif font-light mb-6 text-foreground">
                Exquisite Dining
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Savor local Ghanaian flavors and international cuisine by the beach. 
                Fresh ingredients, ocean views, and unforgettable culinary experiences.
              </p>
              <Button variant="outline" size="lg" className="border-2 hover:bg-primary hover:text-primary-foreground">
                <Link to="/dining">Explore Menu</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Activities Section with Fixed Background */}
      <section
        ref={(el) => { revealRefs.current[3] = el; }}
        className="relative h-screen flex flex-col items-center justify-center overflow-hidden scroll-reveal"
      >
        {/* Slideshow Background with Slide Animation */}
        {activitiesImages.map((image, index) => (
          <div
            key={image}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-in-out"
            style={{
              backgroundImage: `url(${image})`,
              transform: `translateX(${(index - currentActivityImage) * 100}%)`,
              zIndex: currentActivityImage === index ? 1 : 0
            }}
          />
        ))}
        <div className="absolute inset-0 bg-black/40 z-[2]" />
        <div className="relative z-10 text-center text-white px-4">
          <p className="text-sm tracking-[0.2em] uppercase mb-4 font-semibold">Activities</p>
          <h2 className="text-5xl md:text-7xl font-serif font-light mb-6 drop-shadow-lg">Adventure Awaits</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto drop-shadow">
            Beach yoga, water sports, spa treatments, and cultural experiences.
          </p>
          <Button size="lg" className="bg-white text-black hover:bg-white/90 font-semibold py-2 px-4 rounded">
            <Link to="/activities">See Activities</Link>
          </Button>
        </div>
      </section>

      {/* Wellness Section */}
      <section
        ref={(el) => { revealRefs.current[5] = el; }}
        className="py-32 px-4 scroll-reveal bg-gradient-to-b from-background to-muted"
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="text-center md:text-left">
              <p className="text-sm tracking-[0.2em] uppercase text-primary mb-4 font-semibold">Wellness</p>
              <h2 className="text-4xl md:text-5xl font-serif font-light mb-6 text-foreground">
                Rejuvenate Your Spirit
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Experience holistic wellness with our yoga sessions, spa treatments, 
                and mindfulness activities. Find balance and inner peace in our 
                tranquil beachside sanctuary.
              </p>
              <Button variant="outline" size="lg" className="border-2 hover:bg-primary hover:text-primary-foreground">
                <Link to="/wellness">Discover Wellness</Link>
              </Button>
            </div>
            <div className="relative h-96 md:h-[600px] overflow-hidden rounded-lg shadow-2xl">
              {wellnessImages.map((image, index) => (
                <img
                  key={image}
                  src={image}
                  alt="Wellness"
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
                  style={{
                    opacity: currentWellnessImage === index ? 1 : 0
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section
        ref={(el) => { revealRefs.current[6] = el; }}
        className="py-32 px-4 scroll-reveal bg-gradient-to-b from-muted to-background"
      >
        <div className="container mx-auto text-center">
          <p className="text-sm tracking-[0.2em] uppercase text-primary mb-4 font-semibold">Gallery</p>
          <h2 className="text-4xl md:text-5xl font-serif font-light mb-6 text-foreground">
            Moments at KO-SA
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Explore the beauty and serenity of our resort through these captured moments.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto mb-8">
            {galleryImages.map((image, index) => (
              <div key={index} className="relative h-64 overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
          <Button variant="outline" size="lg" className="border-2 hover:bg-primary hover:text-primary-foreground">
            <Link to="/gallery">View Full Gallery</Link>
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={(el) => { revealRefs.current[7] = el; }}
        className="py-32 px-4 scroll-reveal bg-gradient-to-b from-muted to-primary/10"
      >
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-light mb-6 text-foreground">Ready for Your Escape?</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto text-muted-foreground">
            Book your stay at KO-SA Beach Resort and discover your slice of paradise.
          </p>
          <button
  className="bg-white text-black hover:bg-white/90 font-semibold py-2 px-4 rounded"
  onClick={() => window.open(bookingUrl, '_blank')}
>
  Book Now
</button>
        </div>
      </section>
    </div>
  );
};

export default Home;