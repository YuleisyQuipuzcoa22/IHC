import React from "react";
import CardProducto from "./CardProducto";
import productosPredefinidos from "../data/productos.json";

function obtenerMasVendidos(cantidad = 3) {
  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  const contador = {};
  pedidos.forEach(pedido => {
    pedido.productos.forEach(prod => {
      contador[prod.id] = (contador[prod.id] || 0) + prod.cantidad;
    });
  });
  const idsMasVendidos = Object.entries(contador)
    .sort((a, b) => b[1] - a[1])
    .slice(0, cantidad)
    .map(([id]) => Number(id));
  const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
  const todosLosProductos = [...productosPredefinidos, ...productosGuardados];
  return todosLosProductos.filter(prod => idsMasVendidos.includes(prod.id));
}

const Dboard_masvendidos = ({ cantidad = 3 }) => {
  const masVendidos = obtenerMasVendidos(cantidad);

  return (
    <section className="w-full bg-[#f8b6ba] py-10 px-15 flex flex-col items-center">
      <h1 className="lilita-text text-3xl md:text-4xl mb-6 text-center">LOS MÁS VENDIDOS</h1>
      <div className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-3 
        xl:grid-cols-4 
        gap-8
        ">
        {masVendidos.length === 0 ? (
          <div className="col-span-full text-gray-500 text-center">Aún no hay ventas registradas.</div>
        ) : (
          masVendidos.map((producto) => (
            <div key={producto.id} className="flex flex-col items-center">
              <CardProducto
                imageUrl={producto.imagen}
                linkTo={`/producto/${producto.id}`}
                titulo={producto.titulo}
                unidadMedida={producto.unidadMedida}
                valorUnidadMedida={producto.valorUnidadMedida}
                precio={producto.precio}
                tipoPresentacion={producto.tipoPresentacion}                
              />
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Dboard_masvendidos;