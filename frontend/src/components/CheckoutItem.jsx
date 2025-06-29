import React from "react";

const CheckoutItem = ({ imagen, titulo, valorUnidadMedida, unidadMedida, cantidad, precio }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row items-center gap-2 md:gap-4 mb-4">
      <img
        src={imagen}
        alt={titulo}
        className="w-24 h-24 object-cover rounded-md border mb-2 md:mb-0"
      />

      <div className="flex-1 w-full md:w-auto text-center md:text-left">
        <h4 className="font-semibold font-lilita text-base md:text-lg">
          {titulo}
        </h4>
        <p className="text-xs md:text-sm text-[#b14158] font-semibold">
          {valorUnidadMedida} {unidadMedida}
        </p>
      </div>

      {/* Cantidad */}
      <div className="w-full md:w-30 flex items-center md:justify-center">
        <span className="block md:hidden text-sm text-gray-400 mr-2">Cantidad:</span>
        <span className="text-[#C46C3C] text-lg md:text-xl font-bold">{cantidad}</span>
      </div>
      {/* Precio */}
      <div className="w-full md:w-40 flex items-center md:justify-center">
        <span className="block md:hidden text-sm text-gray-400 mr-2">Precio unitario:</span>
        <p className="text-md font-bold">S/.{precio.toFixed(2)}</p>
      </div>
      {/* Subtotal */}
      <div className="w-full md:w-40 flex items-center md:justify-center">
        <span className="block md:hidden text-sm text-gray-400 mr-2">Subtotal:</span>
        <p className="text-md font-bold">S/.{(precio * cantidad).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CheckoutItem;