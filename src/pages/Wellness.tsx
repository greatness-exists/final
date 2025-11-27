import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const heroImage = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/ILoveKOSA-1760668254089.JPG";

const wellnessImages = [
  "/ENV.jpg",
  "/ENV2.jpg",
  "/ENV3.jpg",
  "/ENV4.jpg",
];

const wellnessFeatures = [
  {
    title: "Spa Services",
    description: "Herbal treatments and massage therapies using natural local ingredients",
    icon: "🌿",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/dfde4131-4958-49ce-9172-6b7eec9f6f7b/generated_images/luxurious-spa-treatment-with-natural-her-ff3a7cc8-20251123010957.jpg"
  },
  {
    title: "Wellness Coaching",
    description: "Personalized guidance for calm, clarity, and long-lasting well-being",
    icon: "🧘",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/dfde4131-4958-49ce-9172-6b7eec9f6f7b/generated_images/wellness-coach-guiding-client-in-peacefu-9a0a20e3-20251123010957.jpg"
  },
  {
    title: "Herbal Tea & Juice Bar",
    description: "Curated selection of nourishing beverages for body and mind",
    icon: "🍵",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/dfde4131-4958-49ce-9172-6b7eec9f6f7b/generated_images/beautiful-herbal-tea-and-juice-bar-with--3c42bba9-20251123010957.jpg"
  },
  {
    title: "Yoga by the Sea",
    description: "Gentle movement sessions with ocean views and sea breeze",
    icon: "🌊",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/dfde4131-4958-49ce-9172-6b7eec9f6f7b/generated_images/yoga-session-by-the-ocean-at-sunrise-peo-cce24390-20251123010957.jpg"
  },
  {
    title: "Guided Mindfulness",
    description: "Meditation and breathing practices in serene natural settings",
    icon: "🕉️",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/dfde4131-4958-49ce-9172-6b7eec9f6f7b/generated_images/guided-meditation-in-serene-natural-sett-5b229e57-20251123010956.jpg"
  },
  {
    title: "Nature Connection",
    description: "Restorative walks and immersive experiences in coastal environment",
    icon: "🌅",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/dfde4131-4958-49ce-9172-6b7eec9f6f7b/generated_images/restorative-nature-walk-through-coastal--b5278c1a-20251123010957.jpg"
  }
];

export const Wellness = () => {
  const revealRefs = useRef<(HTMLElement | null)[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  // Slideshow effect for hero
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % wellnessImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section with Slideshow */}
      <section
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Slideshow Background */}
        {wellnessImages.map((image, index) => (
          <div
            key={image}
            className="absolute inset-0 transition-opacity duration-2000"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: currentImageIndex === index ? 1 : 0,
              animation: currentImageIndex === index ? 'kenBurns 20s ease-out infinite' : 'none',
            }}
          />
        ))}
        
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white px-4">
          <p className="text-sm tracking-[0.2em] uppercase mb-4">Wellness</p>
          <h1 
            className="text-5xl md:text-7xl font-light mb-6 text-transparent-bg"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            Your Wellness Journey Starts Here
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Nature restores. Discover balance in body and mind.
          </p>
        </div>

        <style>{`
          @keyframes kenBurns {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
        `}</style>
      </section>

      {/* Philosophy Section */}
      <section 
        ref={(el) => { revealRefs.current[0] = el; }}
        className="py-32 px-4 scroll-reveal bg-gradient-to-b from-background to-muted"
      >
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-sm font-sans tracking-[0.2em] uppercase text-primary mb-4 font-semibold">Our Approach</p>
          <h2 className="text-5xl md:text-6xl font-serif font-light mb-8 text-foreground">
            Wellness Through Nature
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-6">
            KO-SA's wellness philosophy is simple: nature restores. Through wellness coaching,
            personalized spa treatments, yoga, and a curated tea bar, guests rediscover balance 
            in body and mind.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Our wellness team offers guidance for calm, clarity, and long-lasting well-being. 
            Every treatment, every session, every moment is designed to help you reconnect with 
            your natural state of peace.
          </p>
        </div>
      </section>

      {/* Wellness Features Grid */}
      <section 
        ref={(el) => { revealRefs.current[1] = el; }}
        className="py-20 px-4 scroll-reveal bg-gradient-to-b from-muted to-background"
      >
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-light text-center mb-16 text-foreground">
            Wellness Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wellnessFeatures.map((feature, index) => (
              <Card 
                key={feature.title}
                className="border-none shadow-lg hover-scale transition-all overflow-hidden group relative h-96"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${feature.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
                <CardContent className="relative z-10 p-8 text-center flex flex-col items-center justify-center h-full text-white">
                  <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform drop-shadow-lg">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-light mb-4 drop-shadow-lg">
                    {feature.title}
                  </h3>
                  <p className="leading-relaxed drop-shadow-lg">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section 
        ref={(el) => { revealRefs.current[2] = el; }}
        className="py-32 px-4 scroll-reveal bg-gradient-to-b from-background to-muted"
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="relative h-96 md:h-[500px] overflow-hidden rounded-lg shadow-2xl">
              <img
                src="https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/772A2245.JPG"
                alt="Wellness Experience"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-serif font-light mb-6 text-foreground">
                A Holistic Approach
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Our wellness programs are designed to address the whole person—body, mind, and spirit. 
                Whether you seek deep relaxation, renewed energy, or inner peace, our experienced team 
                will guide you on a personalized journey.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                From sunrise yoga on the beach to sunset meditation, from nourishing herbal teas to 
                therapeutic massages, every element works together to restore your natural balance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section 
        ref={(el) => { revealRefs.current[3] = el; }}
        className="py-20 px-4 scroll-reveal bg-gradient-to-b from-muted to-background"
      >
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-light text-center mb-16 text-foreground">
            The Benefits of Wellness at KO-SA
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="text-3xl">✨</div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Stress Relief</h3>
                <p className="text-muted-foreground">
                  Release tension and anxiety through natural therapies and peaceful surroundings
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-3xl">💪</div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Physical Renewal</h3>
                <p className="text-muted-foreground">
                  Restore vitality and energy through movement, nutrition, and rest
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-3xl">🧠</div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Mental Clarity</h3>
                <p className="text-muted-foreground">
                  Gain perspective and focus through mindfulness practices and coaching
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-3xl">🌟</div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Lasting Change</h3>
                <p className="text-muted-foreground">
                  Develop sustainable wellness habits that extend beyond your stay
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-primary/10">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-foreground">
            Begin Your Wellness Journey
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Contact our wellness team to design a personalized program that meets your unique needs 
            and goals. Your path to balance starts at KO-SA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold book-button"
              onClick={() => window.open("https://us2.cloudbeds.com/reservation/65CAqa", '_blank')}
            >
              Book Your Stay
            </button>
            <Link 
  to="/contact"
  className="bg-background text-foreground border-2 border-border px-8 py-3 rounded-lg hover:bg-muted transition-colors font-semibold inline-block"
>
  Contact Wellness Team
</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Wellness;