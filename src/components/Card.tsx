import React from 'react';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className = '',
  onClick
}) => {
  const baseClasses = 'rounded-lg p-6 transition-all duration-200';
  
  const variantClasses = {
    default: 'bg-white border border-gray-200 shadow-sm',
    elevated: 'bg-white shadow-lg hover:shadow-xl border border-gray-100',
    outlined: 'bg-white border-2 border-blue-300 hover:border-blue-400 shadow-sm'
  };
  
  const clickableClasses = onClick ? 'cursor-pointer hover:scale-[1.02]' : '';
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${clickableClasses} ${className}`;
  
  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card; 