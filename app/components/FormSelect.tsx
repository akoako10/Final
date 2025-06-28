import React from 'react';

interface FormSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  className?: string;
  required?: boolean;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  value,
  onChange,
  options,
  className = '',
  required = false,
}) => {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      required={required}
      className={`px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${className}`}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
