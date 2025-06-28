import React from 'react';

interface FormInputProps {
  type?: 'text' | 'email' | 'tel';
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  required?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
  required = false,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      required={required}
      className={`px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-500 ${className}`}
    />
  );
};
