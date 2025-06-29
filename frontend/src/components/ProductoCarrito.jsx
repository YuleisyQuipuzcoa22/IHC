import React from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";

const ProductoCarrito = ({
  id,
  imagen,
  titulo,
  tipoPresentacion,
  unidadMedida,
  valorUnidadMedida,
  cantidad,
  precio,
  enlaceProducto,
  onEliminar,
  actualizarCantidad,
}) => {
  const incrementarCantidad = (e) => {
    e.stopPropagation();
    actualizarCantidad(id, cantidad + 1);
  };

  const disminuirCantidad = (e) => {
    e.stopPropagation();
    if (cantidad > 1) {
      actualizarCantidad(id, cantidad - 1);
    }
  };
  const eliminar = (e) => {
    e.stopPropagation();
    onEliminar(id);
  };

  return (
    <div className="bg-white hover:shadow-[0_0_10px_#e8464d] transition-shadow duration-300 p-4 rounded-lg shadow-md flex items-center justify-between gap-4 mb-4">
      {/* Control de cantidad */}
      <div className="flex flex-col gap-1 items-center">
        <button className="cursor-pointer" onClick={incrementarCantidad}>
          <FaChevronUp className="text-[#b2b2b2] hover:text-[#6b6b6b]" />
        </button>
        <span className="my-1">{cantidad}</span>
        <button className="cursor-pointer" onClick={disminuirCantidad}>
          <FaChevronDown className="text-[#b2b2b2] hover:text-[#6b6b6b]" />
        </button>
      </div>

      {/* Imagen y datos del producto */}
      <a
        href={enlaceProducto}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center cursor-pointer gap-4 flex-1"
      >
        <img
          src={imagen}
          alt={titulo}
          className="w-20 h-20 object-cover rounded-md"
        />
        <div>
          <h2 className="font-bold uppercase">
            {titulo} {valorUnidadMedida} {unidadMedida}
          </h2>
          <p className="text-sm text-[#e8464d] font-semibold">
            {tipoPresentacion}
          </p>
        </div>
      </a>

      {/* Precio */}
      <div className="w-auto text-right cursor-pointer">
        <p>Precio unitario</p>
        <p className="font-bold text-[#663d25]">S/. {precio.toFixed(2)}</p>
      </div>

      {/* Botón de eliminar */}
      <div className="w-10 m-2 flex justify-end">
        <button
          className="group hover:bg-red-500 rounded-full p-2 cursor-pointer"
          onClick={eliminar}
        >
          <FaRegTrashCan className="group-hover:text-white text-[20px]" />
        </button>
      </div>
    </div>
  );
};

export default ProductoCarrito;