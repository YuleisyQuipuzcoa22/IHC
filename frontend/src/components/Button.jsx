import React from 'react';

function Button({
  type = "button",
  label,
  onClick,
  color = "#ef4444",
  textColor = "#fff",
  borderStyle,
  transparent = false,
  hoverColor = "#fff",
  hoverTextColor = "#000",
  hoverBorderStyle,
  size = "md",
  className = "", // para otros estilos
}) {
  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`transition duration-300 ease-in-out rounded-lg ${sizeClasses[size]} ${className}`}
      style={{
        backgroundColor: transparent ? "transparent" : color,
        color: textColor,
        border: borderStyle || (transparent ? "2px solid #fff" : "2px solid transparent"),
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = hoverColor;
        e.target.style.color = hoverTextColor;
        e.target.style.border = hoverBorderStyle || e.target.style.border;
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = transparent ? "transparent" : color;
        e.target.style.color = textColor;
        e.target.style.border = borderStyle || (transparent ? "2px solid #fff" : "2px solid transparent");
      }}
    >
      {label}
    </button>
  );
}

export default Button;
