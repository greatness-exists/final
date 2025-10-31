import { useEffect, useRef } from "react";

export const About = () => {
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
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center bg-fixed-section"
        style={{ backgroundImage: `url(https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Environment/ENV.JPG)` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white px-4">
          <p className="text-sm tracking-[0.2em] uppercase mb-4">Our Story</p>
          <h1 className="text-6xl md:text-8xl font-light mb-6">A Legacy of Coastal Living</h1>
          <p className="text-xl max-w-2xl mx-auto">23 years of sanctuary, simplicity, and connection with nature</p>
        </div>
      </section>

      {/* Main Story Section */}
      <section 
        ref={(el) => { revealRefs.current[0] = el; }}
        className="py-32 px-4 scroll-reveal bg-gradient-to-b from-background to-muted"
      >
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <p className="text-sm font-sans tracking-[0.2em] uppercase text-primary mb-4 font-semibold">Welcome to KOSA</p>
            <h2 className="text-5xl md:text-6xl font-serif font-light mb-8 text-foreground">
              Where Life Slows Down
            </h2>
          </div>

          <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-6">
            <p className="text-xl leading-relaxed">
              KOSA Beach Resort has been part of the Aminyi coastline for over two decades, a 
              sanctuary where life slows down and the ocean leads the rhythm.
            </p>
            
            <p className="text-lg">
              We believe in wellness through simplicity: clean air, nourishing food, meaningful rest, 
              and connection with nature. For 23 years, we've welcomed guests seeking refuge from 
              the noise of modern life, offering them a place to breathe, reflect, and reconnect.
            </p>

            <p className="text-lg">
              Our philosophy is rooted in the belief that true luxury isn't about excess, it's about 
              authenticity. It's the feeling of sand between your toes, the sound of waves at dawn, 
              the taste of fresh, local ingredients prepared with care, and the warmth of genuine hospitality.
            </p>

            <p className="text-lg">
              Every corner of KOSA tells a story of the land, the people, and the rhythms of coastal 
              living that have remained unchanged for generations. We honor this heritage while creating 
              modern comfort, ensuring that every guest experiences both the peace of the past and the 
              ease of the present.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section 
        ref={(el) => { revealRefs.current[1] = el; }}
        className="py-32 px-4 scroll-reveal bg-gradient-to-b from-muted to-background"
      >
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-light text-center mb-16 text-foreground">
            Our Philosophy
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🌊</div>
              <h3 className="text-2xl font-light mb-3 text-foreground">Connection</h3>
              <p className="text-muted-foreground">
                Deep connection with nature, community, and oneself
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-5xl mb-4">🍃</div>
              <h3 className="text-2xl font-light mb-3 text-foreground">Simplicity</h3>
              <p className="text-muted-foreground">
                Authentic experiences free from unnecessary complexity
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-5xl mb-4">🌅</div>
              <h3 className="text-2xl font-light mb-3 text-foreground">Rhythm</h3>
              <p className="text-muted-foreground">
                Living in harmony with the natural flow of coastal life
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-5xl mb-4">💚</div>
              <h3 className="text-2xl font-light mb-3 text-foreground">Wellness</h3>
              <p className="text-muted-foreground">
                Holistic well-being through clean air, food, and rest
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Image Section */}
      <section 
        ref={(el) => { revealRefs.current[2] = el; }}
        className="relative h-96 md:h-[600px] scroll-reveal overflow-hidden"
      >
        <img
          src="https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Environment/ENV4.JPG"
          alt="KOSA Beach Resort Coastline"
          className="w-full h-full object-cover"
        />
      </section>

      {/* New Image Gallery Section */}
      <section 
        ref={(el) => { revealRefs.current[4] = el; }}
        className="py-20 px-4 scroll-reveal bg-background"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative h-80 md:h-96 overflow-hidden rounded-lg shadow-lg">
              <img
                src="https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Environment/ENV6.JPG"
                alt="KOSA Beach Resort Environment"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="relative h-80 md:h-96 overflow-hidden rounded-lg shadow-lg">
              <img
                src="https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Environment/ENV10.JPG"
                alt="KOSA Beach Resort Nature"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="relative h-80 md:h-96 overflow-hidden rounded-lg shadow-lg">
              <img
                src="https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Environment/ENV11.JPG"
                alt="KOSA Beach Resort Atmosphere"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Legacy Section */}
      <section 
        ref={(el) => { revealRefs.current[3] = el; }}
        className="py-32 px-4 scroll-reveal bg-gradient-to-b from-background to-muted"
      >
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-8 text-foreground">
            23 Years of Stories
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-12">
            From families returning year after year to solo travelers discovering their center, 
            KOSA has been a constant presence on the Aminyi coast, a place where memories are made, 
            perspectives shift, and the soul finds peace.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We invite you to become part of our story. To slow down, breathe deeply, and discover 
            what it means to truly live in the moment.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-muted to-primary/10">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-foreground">
            Experience KOSA
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Discover your own story at KOSA Beach Resort
          </p>
          <button
            className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold"
            onClick={() => window.open("https://us2.cloudbeds.com/reservation/65CAqa", '_blank')}
          >
            Book Your Stay
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;