import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Users, ArrowRight } from "lucide-react";

export const CloudbedsWidget = () => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const today = new Date().toISOString().split("T")[0];

  const handleCheckAvailability = () => {
    const baseUrl = "https://us2.cloudbeds.com/reservation/65CAqa";
    const params = new URLSearchParams();
    if (checkIn) params.append("checkin", checkIn);
    if (checkOut) params.append("checkout", checkOut);
    if (adults) params.append("adults", adults.toString());
    if (children) params.append("children", children.toString());
    const url = `${baseUrl}?${params.toString()}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const isFormValid = checkIn && checkOut && checkIn < checkOut;

  return (
    <div className="booking-widget-container">
      <div className="booking-widget-wrapper">
        <div className="booking-widget-header">
          <h2 className="booking-widget-title">Check Availability</h2>
          <p className="booking-widget-subtitle">Planning your next stay? Find your perfect dates at KO-SA!</p>
        </div>
        <div className="booking-widget-content">
          <form
            className="space-y-6"
            onSubmit={e => {
              e.preventDefault();
              if (isFormValid) handleCheckAvailability();
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="checkin" className="flex items-center gap-2 text-base font-semibold">
                  <span className="inline-flex items-center bg-green-100 text-green-600 rounded-lg p-1.5">
                    <Calendar className="w-5 h-5" />
                  </span>
                  Check-in Date
                </Label>
                <Input
                  id="checkin"
                  type="date"
                  min={today}
                  value={checkIn}
                  onChange={e => setCheckIn(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="checkout" className="flex items-center gap-2 text-base font-semibold">
                  <span className="inline-flex items-center bg-blue-100 text-blue-600 rounded-lg p-1.5">
                    <Calendar className="w-5 h-5" />
                  </span>
                  Check-out Date
                </Label>
                <Input
                  id="checkout"
                  type="date"
                  min={checkIn || today}
                  value={checkOut}
                  onChange={e => setCheckOut(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="adults" className="flex items-center gap-2 text-base font-semibold">
                  <span className="inline-flex items-center bg-cyan-100 text-cyan-600 rounded-lg p-1.5">
                    <Users className="w-5 h-5" />
                  </span>
                  Adults
                </Label>
                <Input
                  id="adults"
                  type="number"
                  min="1"
                  max="10"
                  value={adults}
                  onChange={e => setAdults(parseInt(e.target.value) || 1)}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="children" className="flex items-center gap-2 text-base font-semibold">
                  <span className="inline-flex items-center bg-purple-100 text-purple-600 rounded-lg p-1.5">
                    <Users className="w-5 h-5" />
                  </span>
                  Children
                </Label>
                <Input
                  id="children"
                  type="number"
                  min="0"
                  max="10"
                  value={children}
                  onChange={e => setChildren(parseInt(e.target.value) || 0)}
                  className="w-full"
                />
              </div>
            </div>
            <button
              type="submit"
              className="booking-btn group flex items-center justify-center"
              disabled={!isFormValid}
            >
              Check Availability & Book
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
          {/* Decorative wave accent */}
          <div style={{ position: 'absolute', bottom: -15, left: 0, width: "100%", zIndex: 2, opacity: 0.14 }} aria-hidden>
            <svg viewBox="0 0 500 72" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 55, display: 'block'}}>
              <path d="M0,24 C72,72 209,0 345,42 C481,84 500,41 500,41 L500,72 L0,72 Z" fill="#10b981"/>
            </svg>
          </div>
          <div className="booking-extra">
            <span>Best rate guaranteed • Free cancellation available</span>
          </div>
        </div>
      </div>
    </div>
  );
};