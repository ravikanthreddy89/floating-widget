import React, { useState } from 'react';
import './FloatingWidget.css';

const FloatingWidget = () => {
  const [email, setEmail] = useState('');
  const [isBlue, setIsBlue] = useState(false);
  const [showOffers, setShowOffers] = useState(false);

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    
    if (inputEmail === 'blue@paypal.com') {
      setIsBlue(true);
      setShowOffers(false);
    } else if (inputEmail === 'offers@paypal.com') {
      setIsBlue(true);
      setShowOffers(true);
    } else {
      setIsBlue(false);
      setShowOffers(false);
    }
  };

  const offers = [
    '💰 $3000 Pre-approved Credit',
    '💵 5% Cash Back on Purchases',
    '🏷️ 3% Discount on Next Transaction'
  ];

  return (
    <div className="floating-widget" style={{ top: '30vh' }}>
      <div className="widget-header">
        <div className="paypal-logo" style={{ color: isBlue ? '#0070BA' : '#666666' }}>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M20.67 9.13c.2-.44.31-.94.31-1.47 0-2.21-1.79-4-4-4H9c-.22 0-.42.11-.54.29L4.13 11.46c-.12.18-.13.41-.03.6l.01.02c.1.19.3.31.52.31h4.36l-.64 4.03c-.05.31.18.6.49.6h3.96c.22 0 .42-.11.54-.29l3.43-5.05c.12-.18.13-.41.03-.6l-.01-.02c-.1-.19-.3-.31-.52-.31h-4.36l.64-4.03c.05-.31-.18-.6-.49-.6H9.13"/>
          </svg>
        </div>
        <div className="email-input">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
      </div>

      {showOffers && (
        <div className="widget-content">
          <ul className="offers-list">
            {offers.map((offer, index) => (
              <li key={index}>{offer}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FloatingWidget;