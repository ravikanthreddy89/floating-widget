import React from 'react';

const Button = ({ onClick, children, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`widget-btn ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;