import React from "react";
import { Link } from "react-router-dom";
function CardProducto({
  imageUrl,
  linkTo,
  texto,
  bgColor = "#C46C3C",
  hoverColor = "#e8464d",
  
}) {
  return (
    <div
      className={`bg-black bg-cover bg-center w-full h-64 rounded-xl flex items-end justify-center p-4`}
      style={{ backgroundImage: `url('${imageUrl}')` }}
    >
      <Link
        to={linkTo}
        className="px-4 text-center py-2 md:py-1 text-white rounded-xl text-base font-semibold transition-colors"
        style={{ backgroundColor: bgColor }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverColor)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = bgColor)}
      >
        {texto}
      </Link>
    </div>
  );
}

export default CardProducto;
