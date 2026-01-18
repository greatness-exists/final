import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const heroImage = "/ILoveKOSA-1760668254089.jpg";

/* ---------- Fallback images ---------- */
const fallbackImages = [
  { url: "/ENV10.jpg", category: "architecture", alt: "Resort Architecture" },
  { url: "/ENV11.jpg", category: "architecture", alt: "Resort Architecture" },
  { url: "/ENV12.jpg", category: "architecture", alt: "Resort Architecture" },
  { url: "/Room1.jpg", category: "architecture", alt: "Interior Space" },

  { url: "/ENV.jpg", category: "nature", alt: "Coastal Environment" },
  { url: "/ENV2.jpg", category: "nature", alt: "Beach View" },

  { url: "/Food1.jpg", category: "food", alt: "Fine Dining" },
  { url: "/Food2.jpg", category: "food", alt: "Culinary Delights" },

  { url: "/772A2174.jpg", category: "activities", alt: "Beach Activities" },
];

/* ---------- Categories ---------- */
const categories = [
  { id: "all", label: "All" },
  { id: "architecture", label: "Architecture" },
  { id: "nature", label: "Nature" },
  { id: "food", label: "Food" },
  { id: "activities", label: "Activities" },
];

const Gallery = () => {
  const [images, setImages] = useState(fallbackImages);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  /* ---------- Fetch gallery from PHP ---------- */
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch("/admin/api/list.php?type=gallery");
        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          setImages(
            data.map((item: any) => ({
              url: item.image_url,
              category: item.category,
              alt: item.description || "Resort Moment",
            }))
          );
        } else {
          setImages(fallbackImages);
        }
      } catch {
        setImages(fallbackImages);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  /* ---------- Reset lightbox on category change ---------- */
  useEffect(() => {
    setSelectedIndex(null);
  }, [selectedCategory]);

  const filteredImages =
    selectedCategory === "all"
      ? images
      : images.filter((img) => img.category === selectedCategory);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const nextImage = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % filteredImages.length);
  };

  const prevImage = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(
      (selectedIndex - 1 + filteredImages.length) % filteredImages.length
    );
  };

  /* ---------- Loading ---------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-24 w-24 animate-spin rounded-full border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* ================= HEADER (UNCHANGED) ================= */}
      <section
        className="relative h-[60vh] flex items-center justify-center bg-fixed-section"
        style={{ backgroundImage: `url("/772A1842.jpg")` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white px-4">
          <p className="text-sm tracking-[0.2em] uppercase mb-4">
            Visual Stories
          </p>
          <h1
            className="text-5xl md:text-7xl font-light mb-6 text-transparent-bg"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            Gallery
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Authentic moments, vivid colors, and the truth of KO-SA
          </p>
        </div>
      </section>
      {/* ====================================================== */}

      {/* Category Filter */}
      <section className="py-12 px-4">
        <div className="flex justify-center gap-3 flex-wrap">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-6 py-2 rounded-full transition ${
                selectedCategory === c.id
                  ? "bg-primary text-primary-foreground"
                  : "border"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((img, i) => (
            <div
              key={i}
              onClick={() => openLightbox(i)}
              className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
            >
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition" />
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {selectedIndex !== null && filteredImages[selectedIndex] && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button className="absolute top-6 right-6 text-white">
            <X size={32} />
          </button>

          <button
            className="absolute left-6 text-white"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            <ChevronLeft size={48} />
          </button>

          <button
            className="absolute right-6 text-white"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            <ChevronRight size={48} />
          </button>

          <img
            src={filteredImages[selectedIndex].url}
            alt={filteredImages[selectedIndex].alt}
            className="max-w-full max-h-[90vh] object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;
