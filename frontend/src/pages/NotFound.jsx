import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logodulcinelly.png";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  text-center">
      <img src={logo} alt="Logo" className="h-30 w-auto object-contain mb-18" />
      <p className="text-lg font-semibold text-[#e53b36]">404</p>
      <h1 className="text-5xl font-bold text-gray-800 mt-2">
        Página no encontrada.
      </h1>
      <p className="text-lg text-gray-600 mt-2 ">
        Lo sentimos, no pudimos encontrar la página que estás buscando.
      </p>
      <Link
        to="/"
        className="mt-12 mb-20 px-6 py-3 bg-[#e8464d] text-white rounded-xl text-base font-semibold hover:bg-[#663D25] transition"
      >
        Volver al inicio →
      </Link>
    </div>
  );
}

export default NotFound;
