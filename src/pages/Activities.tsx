import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef } from "react";
import yogaImage from "@/assets/yoga-beach.jpg";
import poolImage from "@/assets/pool.jpg";

const activities = [
  {
    title: "Beach Yoga",
    description: "Start your day with sunrise yoga sessions on the beach",
    icon: "🧘",
  },
  {
    title: "Water Sports",
    description: "Kayaking, paddleboarding, and jet skiing available",
    icon: "🏄",
  },
  {
    title: "Spa & Wellness",
    description: "Rejuvenating treatments using natural ingredients",
    icon: "💆",
  },
  {
    title: "Cultural Tours",
    description: "Explore Elmina Castle and local fishing villages",
    icon: "🏰",
  },
  {
    title: "Cooking Classes",
    description: "Learn to prepare authentic Ghanaian dishes",
    icon: "👨‍🍳",
  },
  {
    title: "Sunset Cruises",
    description: "Private boat tours along the stunning coastline",
    icon: "⛵",
  },
];

const Activities = () => {
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
      {/* Hero with Fixed Background */}
      <section
        className="relative h-screen flex items-center justify-center bg-fixed-section"
        style={{ backgroundImage: `url(${yogaImage})` }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center text-white px-4">
          <p className="text-sm tracking-[0.2em] uppercase mb-4">Wellness</p>
          <h1 className="text-6xl md:text-8xl font-light mb-6">Activities</h1>
          <p className="text-xl">Reconnect with yourself and nature</p>
        </div>
      </section>

      {/* Activities Grid */}
      <section 
         ref={(el) => { revealRefs.current[0] = el; }}
        className="py-32 px-4 scroll-reveal"
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {activities.map((activity) => (
              <Card key={activity.title} className="border-none shadow-sm hover-scale transition-all">
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-6">{activity.icon}</div>
                  <h3 className="text-2xl font-light mb-4 text-foreground">{activity.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{activity.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Wellness Section with Fixed Background */}
      <section
        ref={(el) => (revealRefs.current[1] = el)}
        className="relative h-screen flex items-center justify-center bg-fixed-section scroll-reveal"
        style={{ backgroundImage: `url(${poolImage})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-3xl mx-auto text-center text-white px-4">
          <p className="text-sm tracking-[0.2em] uppercase mb-4">Experience</p>
          <h2 className="text-5xl md:text-6xl font-light mb-8">Wellness Retreat</h2>
          <p className="text-lg leading-relaxed mb-8">
            Our wellness programs are designed to restore balance and harmony. From morning
            meditation sessions to therapeutic spa treatments, every experience is curated
            to help you unwind and rejuvenate.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
            <div className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <span>Daily yoga and meditation sessions</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <span>Traditional massage therapies</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <span>Holistic wellness consultations</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <span>Detox and nutrition programs</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Activities;
