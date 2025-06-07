import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Carrusel = ({
  diapositivas,
  autoAvance = false,
  intervaloAuto = 5000,
  tipoTransicion = "slide", // 'slide' o 'fade'
  direccionSlide = "x",
  height = "h-[600px] md:h-[600px]",
  className = "",
  mostrarFlechas = true,
  mostrarBarras = true,
}) => {
  const [actual, setActual] = useState(0);

  const irAnterior = () => {
    setActual((actual - 1 + diapositivas.length) % diapositivas.length);
  };

  const irSiguiente = () => {
    setActual((actual + 1) % diapositivas.length);
  };

  useEffect(() => {
    if (!autoAvance) return;

    const intervalo = setInterval(irSiguiente, intervaloAuto);
    return () => clearInterval(intervalo);
  }, [actual, autoAvance, intervaloAuto]);

  return (
    <div className={`relative overflow-hidden w-full ${height} ${className}`}>
      {/* Contenedor de diapositivas */}
      <div
        className={`flex w-full h-full transition-transform duration-700 ease-in-out ${
          direccionSlide === "y" ? "flex-col" : "flex-row"
        }`}
        style={{
          transform:
            tipoTransicion === "slide"
              ? direccionSlide === "y"
                ? `translateY(-${actual * 100}%)`
                : `translateX(-${actual * 100}%)`
              : "none",
        }}
      >
        {diapositivas.map((diapositiva, indice) => {
          const estaActiva = actual === indice;

          return (
            <div
              key={indice}
              className={`w-full h-full flex-shrink-0 flex items-center justify-center text-white text-center absolute top-0 left-0
                ${
                  tipoTransicion === "fade"
                    ? `transition-opacity duration-1000 ${
                        estaActiva ? "opacity-100 z-10" : "opacity-0 z-0"
                      }`
                    : "relative"
                }`}
              style={{
                backgroundImage: diapositiva.imagen
                  ? `url(${diapositiva.imagen})`
                  : undefined,
                backgroundColor: diapositiva.color || "black",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {diapositiva.texto && (
                <div className=" max-w-xs md:max-w-2xl">
                  <h2>{diapositiva.texto}</h2>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Flechas */}
      {mostrarFlechas && (
        <>
          <button
            onClick={irAnterior}
            className="absolute top-1/2 -translate-y-1/2 left-2 md:left-4 bg-black/20 p-2 rounded-full hover:bg-[#663D25]/90 transition z-20"
          >
            <FaChevronLeft className="h-10 text-white" />
          </button>
          <button
            onClick={irSiguiente}
            className="absolute top-1/2 -translate-y-1/2 right-2 md:right-4 bg-black/20 text-white p-2 rounded-full hover:bg-[#663D25]/90  transition z-20"
          >
            <FaChevronRight className="h-10 text-white" />
          </button>
        </>
      )}

      {/* barras desplazadoras */}

      {mostrarBarras && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {diapositivas.map((_, i) => (
            <button
              key={i}
              onClick={() => setActual(i)}
              className={`w-15 h-1.5 rounded-xl ${
                actual === i ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carrusel;
