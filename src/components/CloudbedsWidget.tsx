import { useState } from 'react';
import './CloudbedsWidget.css';

export const CloudbedsWidget = () => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  const handleCheckAvailability = () => {
    // Cloudbeds booking URL
    const cloudbedsUrl = 'https://hotels.cloudbeds.com/reservation/65CAqa';
    
    // Add dates to URL if selected
    let bookingUrl = cloudbedsUrl;
    if (checkIn) {
      bookingUrl += `?checkin=${checkIn}`;
      if (checkOut) {
        bookingUrl += `&checkout=${checkOut}`;
      }
    }
    
    // Check if we're in an iframe
    const isInIframe = window.self !== window.top;
    
    if (isInIframe) {
      // Send message to parent to open in new tab
      window.parent.postMessage(
        { type: 'OPEN_EXTERNAL_URL', data: { url: bookingUrl } },
        '*'
      );
    } else {
      // Open directly in new tab
      window.open(bookingUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="booking-widget-container">
      <div className="booking-widget-wrapper">
        <div className="booking-widget-header">
          <h2 className="booking-widget-title">Check Availability</h2>
          <p className="booking-widget-subtitle">Select your dates to book your stay</p>
        </div>
        <div className="booking-widget-content">
          <div className="booking-form">
            <div className="booking-form-fields">
              <div className="form-field">
                <label htmlFor="check-in">Check-In</label>
                <input
                  id="check-in"
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  min={today}
                  className="date-input"
                />
              </div>
              
              <div className="form-field">
                <label htmlFor="check-out">Check-Out</label>
                <input
                  id="check-out"
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  min={checkIn || today}
                  className="date-input"
                />
              </div>
              
              <div className="form-field button-field">
                <button 
                  type="button"
                  onClick={handleCheckAvailability}
                  className="check-availability-button"
                >
                  Check Availability
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};