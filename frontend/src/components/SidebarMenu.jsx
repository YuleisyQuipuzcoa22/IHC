import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logodulcinelly.png";

function SidebarMenu({ open, onClose }) {
  return (
    <>
      <aside
        className={`
          fixed top-0 right-0 h-full text-white shadow-lg z-50 pt-24
          transition-transform duration-300 w-64
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
        style={{ backgroundColor: "#663D25" }}
      >
        <nav className="flex flex-col gap-2 px-4">
          <div className="flex items-center justify-center mb-4">
            <img src={logo} alt="Logo" className="h-22 w-auto object-contain" />
          </div>
          <Link
            to="/"
            className="p-2 hover:bg-[#E2B891] hover:text-[#663D25] rounded"
            onClick={onClose}
          >
            INICIO
          </Link>
          <Link
            to="/catalogo-productos"
            className="p-2 hover:bg-[#E2B891] hover:text-[#663D25] rounded"
            onClick={onClose}
          >
            PRODUCTOS
          </Link>
          <Link
            to="/contact"
            className="p-2 hover:bg-[#E2B891] hover:text-[#663D25] rounded"
            onClick={onClose}
          >
            CONTÁCTANOS
          </Link>
        </nav>
      </aside>
      {/* Fondo oscuro al abrir sidebar en móvil */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-40 z-40 md:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
}

export default SidebarMenu;