import React, { useEffect, useState } from "react";
import CardProduct from "../components/CardProducto";
import Filtros from "../components/Filtros";
import productosData from "../Data/productos.json";

function CatalogoProductos() {
  const [products, setProducts] = useState([]);
  const [categoria, setCategoria] = useState("");
  const [presentacion, setPresentacion] = useState("");
  const [medida, setMedida] = useState("");

  useEffect(() => {
    setProducts(productosData);
  }, []);
  const filteredProducts = products.filter((product) => {
    const matchCategoria = categoria ? product.categoria === categoria : true;
    const matchPresentacion = presentacion
      ? product.tipoPresentacion === presentacion
      : true;
    const matchMedida = medida ? product.unidadMedida === medida : true;
    return matchCategoria && matchPresentacion && matchMedida;
  });

  return (
    <div className="p-6 bg-gray-100">
      <div className="flex flex-col lg:flex-row gap-6">
        <Filtros
          categoria={categoria}
          setCategoria={setCategoria}
          presentacion={presentacion}
          setPresentacion={setPresentacion}
          medida={medida}
          setMedida={setMedida}
        />
        <div className="w-auto lg:w-full max-h-[900px] overflow-y grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="w-full">
              <CardProduct
                imageUrl={product.imagen}
                linkTo={`/producto/${product.id}`}
                titulo={product.titulo}
                precio={product.precio}
                tipoPresentacion={product.tipoPresentacion}
              />
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CatalogoProductos;
