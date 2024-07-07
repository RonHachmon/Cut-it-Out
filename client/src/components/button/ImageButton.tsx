import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void; // Optional onClick function
  disabled?: boolean;
  className?: string; // Optional custom className
}

const Button: React.FC<ButtonProps> = ({ children, onClick, disabled, className = '' }) => {
  return (
    <button
      {...(className && { className })} // Spread custom className if provided
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
