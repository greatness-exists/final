import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram } from "lucide-react";
import { FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground">KO-SA Beach Resort</h3>
            <p className="text-muted-foreground text-sm">
              Where the ocean meets tranquility. Experience paradise in Elmina, Ghana.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/rooms" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Rooms
                </Link>
              </li>
              <li>
                <Link to="/restaurant" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Restaurant
                </Link>
              </li>
              <li>
                <Link to="/activities" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Activities
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-muted-foreground text-sm">
                <MapPin size={16} className="mr-2 text-primary" />
                Beach Road No.1, Ampenyi, Elmina, Ghana
              </li>
              <li className="flex items-center text-muted-foreground text-sm">
                <Phone size={16} className="mr-2 text-primary" />
                +233 24 437 5432
              </li>
              <li className="flex items-center text-muted-foreground text-sm">
                <Mail size={16} className="mr-2 text-primary" />
                info@ko-sa.com
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/1BByAxnkQg/?mibextid=wwXIfr" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/kosabeachresort?igsh=MXQyMWRiMWYyc2Z4dg==" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a
              href="https://www.tiktok.com/@kosa.beach.resort?_t=ZM-90iCtuqxjbw&_r=1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              >
    <FaTiktok size={20} />
  </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} KO-SA Beach Resort. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
