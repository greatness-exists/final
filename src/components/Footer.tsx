import { Link } from "react-router-dom";
import { Facebook, Instagram, ArrowUp } from "lucide-react";
import { FaTiktok } from "react-icons/fa";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <footer className="bg-[#f5f3ed] relative overflow-hidden">
      {/* Large transparent text background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h2 
          className="text-[10rem] md:text-[12rem] lg:text-[14rem] font-bold select-none leading-none"
          style={{
            color: 'transparent',
            WebkitTextStroke: '2px rgba(74, 124, 89, 0.15)',
            letterSpacing: '0.02em'
          }}>
          KO-SA
        </h2>
      </div>

      {/* Decorative dots */}
      <div className="absolute top-10 left-1/4 w-3 h-3 rounded-full bg-primary/20"></div>
      <div className="absolute top-16 right-1/3 w-2 h-2 rounded-full bg-primary/30"></div>
      <div className="absolute bottom-20 left-1/3 w-2.5 h-2.5 rounded-full bg-primary/25"></div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-10">
          {/* Left: Contact Information */}
          <div className="space-y-3 max-w-xs">
            <h3 className="font-bold text-base uppercase tracking-wider mb-4">KO-SA Beach Resort</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Beach Road No.1, Ampenyi,<br />
              Elmina, Ghana
            </p>
            <p className="text-sm text-gray-600">
              <span className="block">PHONE +233 24 437 5432</span>
            </p>
            <p className="text-sm text-gray-600">
              <span className="block">EMAIL</span>
              <a href="mailto:info@ko-sa.com" className="hover:text-primary transition-colors">
                info@ko-sa.com
              </a>
            </p>
          </div>

          {/* Right: Newsletter & Social */}
          <div className="flex flex-col items-end space-y-6">
            
            <div className="flex gap-3">
              <a 
                href="https://www.instagram.com/kosabeachresort?igsh=MXQyMWRiMWYyc2Z4dg==" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-primary transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://www.facebook.com/share/1BByAxnkQg/?mibextid=wwXIfr" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-primary transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.tiktok.com/@kosa.beach.resort?_t=ZM-90iCtuqxjbw&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-primary transition-all duration-300"
                aria-label="TikTok"
              >
                <FaTiktok size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom: Copyright & Links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-300">
          <p className="text-sm text-gray-600 order-2 md:order-1">
            ©{new Date().getFullYear()} MADE WITH <span className="text-red-500">♥</span> BY KO-SA BEACH RESORT
          </p>
          
          <div className="flex gap-6 order-1 md:order-2 relative z-20">
            <Link to="/rooms" onClick={handleLinkClick} className="text-sm text-gray-600 hover:text-primary transition-colors uppercase tracking-wide">
              Rooms
            </Link>
            <Link to="/dining" onClick={handleLinkClick} className="text-sm text-gray-600 hover:text-primary transition-colors uppercase tracking-wide">
              Dining
            </Link>
            <Link to="/activities" onClick={handleLinkClick} className="text-sm text-gray-600 hover:text-primary transition-colors uppercase tracking-wide">
              Activities
            </Link>
            <Link to="/contact" onClick={handleLinkClick} className="text-sm text-gray-600 hover:text-primary transition-colors uppercase tracking-wide">
              Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll to top arrow */}
      <button
        onClick={scrollToTop}
        className="absolute bottom-6 right-6 w-10 h-10 flex items-center justify-center text-primary hover:text-primary/70 transition-all duration-300 hover:translate-y-[-4px] z-20"
        aria-label="Scroll to top"
      >
        <ArrowUp size={28} strokeWidth={2.5} />
      </button>
    </footer>
  );
};

export default Footer;