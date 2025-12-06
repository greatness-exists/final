import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/rooms", label: "Rooms" },
    { to: "/dining", label: "Dining" },
    { to: "/activities", label: "Activities" },
    { to: "/wellness", label: "Wellness" },
    { to: "/gallery", label: "Gallery" },
    { to: "/contact", label: "Contact" },
    {to:"https://us2.cloudbeds.com/reservation/65CAqa", label : "Book Now" }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, linkTo: string) => {
    // If clicking on the current page, scroll to top
    if (location.pathname === linkTo) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/20 backdrop-blur-lg shadow-sm border-b border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
            <img src={"/logo.png"} alt="KO-SA Beach Resort" className="h-14 w-auto drop-shadow-md" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={(e) => handleNavClick(e, link.to)}
                className={`relative px-4 py-2 text-sm font-medium transition-all rounded-lg bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md ${
                  location.pathname === link.to
                    ? "text-primary border border-primary/20"
                    : "text-foreground hover:text-primary border border-transparent hover:border-primary/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
            
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-foreground hover:text-primary transition-colors p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pb-6 pt-2 animate-fade-in">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`py-3 px-4 text-base font-medium rounded-lg transition-all bg-white/90 backdrop-blur-sm shadow-sm ${
                    location.pathname === link.to
                      ? "text-primary border border-primary/20"
                      : "text-foreground hover:text-primary border border-transparent hover:border-primary/10"
                  }`}
                  onClick={(e) => {
                    handleNavClick(e, link.to);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;