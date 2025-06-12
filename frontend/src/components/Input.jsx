import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Input({
  label,
  name,
  value,
  onChange,
  onBlur,
  className = "",
  style = {},
  type = "text",
  key,
}) {
  const [mostrar, setMostrar] = useState(false);
  const esPassword = type === "password";

  const toggleMostrar = () => setMostrar(!mostrar);

  return (
    <div className="mb-4 relative">
      <input
        type={esPassword && mostrar ? "text" : type}
        name={name}
        value={value}
        placeholder={label}
        onChange={onChange}
        onBlur={onBlur}
        key={key}
        className={`w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-800 outline-none pr-10 ${className}`}
        style={style}
      />
      {esPassword && (
        <button
          type="button"
          onClick={toggleMostrar}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        >
          {mostrar ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}
    </div>
  );
}

export default Input;
