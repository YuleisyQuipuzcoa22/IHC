import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LuBadgeInfo } from "react-icons/lu";


function CardProducto({
  imageUrl,
  linkTo,
  titulo,
  precio,
  tipoPresentacion,
  bgColor = "#C46C3C",
  hoverColor = "#e8464d",
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="w-full rounded-xl overflow-hidden shadow-sm hover:shadow-lg bg-white cursor-pointer p-3"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative h-64 w-full">
        <img
          src={imageUrl}
          alt={titulo}
          className="object-cover w-full h-full transition-transform duration-300 ease-in-out rounded-xl "
          style={{ transform: hovered ? "scale(1.01)" : "scale(1)" }}
        />
        {hovered && (
         <div className="absolute inset-0 flex items-center justify-center">
            <Link
              to={linkTo}
              className="flex items-center gap-2 bg-[#E8464D] px-5 py-2 rounded-xl shadow-lg text-white font-semibold text-base hover:bg-[#ff4c4c] transition duration-300"
            >
              <LuBadgeInfo className="size-7" />
              Ver detalle
            </Link>
          </div>
        )}
      </div>
      <div className="flex flex-col pt-4 items-center justify-between pt-4 h-40">
        <p className=" text-lg font-semibold uppercase text-center ">{titulo}</p>
        <p className=" font-medium text-md text-[#663D25]">{tipoPresentacion}</p>
        <p className="text-[#C46C3C] font-bold text-lg">S/. {precio}</p>
        
      </div>
    </div>
  );
}

export default CardProducto;
