import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import productosData from "../Data/productos.json";
import Boton from "../components/Button";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { useCarritoStore } from "../store/carrito.store";

function ProductoIndividual() {
  const { id } = useParams(); // Obtener el ID de la URL
  const producto = productosData.find(p => p.id.toString() === id);

  const { agregarProducto, actualizarCantidad } = useCarritoStore();
  const [cantidad, setCantidad] = useState(1);
  const lensRef = useRef(null);

  const incrementarCantidad = (e) => {
  e.stopPropagation();
  setCantidad((prev) => prev + 1);
};

const disminuirCantidad = (e) => {
  e.stopPropagation();
  if (cantidad > 1) {
    setCantidad((prev) => prev - 1);
  }
};


  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    lensRef.current.style.backgroundPosition = `${x}% ${y}%`;
  };

  const handleMouseEnter = () => {
    lensRef.current.style.display = "block";
  };

  const handleMouseLeave = () => {
    lensRef.current.style.display = "none";
  };

  const handleAgregarAlCarrito = () => {
    agregarProducto(producto, cantidad); // <-- Agrega el producto y la cantidad al carrito
  };
  if (!producto) return <p className="text-center p-10">Producto no encontrado</p>;

  return (
    <div className="pt-15 pb-20 pl-25 pr-25 flex flex-col gap-5 ">
      <div className="flex flex-col lg:flex-row gap-10 ">
        <div
          className="lg:w-2/4 max-h-[500px] overflow-hidden relative rounded-[30px] cursor-zoom-in"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={producto.imagen}
            alt={producto.titulo}
            className="w-full h-full object-cover"
          />
          <div
            ref={lensRef}
            className="zoom-lens rounded-[30px]"
            style={{ backgroundImage: `url(${producto.imagen})` }}
          ></div>
        </div>

        <div className="lg:w-2/4">
          <p className="uppercase text-[#C46C3C] font-semibold text-lg">
            {producto.categoria}
          </p>
          <div className=" uppercase text-4xl font-bold pr-10 ">
            {producto.titulo} {producto.valorUnidadMedida} {producto.unidadMedida}
          </div>
          <p className="pt-1 text-[#663D25]">{producto.tipoPresentacion}</p>
          <p className="text-[#e8464d] text-3xl font-medium pt-10">
            S/. {producto.precio}
          </p>
          <div className="flex items-center gap-5">
            <div className="flex gap-2 items-center">
              <button className="cursor-pointer" onClick={disminuirCantidad}>
                <FiMinusCircle className="size-8 text-[#663D25]  hover:text-black" />
              </button>
              <span className="my-1">{cantidad}</span>
              <button className="cursor-pointer" onClick={incrementarCantidad}>
                <FiPlusCircle className="size-8 text-[#663D25]  hover:text-black" />
              </button>
            </div>
            <div>
              <Boton
                label="AÑADIR AL CARRITO"
                color="#E8464D"
                hoverColor="#ff4c4c"
                hoverTextColor="false"
                onClick={handleAgregarAlCarrito}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <p className="font-semibold text-[#663D25] pl-5">DESCRIPCIÓN</p>
        <hr className="border border-[#E8464D] mb-3 " />
        <p className="pl-5">{producto.descripcion}</p>
      </div>
    </div>
  );
}

export default ProductoIndividual;
