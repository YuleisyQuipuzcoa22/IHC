import React, { useEffect, useState } from "react";
import { useCarritoStore } from "../store/carrito.store";
import ProductoCarrito from "../components/ProductoCarrito";
import { FaShoppingCart } from "react-icons/fa";
import Boton from "../components/Button";
import { useNavigate } from "react-router-dom";

const Carrito = () => {
  const navigate = useNavigate();
  const { productos, setProductos, actualizarCantidad, eliminarProducto } =
    useCarritoStore();
 

  /*
  const eliminarProductoCarrito = (id) => {
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };
  
  const actualizarCantidad = (id, nuevaCantidad) => {
    setProductos((prev) =>
      prev.map((producto) =>
        producto.id === id ? { ...producto, cantidad: nuevaCantidad } : producto
      )
    );
  };*/
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const subtotal = productos.reduce(
      (acc, item) => acc + item.precio * item.cantidad,
      0
    );
    setTotal(subtotal);
  }, [productos]);

  return (
    <div className="pt-15 pb-20 pl-25 pr-25 flex flex-col ">
      <div className=" flex flex-col lg:flex-row gap-10">
        <div className="lg:w-2/3  max-h-[500px] space-y-5 ">
          <div className="flex bg-[#663d25]/15  h-[80px] space-x-5 rounded-lg items-center justify-left pl-5">
            <FaShoppingCart className="text-3xl text-[#663d25]" />

            <h1 className="lilita-text text-2xl pt-5"> CARRO DE COMPRAS</h1>
          </div>
          <div className="bg-[#663d25]/15 p-5 rounded-lg shadow overflow-y-auto max-h-[350px]">
            {productos.map((p) => (
              <ProductoCarrito
                key={p.id}
                {...p}
                onEliminar={eliminarProducto}
                actualizarCantidad={actualizarCantidad}
              />
            ))}
          </div>
        </div>
        <div className=" flex flex-col lg:w-1/3 bg-[#e8464d]/20 p-6 rounded-lg ">
          <p className="font-bold text-xl">Resumen</p>
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>S/. {total.toFixed(2)}</p>
          </div>
          <hr className="border-2 text-[#653c25]"></hr>
          <div className="flex justify-between pt-3">
            <p className="font-semibold">Total</p>
            <p className="font-semibold">S/. {total.toFixed(2)}</p>
          </div>
          <div className="flex flex-col pt-5 gap-2">
            <Boton
              label="Continuar"
              color="#2c2c2c"
              hoverColor="#000000"
              borderStyle={false}
              hoverTextColor="#FFFFFF"
              onClick={() => navigate("/pago")}
              className="cursor-pointer"
            />
            <Boton
              label="Seguir comprando"
              onClick={() => navigate("/catalogo-productos")}
              color="transparent"
              hoverColor="transparent"
              textColor="#00000"
              className="underline underline-offset-4  cursor-pointer  "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrito;
