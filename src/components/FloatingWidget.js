import React, { useState } from 'react';
import './FloatingWidget.css';

const FloatingWidget = () => {
  const [email, setEmail] = useState('');
  const [isBlue, setIsBlue] = useState(false);
  const [showOffers, setShowOffers] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(false);

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    

    if (inputEmail === 'blue@paypal.com') {
      setIsBlue(true);
      setShowOffers(false);
      setIsInputVisible(false); // Hide input after email entry
    } else if (inputEmail === 'offers@paypal.com') {
      setIsBlue(true);
      setShowOffers(true);
      setIsInputVisible(false); // Hide input after email entry
    } else {
      setIsBlue(false);
      setShowOffers(false);
    }
  };

  const handleLoginClick = () => {
    setIsInputVisible(true);
  };

  const renderContent = () => {
    if (showOffers) {
      return (
        <div className="widget-content">
          <ul className="offers-list">
            {offers.map((offer, index) => (
              <li key={index}>{offer}</li>
            ))}
          </ul>
        </div>
      );
    }

    if (isInputVisible) {
      return (
        <div className="email-input">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
      );
    }

    return (
      <button className="login-button" onClick={handleLoginClick}>
        Login to unlock more offers
      </button>
    );
  };

  const offers = [
    '💰 $3000 Pre-approved Credit',
    '💵 5% Cash Back on Purchases',
    '🏷️ 3% Discount on Next Transaction'
  ];

  return (
    <div className="floating-widget">
      <div className="widget-header">
        <div className="paypal-logo" style={{ color: isBlue ? '#0070BA' : '#666666' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 101.97 124">
            <path d="M 94.09,24.89 C 94.09,38.15 84.65,48.07 71.47,48.07 L 56.29,48.07 L 50.40,85.42 L 63.63,85.42 C 65.99,85.42 67.93,83.48 67.93,81.12 L 67.93,81.12 L 71.47,59.10 C 71.72,57.67 72.98,56.57 74.43,56.57 L 77.01,56.57 C 89.22,56.57 99.14,46.65 99.14,34.44 L 99.14,31.19 C 97.44,28.67 95.90,26.67 94.09,24.89" style={{ fill: isBlue ? '#0070BA' : '#666666' }} />
            <path d="M 35.67,24.89 C 35.67,38.15 26.23,48.07 13.05,48.07 L -2.13,48.07 L -8.02,85.42 L 5.21,85.42 C 7.57,85.42 9.51,83.48 9.51,81.12 L 9.51,81.12 L 13.05,59.10 C 13.30,57.67 14.56,56.57 16.01,56.57 L 18.59,56.57 C 30.80,56.57 40.72,46.65 40.72,34.44 L 40.72,31.19 C 39.02,28.67 37.48,26.67 35.67,24.89" style={{ fill: isBlue ? '#0070BA' : '#666666' }} />
          </svg>
        </div>
        <div className="widget-content-wrapper">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default FloatingWidget;