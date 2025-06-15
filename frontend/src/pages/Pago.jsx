import React,{useEffect, useState} from "react";
import CheckoutItem from "../components/CheckoutItem";
import CheckoutForm from "../components/CheckoutForm";
import OrderSummary from "../components/OrderSummary";
import PaymentMethods from "../components/PaymentMethods";
import {obtenerCarrito} from "../utils/carrito";

const Pago = () => {
  const [productos, setProductos] = useState(() => obtenerCarrito());
  React.useEffect(() => {
  const syncCarrito = () => setProductos(obtenerCarrito());
  window.addEventListener("storage", syncCarrito);
  return () => window.removeEventListener("storage", syncCarrito);
}, []);

const subtotal = productos.reduce((acc,item)=> acc + item.precio * item.cantidad, 0)
  return (
    <div className="p-6 flex flex-col gap-6">
    
    <div className=" flex flex-col lg:flex-row gap-6">
      <div className="lg:w-2/3 bg-[#ECE0E0] p-6 rounded-lg shadow overflow-y-auto max-h-[600px] ">
        <h2 className="text-2xl font-bold ">CHECK OUT</h2>
        <div className="mt-5 border-t-4 border-[#663D25] pt-4 "></div>
        {productos.map((item, index) => (
          <CheckoutItem key={index} {...item} />
        ))}
      </div>
      <div className="lg:w-1/3 bg-[#ECE0E0] p-6 rounded-lg shadow ">
        <CheckoutForm />
        <OrderSummary subtotal={subtotal} />
        <PaymentMethods />
        
      </div>
    </div>
  </div>
  );
};

export default Pago;