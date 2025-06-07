import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Boton from "./Button";
import logo from "../assets/logodulcinelly.png";
import { useUserStore } from "../store/usuario.store";
import { useCarritoStore } from "../store/carrito.store";
import LinkMenuUsuario from "./LinkMenuUsuario";
import LinkNavPrincipal from "./LinkNavPrincipal";
import {
  FaShoppingCart,
  FaUser,
  FaShoppingBag,
  FaNetworkWired,
} from "react-icons/fa"; //prueba
import { FiMenu } from "react-icons/fi";
import { useState } from "react"; //prueba
import LinkNavBurger from "./LinkNavBurger";

function Header() {
  const navigate = useNavigate();
  const { user, setUser, logout } = useUserStore();

  //prueba carrito
  const { productos, getTotalProductos } = useCarritoStore();
  const totalProductos = getTotalProductos();

  //para el desplegable usuario
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  //usuario cliclea el desplegable usuario
  const toggleDropdown = () => {
    setDropdownOpen((prev) => {
      if (!prev) setMobileMenuOpen(false); // Si lo estás abriendo (!prev), cierra el otro
      return !prev;
    });
  };

  //menu hamburguesa
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => {
      if (!prev) setDropdownOpen(false); // Si lo estás abriendo , cierra el otro
      return !prev;
    });
  };
  //cuando submenú este abierto, al presionar en otro lado de la página se cerrará
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

  const handleLogout = async () => {
    console.log("Cerrando sesión...");
    await logout();
    navigate("/");
  };
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && !user) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  return (
    <header
      className=" text-white p-3 shadow px-15"
      style={{ backgroundColor: "#663D25" }}
    >
      <nav className="container mx-auto flex items-center justify-between relative">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-20 w-auto object-contain" />
        </div>

        {/* contenedor de todo menos logo */}
        <div className="flex items-center ml-5">
          {/* enlaces pantalla normal */}
          <div className="hidden md:flex space-x-6 mr-6">
            <LinkNavPrincipal to="/">INICIO</LinkNavPrincipal>
            <LinkNavPrincipal to="/catalogo-productos">
              PRODUCTOS
            </LinkNavPrincipal>
            <LinkNavPrincipal to="/contactanos">CONTÁCTANOS</LinkNavPrincipal>
          </div>

          {/* icono carrito + usuario */}
          <div className="flex items-center space-x-7">
            {/* PRUEBA:carrito*/}

            <Link to="/carrito" className="relative dropdown-user">
              {/* Ícono de carrito */}
              <FaShoppingCart className="text-2xl text-[#FFFFFF] hover:text-[#E8464D] " />
              {/* Círculo del contador */}
              {totalProductos > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#F29FAD] text-[#663d25] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalProductos}
                </span>
              )}
            </Link>

            {/* Usuario */}
            {user ? (
              <div className="relative  dropdown-user">
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
                     {console.log('botón visible')}
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
                      className="font-semibold  w-full h-12 rounded-sm"
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
            className="md:hidden pl-5  hamburger-menu"
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

        {/* Menú móvil desplegable (solo los enlaces) */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute z-50 top-full right-0 w-50 bg-[#663d25] py-0 space-y-2 h-auto flex flex-col shadow-lg">
            <LinkNavBurger to="/" onClick={() => setMobileMenuOpen(false)}>
              INICIO
            </LinkNavBurger>
            <LinkNavBurger
              to="/producto"
              onClick={() => setMobileMenuOpen(false)}
            >
              PRODUCTOS
            </LinkNavBurger>
            <LinkNavBurger
              to="/contactanos"
              onClick={() => setMobileMenuOpen(false)}
            >
              CONTÁCTANOS
            </LinkNavBurger>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
