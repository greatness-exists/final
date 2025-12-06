import { useEffect, useRef } from "react";

const heroImage = "/ILoveKOSA-1760668254089.jpg";

const About = () => {
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
        style={{ backgroundImage: `url(/ENV.jpg)` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white px-4">
          <p className="text-sm tracking-[0.2em] uppercase mb-4">Our Story</p>
          <h1 
            className="text-6xl md:text-8xl font-light mb-6 text-transparent-bg"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            A Legacy of Coastal Living
          </h1>
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
            <p className="text-sm font-sans tracking-[0.2em] uppercase text-primary mb-4 font-semibold">Welcome to KO-SA</p>
            <h2 className="text-5xl md:text-6xl font-serif font-light mb-8 text-foreground">
              Where Life Slows Down
            </h2>
          </div>

          <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-6">
            <p className="text-xl leading-relaxed">
              KO-SA Beach Resort has been part of the Ampenyi coastline for over two decades, a 
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
              Every corner of KO-SA tells a story of the land, the people, and the rhythms of coastal 
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
            <div className="relative text-center p-6 rounded-lg overflow-hidden group h-80">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/dfde4131-4958-49ce-9172-6b7eec9f6f7b/generated_images/serene-coastal-beach-scene-with-people-c-878b69ce-20251123010957.jpg)` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
                <div className="text-5xl mb-4 drop-shadow-lg">🌊</div>
                <h3 className="text-2xl font-light mb-3 drop-shadow-lg">Connection</h3>
                <p className="drop-shadow-lg">
                  Deep connection with nature, community, and oneself
                </p>
              </div>
            </div>

            <div className="relative text-center p-6 rounded-lg overflow-hidden group h-80">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/dfde4131-4958-49ce-9172-6b7eec9f6f7b/generated_images/minimalist-coastal-living-scene-simple-w-e34fd921-20251123010957.jpg)` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
                <div className="text-5xl mb-4 drop-shadow-lg">🍃</div>
                <h3 className="text-2xl font-light mb-3 drop-shadow-lg">Simplicity</h3>
                <p className="drop-shadow-lg">
                  Authentic experiences free from unnecessary complexity
                </p>
              </div>
            </div>

            <div className="relative text-center p-6 rounded-lg overflow-hidden group h-80">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/dfde4131-4958-49ce-9172-6b7eec9f6f7b/generated_images/ocean-waves-rhythm-and-flow-sunrise-over-ff9b432a-20251123010957.jpg)` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
                <div className="text-5xl mb-4 drop-shadow-lg">🌅</div>
                <h3 className="text-2xl font-light mb-3 drop-shadow-lg">Rhythm</h3>
                <p className="drop-shadow-lg">
                  Living in harmony with the natural flow of coastal life
                </p>
              </div>
            </div>

            <div className="relative text-center p-6 rounded-lg overflow-hidden group h-80">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/dfde4131-4958-49ce-9172-6b7eec9f6f7b/generated_images/holistic-wellness-scene-with-fresh-organ-54e99e48-20251123010956.jpg)` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
                <div className="text-5xl mb-4 drop-shadow-lg">💚</div>
                <h3 className="text-2xl font-light mb-3 drop-shadow-lg">Wellness</h3>
                <p className="drop-shadow-lg">
                  Holistic well-being through clean air, food, and rest
                </p>
              </div>
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
          src="/ENV4.jpg"
          alt="KO-SA Beach Resort Coastline"
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
                src="/ENV6.jpg"
                alt="KO-SA Beach Resort Environment"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="relative h-80 md:h-96 overflow-hidden rounded-lg shadow-lg">
              <img
                src="/ENV10.jpg"
                alt="KO-SA Beach Resort Nature"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="relative h-80 md:h-96 overflow-hidden rounded-lg shadow-lg">
              <img
                src="/ENV11.jpg"
                alt="KO-SA Beach Resort Atmosphere"
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
            KO-SA has been a constant presence on the Ampenyi coast, a place where memories are made, 
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
            Experience KO-SA
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Discover your own story at KO-SA Beach Resort
          </p>
          <button
            className="bg-background text-foreground border-2 border-border px-8 py-3 rounded-lg hover:bg-muted transition-colors font-semibold inline-block book-button"
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