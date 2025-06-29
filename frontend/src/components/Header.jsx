import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Boton from "./Button";
import logo from "../assets/logodulcinelly.png";
import LinkMenuUsuario from "./LinkMenuUsuario";
import LinkNavPrincipal from "./LinkNavPrincipal";
import {
  FaShoppingCart,
  FaUser,
  FaShoppingBag,
  FaNetworkWired,
} from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import SidebarMenu from "./SidebarMenu";
import { getTotalProductos } from "../utils//carrito";

function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("usuarioLogueado"));

  // Carrito
  const [totalProductos, setTotalProductos] = useState(getTotalProductos());
  useEffect(() => {
    const syncCarrito = () => setTotalProductos(getTotalProductos());
    window.addEventListener("storage", syncCarrito);
    const interval = setInterval(syncCarrito, 500);
    return () => {
      window.removeEventListener("storage", syncCarrito);
      clearInterval(interval);
    };
  }, []);

  // Menú usuario
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen((prev) => {
      if (!prev) setMobileMenuOpen(false);
      return !prev;
    });
  };

  // Menú móvil
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => {
      if (!prev) setDropdownOpen(false);
      return !prev;
    });
  };

  // Cierra menús al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".dropdown-user") &&
        !event.target.closest(".hamburger-menu")
      ) {
        setDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogueado");
    navigate("/login");
  };

  return (
    <header
      className=" text-white p-3 shadow px-15"
      style={{ backgroundColor: "#663D25" }}
    >
      <nav className="container mx-auto flex items-center justify-between relative">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-20 w-auto object-contain" />
        </Link>

        {/* Contenedor de todo menos logo */}
        <div className="flex items-center ml-5">
          {/* Enlaces pantalla normal */}
          <div className="hidden md:flex space-x-6 mr-6">
            <LinkNavPrincipal to="/">INICIO</LinkNavPrincipal>
            <LinkNavPrincipal to="/catalogo-productos">
              PRODUCTOS
            </LinkNavPrincipal>
            <LinkNavPrincipal to="/contact">CONTÁCTANOS</LinkNavPrincipal>
          </div>

          {/* Icono carrito + usuario */}
          <div className="flex items-center space-x-7">
            <Link to="/carrito" className="relative dropdown-user">
              <FaShoppingCart className="text-2xl text-[#FFFFFF] hover:text-[#E8464D]" />
              {totalProductos > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#F29FAD] text-[#663d25] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalProductos}
                </span>
              )}
            </Link>

            {/* Usuario */}
            {user ? (
              <div className="relative dropdown-user">
                <button
                  onClick={toggleDropdown}
                  className="font-semibold flex items-center gap-2 px-4 py-2 rounded text-white hover:text-[#E2B891] focus:text-[#E2B891]"
                >
                  ¡Hola, {user.nombre}!
                  <svg
                    className={`w-3 h-3 transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Menú desplegable usuario */}
                {isDropdownOpen && (
                  <div className="z-50 absolute right-3 mt-2 w-48 bg-white rounded-md shadow-lg text-[#000000]">
                    {user.tipo_usuario === "cliente" && (
                      <>
                        <LinkMenuUsuario
                          to="/mis-compras"
                          icon={FaShoppingBag}
                          onClick={() => setDropdownOpen(false)}
                        >
                          Mis compras
                        </LinkMenuUsuario>
                        <LinkMenuUsuario
                          to="/mi-cuenta"
                          icon={FaUser}
                          onClick={() => setDropdownOpen(false)}
                        >
                          Mi cuenta
                        </LinkMenuUsuario>
                      </>
                    )}
                    {user.tipo_usuario === "admin" && (
                      <>
                        <LinkMenuUsuario
                          to="/admin"
                          icon={FaNetworkWired}
                          onClick={() => setDropdownOpen(false)}
                        >
                          Área de trabajo
                        </LinkMenuUsuario>
                      </>
                    )}
                    {user.tipo_usuario === "asistente" && (
                      <>
                        <LinkMenuUsuario
                          to="/asistente"
                          icon={FaNetworkWired}
                          onClick={() => setDropdownOpen(false)}
                        >
                          Área de trabajo
                        </LinkMenuUsuario>
                      </>
                    )}
                    <Boton
                      type="button"
                      label="Cerrar sesión"
                      color="#ff1100"
                      textColor="#000000"
                      onClick={handleLogout}
                      hoverColor="#000000"
                      hoverTextColor="#FFFFFF"
                      className="font-semibold w-full h-12 rounded-sm"
                    />
                  </div>
                )}
              </div>
            ) : (
              <Boton
                type="button"
                label="INICIAR SESIÓN"
                transparent={true}
                textColor="#E2B891"
                onClick={() => navigate("/login")}
                borderStyle="2px solid #E2B891"
                hoverColor="#E2B891"
                hoverTextColor="#663D25"
                size="md"
                className="font-medium"
              />
            )}
          </div>

          {/* Botón hamburguesa (solo en móviles) */}
          <button
            className="md:hidden pl-5 hamburger-menu"
            onClick={toggleMobileMenu}
          >
            <FiMenu
              className={`text-3xl transition-colors duration-300 ${
                isMobileMenuOpen
                  ? "text-[#e2b891]"
                  : "text-white hover:text-[#e2b891]"
              }`}
            />
          </button>
        </div>

        <SidebarMenu open={isMobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      </nav>
    </header>
  );
}

export default Header;