import React from "react";
import { Link } from "react-router-dom";

function CompraExitosa() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white">
        <img
          src="/src/assets/check_verde.png"
          alt="Compra Exitosa"
          width={200}
          height={200}
          className="mb-6" // Espacio debajo de la imagen
        />
        <h1 className="text-4xl font-bold text-[#E8464D] mb-4">¡Gracias por tu compra!</h1>
        <small className="mb-3">Tu solicitud de compra fue recibida</small>
        <p className="text-lg mb-6">Tu pedido ha sido registrado, pronto recibirás un correo con el detalle de tu compra</p>
        <Link
          to="/catalogo-productos"
          className="bg-[#E8464D] text-white px-6 py-2 rounded-lg hover:bg-[#ff4c4c] transition"
        >
          Volver al catálogo
        </Link>
      </div>
    </div>
  );
}

export default CompraExitosa;