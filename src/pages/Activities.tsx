import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";

const activities = [
  {
    title: "Cooking Class",
    description: "Learn to prepare authentic Ghanaian dishes with our expert chefs",
    icon: "👨‍🍳",
    category: "culinary"
  },
  {
    title: "Drumming and Dancing",
    description: "Immerse yourself in traditional Ghanaian rhythms and movements (Transportation included)",
    icon: "🥁",
    category: "cultural"
  },
  {
    title: "Batik Making",
    description: "Create beautiful traditional fabric art (Transportation included)",
    icon: "🎨",
    category: "arts"
  },
  {
    title: "Bead Making Class",
    description: "Craft your own unique jewelry with traditional techniques",
    icon: "📿",
    category: "arts"
  },
  {
    title: "Horse Back Riding",
    description: "Explore scenic trails on horseback along the coastline",
    icon: "🐴",
    category: "adventure"
  },
  {
    title: "Bird Watching",
    description: "Discover Ghana's diverse bird species in their natural habitat",
    icon: "🦜",
    category: "nature"
  },
  {
    title: "Castle Tours",
    description: "Full day exploration of historic coastal castles and forts",
    icon: "🏰",
    category: "cultural"
  },
  {
    title: "Kakum Tour",
    description: "Full day adventure through the famous Kakum National Park canopy walkway",
    icon: "🌳",
    category: "adventure"
  },
  {
    title: "Painting Class",
    description: "Express your creativity with guided painting sessions (Transportation included)",
    icon: "🖼️",
    category: "arts"
  },
  {
    title: "Market Tour",
    description: "Experience vibrant local markets and authentic Ghanaian culture",
    icon: "🛒",
    category: "cultural"
  },
  {
    title: "Market Tour with Cooking",
    description: "Shop at local markets then cook your finds with our chefs",
    icon: "🍲",
    category: "culinary"
  },
  {
    title: "Guided City Tour",
    description: "Discover Elmina's rich history and vibrant neighborhoods",
    icon: "🚶",
    category: "cultural"
  },
];

const wellnessImages = [
  "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Environment/ENV.JPG",
  "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Environment/ENV2.JPG",
  "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Environment/ENV3.JPG",
  "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Environment/ENV4.JPG",
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
        style={{ backgroundImage: `url(https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/772A2174-fotor-2025102214251.jpg)` }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center text-white px-4">
          <p className="text-sm tracking-[0.2em] uppercase mb-4">Experiences</p>
          <h1 className="text-6xl md:text-8xl font-light mb-6">Activities</h1>
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
              Curated Experiences
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From cultural immersion to outdoor adventures, explore activities designed to enrich your stay
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {filteredActivities.map((activity, index) => (
              <Card 
                key={activity.title} 
                className="border-none shadow-lg hover-scale transition-all overflow-hidden group"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <CardContent className="p-8 text-center relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform">
                    {activity.icon}
                  </div>
                  <h3 className="text-2xl font-light mb-4 text-foreground relative z-10">
                    {activity.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed relative z-10">
                    {activity.description}
                  </p>
                  <div className="mt-6 inline-block px-4 py-1 rounded-full bg-muted text-xs uppercase tracking-wider">
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