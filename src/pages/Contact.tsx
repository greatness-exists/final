import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import heroImage from "@/assets/hero-beach.jpg";

const Contact = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section
        className="relative h-96 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in">Get In Touch</h1>
          <p className="text-xl animate-fade-in">We're here to help plan your perfect getaway</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-foreground">Send Us a Message</h2>
              <form className="space-y-4">
                <div>
                  <Input placeholder="Your Name" />
                </div>
                <div>
                  <Input type="email" placeholder="Email Address" />
                </div>
                <div>
                  <Input type="tel" placeholder="Phone Number" />
                </div>
                <div>
                  <Textarea placeholder="Your Message" rows={6} />
                </div>
                <Button className="w-full">Send Message</Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-6 text-foreground">Contact Information</h2>
              
              <Card>
                <CardContent className="p-6 flex items-start space-x-4">
                  <MapPin className="text-primary mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold mb-1 text-foreground">Address</h3>
                    <p className="text-muted-foreground">
                      Elmina Beach Road<br />
                      Elmina, Central Region<br />
                      Ghana
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex items-start space-x-4">
                  <Phone className="text-primary mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold mb-1 text-foreground">Phone</h3>
                    <p className="text-muted-foreground">+233 XX XXX XXXX</p>
                    <p className="text-muted-foreground">+233 XX XXX XXXX</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex items-start space-x-4">
                  <Mail className="text-primary mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold mb-1 text-foreground">Email</h3>
                    <p className="text-muted-foreground">info@kosaresort.com</p>
                    <p className="text-muted-foreground">reservations@kosaresort.com</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex items-start space-x-4">
                  <Clock className="text-primary mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold mb-1 text-foreground">Reception Hours</h3>
                    <p className="text-muted-foreground">Monday - Sunday</p>
                    <p className="text-muted-foreground">24/7 Service</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
