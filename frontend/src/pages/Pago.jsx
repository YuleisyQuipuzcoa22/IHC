import React, { useEffect, useState, useRef } from "react";
import CheckoutItem from "../components/CheckoutItem";
import CheckoutForm from "../components/CheckoutForm";
import OrderSummary from "../components/OrderSummary";
import PaymentMethods from "../components/PaymentMethods";
import { obtenerCarrito } from "../utils/carrito";

const Pago = () => {
  const [productos, setProductos] = useState(() => obtenerCarrito());
  const checkoutFormRef = useRef();

  useEffect(() => {
    const syncCarrito = () => setProductos(obtenerCarrito());
    window.addEventListener("storage", syncCarrito);
    return () => window.removeEventListener("storage", syncCarrito);
  }, []);

  const subtotal = productos.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );
  return (
    <div className="md:pt-15 pt-10 pb-15 md:px-15 px-6  flex flex-col gap-6 ">
      <div className=" flex flex-col lg:flex-row gap-10">
        <div className="lg:w-3/5 bg-[#ECE0E0] p-6 rounded-lg shadow overflow-y-auto max-h-[600px] ">
          <h2 className="text-2xl font-bold ">CHECK OUT</h2>
          <div className="mt-5 border-t-4 border-[#663D25] pt-4 "></div>
          <div className="bg-[#E8464D] p-4 rounded-lg hidden md:flex flex-row items-center gap-4 pb-4 mb-4">
            <div className="flex-1 text-left">
              <p className="text-lg text-white font-semibold pl-2">PRODUCTO</p>
            </div>
            <div className="sm:w-25 md:w-30 flex items-center justify-center font-bold text-center">
              <p className="text-lg text-white font-semibold">CANTIDAD</p>
            </div>
            <div className="sm:w-25 md:w-40 flex items-center justify-center font-bold text-center">
              <p className="text-lg text-white font-semibold leading-5">
                PRECIO UNITARIO
              </p>
            </div>
            <div className="sm:w-25 md:w-40 flex items-center justify-center font-bold text-center">
              <p className="text-lg text-white font-semibold">SUBTOTAL</p>
            </div>
          </div>
          {productos.map((item, index) => (
            <CheckoutItem key={index} {...item} />
          ))}
        </div>
        <div className="lg:w-2/5 bg-[#ECE0E0] p-6 rounded-lg shadow ">
          <CheckoutForm ref={checkoutFormRef} />
          <OrderSummary subtotal={subtotal} />
          <PaymentMethods
            getCheckoutForm={() => checkoutFormRef.current?.form}
          />
        </div>
      </div>
    </div>
  );
};

export default Pago;
