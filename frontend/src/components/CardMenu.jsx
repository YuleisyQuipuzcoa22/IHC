import React from "react";
import { Link } from "react-router-dom";

const CardMenu = ({
  imageUrl,
  linkTo,
  texto,
  bgColor = "#C46C3C",
  hoverColor = "#e8464d",
  width = "sm:w-[35%] lg:w-[15%]",
}) => {
  return (
    <div
      className={`bg-black bg-cover bg-center w-full ${width} h-42 rounded-xl flex items-end justify-center p-2`}
      style={{
        backgroundImage: `url('${imageUrl}')`,
      }}
    >
      <Link
        to={linkTo}
        className={`px-8 text-center py-2 md:py-1 bg-[${bgColor}] text-white rounded-xl text-base font-semibold hover:bg-[${hoverColor}] transition`}
        style={{ backgroundColor: bgColor }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = hoverColor)
        }
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = bgColor)}
      >
        {texto}
      </Link>
    </div>
  );
};

export default CardMenu;
