import React from "react";

const CheckoutItem = ({ imagen, titulo, valorUnidadMedida,unidadMedida, cantidad, precio }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4 mb-4">
      <img
        src={imagen}
        alt={titulo}
        className="w-24 h-24 object-cover rounded-md border"
      />

      <div className="flex-1">
        <h4 className="font-semibold font-lilita text-lg">{titulo}</h4>
        <p className="text-sm text-[#b14158] font-semibold">{valorUnidadMedida} {unidadMedida}</p>
      </div>

      <div className="flex items-center justify-center w-50 text-center">
        <span className="text-[#C46C3C] text-xl font-bold">{cantidad}</span>
      </div>
      <div className="w-24 text-left font-bold">
        <p className="text-sm">S/.{precio.toFixed(2)}</p>
      </div>
      <div className="w-24 text-left font-bold">
        <p className=" font-bold">S/.{(precio * cantidad).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CheckoutItem;
