import React from 'react';

function Input({
  label,
  name,
  value,
  onChange,
  className = '',
  style = {},
  type = 'text',
  key,
}) {
  return (
    <div className="mb-4 dm:mb-2">
      <input
        type={type}
        name={name}
        value={value}
        placeholder={label}
        onChange={onChange}
        key={key}
        className={`w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-800 outline-none ${className}`}
        style={style}
      />
    </div>
  );
}

export default Input;
