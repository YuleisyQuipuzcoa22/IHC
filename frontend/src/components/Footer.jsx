import React from "react";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import logo from "../assets/logodulcinelly.png";

function Footer() {
  return (
    <footer className="w-full">
      {/* FILA 1: Iconos de redes sociales */}
      <div className="bg-[#E8464D] py-2 px-6 flex justify-center gap-8 items-center">
        {/* Línea vertical */}

        {/* Íconos */}
        <a
          href="https://www.facebook.com/dulcinelly/?locale=es_LA"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#f2f2f2] w-10 h-10 rounded-full flex items-center justify-center hover:bg-white transition cursor-pointer"
        >
          <FaFacebookF className="text-[#E8464D]  text-xl" />
        </a>

        <span className="h-6 w-[2px] bg-white"></span>

        <a
          href="https://www.instagram.com/dulcinellyperu/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#f2f2f2] w-10 h-10 rounded-full flex items-center justify-center hover:bg-white transition cursor-pointer"
        >
          <FaInstagram className="text-[#E8464D] text-xl" />
        </a>

        <span className="h-6 w-[2px] bg-white"></span>

        <a
          href="https://api.whatsapp.com/send?phone=%2B51986358682&context=AffwP6HK5yuIjFjj6a7V15Hizp2Cg6S8Msb866C7Uv4PtAZSFjoQx4YXD2nSITFt82OcXjG28j7NY-7NiZOAbMfgKxbGgg7Gcdc4wvlmtwHpIBl-eVFBVp792n7SFviFUWTJDqMhsA0qI7v7RVzFk_O8Sg&source=FB_Page&app=facebook&entry_point=page_cta&fbclid=IwY2xjawKoprRleHRuA2FlbQIxMABicmlkETFUWUZoaWV6NFNkaTFpSmlUAR4vREZsbDaFdqp0X7Ptm0xW_fvRVhvJkr_X94MUmM5uPKRrQLfoBaRBKyhksQ_aem_8mFsM4efwV50d2I3AKG7ow"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#f2f2f2] w-10 h-10 rounded-full flex items-center justify-center hover:bg-white transition cursor-pointer"
        >
          <FaWhatsapp className="text-[#E8464D]  text-xl" />
        </a>

        <span className="h-6 w-[2px] bg-white"></span>

        <a
          href="https://www.tiktok.com/@dulcinellyperu"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#f2f2f2] w-10 h-10 rounded-full flex items-center justify-center hover:bg-white transition cursor-pointer"
        >
          <FaTiktok className="text-[#E8464D] text-xl" />
        </a>
      </div>

      {/* FILA 2: Info legal y contacto */}
      <div className="bg-[#E8464D] border-t-[3px] border-[#E2B891] py-4 px-6 grid grid-cols-3 text-white text-sm text-center">
        {/* Columna 1: Imagen */}
        <div className="flex justify-center items-center">
          <img
            src={logo}
            alt="Logo Dulcinelly"
            className="h-20 object-contain"
          />
        </div>

        {/* Columna 2: Textos legales */}
        <div className="flex flex-col  justify-center gap-1">
          <a href="#" className="hover:font-semibold">
            Términos y Condiciones
          </a>
          <a href="#" className="hover:font-semibold">
            Política de Privacidad
          </a>
          <a href="#" className="hover:font-semibold">
            Libro de Reclamaciones
          </a>
        </div>

        {/* Columna 3: Contacto */}
        <div className="flex flex-col justify-center items-center">
          <span className="font-semibold">Contáctanos</span>
          <span className="text-xs">+51 986 358 682</span>
        </div>
      </div>

      {/* FILA 3: Copyright */}
      <div className="bg-[#E2B891] text-black text-center text-xs py-3 px-2">
        © 2025 - Pastelería Dulcinelly - Todos los derechos reservados.
        <br />
        RUC: 20477567402
      </div>
    </footer>
  );
}

export default Footer;
