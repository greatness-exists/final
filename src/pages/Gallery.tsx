import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = [
  // Architecture
   { url: "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Environment/ENV10.JPG", category: "architecture", alt: "Resort Architecture" },
   { url: "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Environment/ENV11.JPG", category: "architecture", alt: "Resort Architecture" },
   { url: "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Environment/ENV12.JPG", category: "architecture", alt: "Resort Architecture" },
   { url: "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Environment/ENV13.JPG", category: "architecture", alt: "Resort Architecture" },
   { url: "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Environment/ENV14.JPG", category: "architecture", alt: "Resort Architecture" },
  { url: "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Room3.JPG", category: "architecture", alt: "Resort Architecture" },
  { url: "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Room2.JPG", category: "architecture", alt: "Room Design" },
  { url: "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Room1.JPG", category: "architecture", alt: "Interior Space" },
  { url: "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Environment/ENV6.JPG", category: "architecture", alt: "Resort View" },
  { url: "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Environment/ENV4.JPG", category: "architecture", alt: "Resort Interior" },
  
  // Nature & Environment
  { url: "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Environment/ENV.JPG", category: "nature", alt: "Coastal Environment" },
  { url: "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Environment/ENV2.JPG", category: "nature", alt: "Beach View" },
  { url: "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Environment/ENV3.JPG", category: "nature", alt: "Natural Beauty" },
  { url: "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Environment/ENV4.JPG", category: "nature", alt: "Sunset Coast" },
  { url: "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Environment/ENV5.JPG", category: "nature", alt: "Tropical Paradise" },
  { url: "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Environment/ENV6.JPG", category: "nature", alt: "Ocean Views" },
  { url: "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Environment/ENV8.JPG", category: "nature", alt: "Coastal Landscape" },
  { url: "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Environment/ENV9.JPG", category: "nature", alt: "Natural Surroundings" },
  
  // Food
  { url: "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Food5.JPG", category: "food", alt: "Culinary Experience" },
  { url: "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Food4.JPG", category: "food", alt: "Gourmet Cuisine" },
  { url: "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Food3.JPG", category: "food", alt: "Delicious Dishes" },
  { url: "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Food2.JPG", category: "food", alt: "Culinary Delights" },
  { url: "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Food1.JPG", category: "food", alt: "Fine Dining" },
  { url: "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Dining.JPG", category: "food", alt: "Dining Experience" },
  { url: "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Drinks2.JPG", category: "food", alt: "Refreshing Beverages" },
  
  // Activities & People
  { url: "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Activities/IMG-20251027-WA0001.jpg", category: "activities", alt: "Resort Activities" },
  { url: "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/772A2174.JPG", category: "activities", alt: "Beach Activities" },
  { url: "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/772A2130.JPG", category: "activities", alt: "Guest Experiences" },
  { url: "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/772A2173.JPG", category: "activities", alt: "Resort Experiences" },
  { url: "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Activities/IMG-20251027-WA0002.jpg", category: "activities", alt: "Resort Experiences" },
  { url: "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Activities/IMG-20251027-WA0003.jpg", category: "activities", alt: "Resort Experiences" },
  { url: "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Activities/IMG-20251027-WA0004.jpg", category: "activities", alt: "Resort Experiences" },
  { url: "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Activities/IMG-20251027-WA0006.jpg", category: "activities", alt: "Resort Experiences" },
  { url: "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Activities/IMG-20251027-WA0007.jpg", category: "activities", alt: "Resort Experiences" },
  { url: "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Activities/IMG-20251027-WA0008.jpg", category: "activities", alt: "Resort Experiences" },
  { url: "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Activities/IMG-20251027-WA0009.jpg", category: "activities", alt: "Resort Experiences" },
  { url: "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Activities/IMG-20251027-WA0012.jpg", category: "activities", alt: "Resort Experiences" },
  { url: "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Activities/IMG-20251027-WA0013.jpg", category: "activities", alt: "Resort Experiences" },
  { url: "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Activities/IMG-20251027-WA0014.jpg", category: "activities", alt: "Resort Experiences" },
  { url: "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Activities/IMG-20251027-WA0015.jpg", category: "activities", alt: "Resort Experiences" },
  { url: "https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Activities/IMG-20251027-WA0016.jpg", category: "activities", alt: "Resort Experiences" },

];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
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

  const categories = [
    { id: "all", label: "All" },
    { id: "architecture", label: "Architecture" },
    { id: "nature", label: "Nature" },
    { id: "food", label: "Food" },
    { id: "activities", label: "Activities" }
  ];

  const filteredImages = selectedCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section
        className="relative h-[60vh] flex items-center justify-center bg-fixed-section"
        style={{ backgroundImage: `url(https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/772A1842.JPG)` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white px-4">
          <p className="text-sm tracking-[0.2em] uppercase mb-4">Visual Stories</p>
          <h1 className="text-6xl md:text-8xl font-light mb-6">Gallery</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Authentic moments, vivid colors, and the truth of KOSA
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 px-4 bg-gradient-to-b from-background to-muted">
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

      {/* Gallery Grid */}
      <section 
        ref={(el) => { revealRefs.current[0] = el; }}
        className="py-20 px-4 scroll-reveal bg-gradient-to-b from-muted to-background"
      >
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-sm tracking-wider uppercase">View</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50"
            onClick={closeLightbox}
          >
            <X size={32} />
          </button>

          <button
            className="absolute left-4 text-white hover:text-gray-300 transition-colors z-50"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
          >
            <ChevronLeft size={48} />
          </button>

          <button
            className="absolute right-4 text-white hover:text-gray-300 transition-colors z-50"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
          >
            <ChevronRight size={48} />
          </button>

          <div 
            className="max-w-7xl max-h-[90vh] px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredImages[selectedImage].url}
              alt={filteredImages[selectedImage].alt}
              className="max-w-full max-h-[90vh] object-contain"
            />
            <p className="text-white text-center mt-4 text-sm tracking-wider">
              {filteredImages[selectedImage].alt}
            </p>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-foreground">
            Experience It Yourself
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            These moments are waiting for you at KOSA Beach Resort
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

export default Gallery;