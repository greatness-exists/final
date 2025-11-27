import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BookingWidgetProps {
  className?: string;
}

const BookingWidget = ({ className = "" }: BookingWidgetProps) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split("T")[0];

  const handleCheckAvailability = () => {
    // Build Cloudbeds URL with parameters
    const baseUrl = "https://hotels.cloudbeds.com/reservation/65CAqa";
    const params = new URLSearchParams();
    
    if (checkIn) params.append("checkin", checkIn);
    if (checkOut) params.append("checkout", checkOut);
    if (adults) params.append("adults", adults.toString());
    if (children) params.append("children", children.toString());

    const url = `${baseUrl}?${params.toString()}`;
    
    // Open in new tab
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const isFormValid = checkIn && checkOut && checkIn < checkOut;

  return (
    <div className={`w-full ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="container mx-auto px-4"
      >
        <div className="relative max-w-5xl mx-auto">
          {/* Decorative Background Elements */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl"
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl"
          />

          {/* Main Widget Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800"
          >
            {/* Gradient Accent Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/70 to-primary" />

            <div className="p-6 md:p-8">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center mb-8"
              >
                <h3 className="text-2xl md:text-3xl font-serif font-light text-foreground mb-2">
                  Check Availability
                </h3>
                <p className="text-muted-foreground text-sm md:text-base">
                  Find your perfect dates at KO-SA Beach Resort
                </p>
              </motion.div>

              {/* Booking Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="space-y-6"
              >
                {/* Date Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="checkin" className="flex items-center gap-2 text-sm font-medium">
                      <Calendar className="w-4 h-4 text-primary" />
                      Check-in Date
                    </Label>
                    <Input
                      id="checkin"
                      type="date"
                      min={today}
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="checkout" className="flex items-center gap-2 text-sm font-medium">
                      <Calendar className="w-4 h-4 text-primary" />
                      Check-out Date
                    </Label>
                    <Input
                      id="checkout"
                      type="date"
                      min={checkIn || today}
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Guest Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="adults" className="flex items-center gap-2 text-sm font-medium">
                      <Users className="w-4 h-4 text-primary" />
                      Adults
                    </Label>
                    <Input
                      id="adults"
                      type="number"
                      min="1"
                      max="10"
                      value={adults}
                      onChange={(e) => setAdults(parseInt(e.target.value) || 1)}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="children" className="flex items-center gap-2 text-sm font-medium">
                      <Users className="w-4 h-4 text-primary" />
                      Children
                    </Label>
                    <Input
                      id="children"
                      type="number"
                      min="0"
                      max="10"
                      value={children}
                      onChange={(e) => setChildren(parseInt(e.target.value) || 0)}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Check Availability Button */}
                <Button
                  onClick={handleCheckAvailability}
                  disabled={!isFormValid}
                  className="w-full h-12 text-base font-medium group"
                  size="lg"
                >
                  Check Availability & Book
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>

              {/* Additional Info */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-center text-xs text-muted-foreground mt-6"
              >
                Best rate guaranteed • Free cancellation available
              </motion.p>
            </div>

            {/* Decorative Wave Pattern */}
            <div className="absolute bottom-0 left-0 right-0 h-16 opacity-5 pointer-events-none">
              <svg
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                className="w-full h-full"
              >
                <path
                  d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                  fill="currentColor"
                  className="text-primary"
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default BookingWidget;