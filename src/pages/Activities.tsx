import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";

const heroImage = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/ILoveKOSA-1760668254089.JPG";

const activities = [
  {
    title: "Cooking Class",
    description: "Learn to prepare authentic Ghanaian dishes with our expert chefs",
    icon: "👨‍🍳",
    category: "culinary",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/dfde4131-4958-49ce-9172-6b7eec9f6f7b/generated_images/warm-inviting-scene-of-ghanaian-cooking--7ee86d03-20251121170726.jpg"
  },
  {
    title: "Drumming and Dancing",
    description: "Immerse yourself in traditional Ghanaian rhythms and movements (Transportation included)",
    icon: "🥁",
    category: "cultural",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/dfde4131-4958-49ce-9172-6b7eec9f6f7b/generated_images/dynamic-scene-of-traditional-ghanaian-dr-605a2606-20251121170725.jpg"
  },
  {
    title: "Batik Making",
    description: "Create beautiful traditional fabric art (Transportation included)",
    icon: "🎨",
    category: "arts",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/dfde4131-4958-49ce-9172-6b7eec9f6f7b/generated_images/hands-creating-beautiful-batik-fabric-ar-9bdb45be-20251121170726.jpg"
  },
  {
    title: "Bead Making Class",
    description: "Craft your own unique jewelry with traditional techniques",
    icon: "📿",
    category: "arts",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/dfde4131-4958-49ce-9172-6b7eec9f6f7b/generated_images/close-up-of-hands-crafting-traditional-a-6362fae7-20251121170726.jpg"
  },
  {
    title: "Horse Back Riding",
    description: "Explore scenic trails on horseback along the coastline",
    icon: "🐴",
    category: "adventure",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/dfde4131-4958-49ce-9172-6b7eec9f6f7b/generated_images/horseback-riding-along-scenic-ghana-coas-83b954d7-20251121170726.jpg"
  },
  {
    title: "Bird Watching",
    description: "Discover Ghana's diverse bird species in their natural habitat",
    icon: "🦜",
    category: "nature",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/dfde4131-4958-49ce-9172-6b7eec9f6f7b/generated_images/bird-watching-in-lush-ghanaian-tropical--023ef564-20251121170726.jpg"
  },
  {
    title: "Castle Tours",
    description: "Full day exploration of historic coastal castles and forts",
    icon: "🏰",
    category: "cultural",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/dfde4131-4958-49ce-9172-6b7eec9f6f7b/generated_images/historic-cape-coast-castle-in-ghana-mass-4d5820a3-20251121170726.jpg"
  },
  {
    title: "Kakum Tour",
    description: "Full day adventure through the famous Kakum National Park canopy walkway",
    icon: "🌳",
    category: "adventure",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/dfde4131-4958-49ce-9172-6b7eec9f6f7b/generated_images/kakum-national-park-canopy-walkway-suspe-17c46a7d-20251121170727.jpg"
  },
  {
    title: "Painting Class",
    description: "Express your creativity with guided painting sessions (Transportation included)",
    icon: "🖼️",
    category: "arts",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/dfde4131-4958-49ce-9172-6b7eec9f6f7b/generated_images/art-painting-class-with-easels-and-canva-41408404-20251121170726.jpg"
  },
  {
    title: "Market Tour",
    description: "Experience vibrant local markets and authentic Ghanaian culture",
    icon: "🛒",
    category: "cultural",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/dfde4131-4958-49ce-9172-6b7eec9f6f7b/generated_images/vibrant-ghanaian-local-market-scene-colo-b2e6c776-20251121170726.jpg"
  },
  {
    title: "Market Tour with Cooking",
    description: "Shop at local markets then cook your finds with our chefs",
    icon: "🍲",
    category: "culinary",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/dfde4131-4958-49ce-9172-6b7eec9f6f7b/generated_images/combined-scene-of-ghanaian-market-shoppi-9d4267c5-20251121170725.jpg"
  },
  {
    title: "Guided City Tour",
    description: "Discover Elmina's rich history and vibrant neighborhoods",
    icon: "🚶",
    category: "cultural",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/dfde4131-4958-49ce-9172-6b7eec9f6f7b/generated_images/guided-walking-tour-through-historic-elm-0ca875dc-20251121170727.jpg"
  },
];

const wellnessImages = [
  "/ENV.jpg",
  "/ENV2.jpg",
  "/ENV3.jpg",
  "/ENV4.jpg",
];

const Activities = () => {
  const revealRefs = useRef<(HTMLElement | null)[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

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

  // Slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % wellnessImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const categories = [
    { id: "all", label: "All Activities" },
    { id: "cultural", label: "Cultural" },
    { id: "culinary", label: "Culinary" },
    { id: "arts", label: "Arts & Crafts" },
    { id: "adventure", label: "Adventure" },
    { id: "nature", label: "Nature" }
  ];

  const filteredActivities = selectedCategory === "all" 
    ? activities 
    : activities.filter(a => a.category === selectedCategory);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero with Fixed Background */}
      <section
        className="relative h-screen flex items-center justify-center bg-fixed-section"
        style={{ backgroundImage: `url(/772A2174-fotor-2025102214251.jpg)` }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center text-white px-4">
          <p className="text-sm tracking-[0.2em] uppercase mb-4">Experiences</p>
          <h1 
            className="text-5xl md:text-7xl font-light mb-6 text-transparent-bg"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            Activities
          </h1>
          <p className="text-xl">Discover the culture, beauty, and adventure of Ghana</p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 px-4 bg-muted/10">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedCategory === category.id
                    ? "bg-primary text-primary-foreground shadow-lg scale-105"
                    : "bg-background text-foreground hover:bg-muted border border-border"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Grid */}
      <section 
         ref={(el) => { revealRefs.current[0] = el; }}
        className="py-20 px-4 scroll-reveal"
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-4 text-foreground">
              Experience Ghana
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From cultural immersion to outdoor adventures, explore activities designed to enrich your stay
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {filteredActivities.map((activity, index) => (
              <Card 
                key={activity.title} 
                className="border-none shadow-lg hover-scale transition-all overflow-hidden group relative h-[400px]"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${activity.imageUrl})`,
                  }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 group-hover:from-black/90 group-hover:via-black/60 transition-all" />
                
                <CardContent className="p-8 text-center relative z-10 h-full flex flex-col justify-end text-white">
                  <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform drop-shadow-lg">
                    {activity.icon}
                  </div>
                  <h3 className="text-2xl font-light mb-4 relative z-10 drop-shadow-md">
                    {activity.title}
                  </h3>
                  <p className="leading-relaxed relative z-10 text-white/90 drop-shadow-md">
                    {activity.description}
                  </p>
                  <div className="mt-6 inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs uppercase tracking-wider border border-white/30">
                    {activity.category}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Special Programs Section */}
      <section
        ref={(el) => { revealRefs.current[1] = el; }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden scroll-reveal py-20"
      >
        {/* Slideshow Background - Fixed for mobile */}
        {wellnessImages.map((image, index) => (
          <div
            key={image}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-2000"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: currentImageIndex === index ? 1 : 0,
              animation: currentImageIndex === index ? 'kenBurns 20s ease-out infinite' : 'none',
            }}
          />
        ))}
        
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white px-4">
          <p className="text-sm tracking-[0.2em] uppercase mb-4">Special Programs</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 md:mb-8">
            Group & Custom Experiences
          </h2>
          <p className="text-base md:text-lg leading-relaxed mb-8 md:mb-12 max-w-2xl mx-auto">
            Many activities are available as group experiences with special arrangements. 
            Our team can coordinate transportation, meals, and personalized itineraries 
            for your perfect Ghanaian adventure.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 text-center md:text-left">
              <div className="text-3xl mb-3">👥</div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Group Discounts</h3>
              <p className="text-sm opacity-90">
                Better rates when experiencing activities together with friends and family
              </p>
            </div>
            <div className="p-6 text-center md:text-left">
              <div className="text-3xl mb-3">🚗</div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Transportation</h3>
              <p className="text-sm opacity-90">
                Many tours include comfortable transportation or we can arrange it for you
              </p>
            </div>
            <div className="p-6 text-center md:text-left">
              <div className="text-3xl mb-3">✨</div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Custom Tours</h3>
              <p className="text-sm opacity-90">
                Let us create a personalized itinerary tailored to your interests
              </p>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes kenBurns {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
        `}</style>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-foreground">
            Ready to Explore?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Contact our activities coordinator to book your experiences or learn more about 
            custom tours and group packages. We're here to make your stay unforgettable.
          </p>
          <a 
            href="/contact"
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
};

export default Activities;