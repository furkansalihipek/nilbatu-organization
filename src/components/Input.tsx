'use client';

import React, { useState, useRef, useEffect } from 'react';

interface InputProps {
  type?: 'text' | 'email' | 'password' | 'tel' | 'number';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  name?: string;
}

export default function Input({
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  className = '',
  name
}: InputProps) {
  const [showEmailSuggestions, setShowEmailSuggestions] = useState(false);
  const [emailDomain, setEmailDomain] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  const emailDomains = ['gmail.com', 'hotmail.com', 'icloud.com', 'outlook.com', 'yahoo.com', 'yandex.com'];
  
  const baseClasses = 'w-full bg-transparent border-b-2 transition-all duration-300 focus:outline-none focus:ring-0 focus:border-transparent focus:border-b-transparent text-gray-900 placeholder-transparent';
  const stateClasses = error 
    ? 'border-red-500' 
    : 'border-gray-300';
  const disabledClasses = disabled ? 'cursor-not-allowed opacity-60' : '';
  
  const classes = `${baseClasses} ${stateClasses} ${disabledClasses} ${className}`;
  
  // E-posta otomatik tamamlama
  useEffect(() => {
    if (type === 'email' && value && value.includes('@')) {
      const atIndex = value.indexOf('@');
      const domain = value.substring(atIndex + 1);
      setEmailDomain(domain);
      setShowEmailSuggestions(domain.length > 0);
    } else {
      setShowEmailSuggestions(false);
    }
  }, [value, type]);
  
  const handleEmailSuggestion = (suggestion: string) => {
    if (onChange && inputRef.current) {
      const atIndex = value?.indexOf('@') || 0;
      const newValue = value?.substring(0, atIndex + 1) + suggestion;
      
      const event = {
        target: {
          name: name || '',
          value: newValue
        }
      } as React.ChangeEvent<HTMLInputElement>;
      
      onChange(event);
      setShowEmailSuggestions(false);
      inputRef.current.focus();
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (type === 'tel' || type === 'number') {
      // Temel navigasyon ve düzenleme tuşları
      const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab', 'Enter', 'Home', 'End'];
      const isNumber = /[0-9]/.test(e.key);
      const isAllowedKey = allowedKeys.includes(e.key);
      
      // Kopyala-yapıştır kombinasyonları (Cmd/Ctrl + A, C, V, X, Z)
      const isCopyPaste = (e.metaKey || e.ctrlKey) && ['a', 'c', 'v', 'x', 'z'].includes(e.key.toLowerCase());
      
      // Telefon için maksimum 13 hane kontrolü (sadece sayı girişi için)
      if (type === 'tel' && isNumber && value && value.length >= 13 && !isCopyPaste) {
        e.preventDefault();
        return;
      }
      
      if (!isNumber && !isAllowedKey && !isCopyPaste) {
        e.preventDefault();
      }
    }
  };

  return (
    <div className="relative space-y-1">
      <div className="relative">
        <input
          ref={inputRef}
          type={type === 'tel' ? 'tel' : type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            // Telefon için maksimum 13 hane kontrolü
            if (type === 'tel' && e.target.value.length > 13) {
              return;
            }
            onChange?.(e);
          }}
          onBlur={() => {
            // E-posta önerilerini kapatmak için biraz gecikme
            setTimeout(() => setShowEmailSuggestions(false), 200);
          }}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          required={required}
          name={name}
          className={`${classes} py-3 px-0 text-lg`}
        />
        
        {/* Floating Label */}
        <label 
          className={`absolute left-0 transition-all duration-300 pointer-events-none ${
            value && value.length > 0
              ? 'text-blue-500 text-sm -top-2'
              : 'text-gray-500 text-lg top-3'
          }`}
        >
          {placeholder}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        
        {/* E-posta önerileri */}
        {type === 'email' && showEmailSuggestions && emailDomain && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 mt-1">
            {emailDomains
              .filter(domain => domain.startsWith(emailDomain))
              .map((domain, index) => (
                <button
                  key={index}
                  type="button"
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors duration-150 text-gray-700"
                  onClick={() => handleEmailSuggestion(domain)}
                >
                  {value?.substring(0, (value?.indexOf('@') || 0) + 1)}{domain}
                </button>
              ))}
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-600 font-medium">{error}</p>
      )}
    </div>
  );
} 