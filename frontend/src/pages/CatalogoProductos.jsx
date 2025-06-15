import React, { useEffect, useState } from "react";
import CardProduct from "../components/CardProducto";
import Filtros from "../components/Filtros";
import productosPredefinidos from "../data/productos.json";
function CatalogoProductos() {
  const [products, setProducts] = useState([]);
  const [categoria, setCategoria] = useState("");
  const [tipoPresentacion, setTipoPresentacion] = useState("");
  const [unidadMedida, setUnidadMedida] = useState("");

  useEffect(() => {
    const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
    setProducts([...productosPredefinidos, ...productosGuardados]);
  }, []);

  // Opciones únicas para los filtros
  const categorias = [...new Set(products.map(p => p.categoria).filter(Boolean))];
  const tiposPresentacion = [...new Set(products.map(p => p.tipoPresentacion).filter(Boolean))];
  const unidadesMedida = [...new Set(products.map(p => p.unidadMedida).filter(Boolean))];

  const filteredProducts = products.filter((product) => {
    const matchCategoria = categoria ? product.categoria === categoria : true;
    const matchTipoPresentacion = tipoPresentacion ? product.tipoPresentacion === tipoPresentacion : true;
    const matchUnidadMedida = unidadMedida ? product.unidadMedida === unidadMedida : true;
    return matchCategoria && matchTipoPresentacion && matchUnidadMedida;
  });

  return (
    <div className="p-6 bg-gray-100 ">
      <div className="flex flex-col lg:flex-row gap-6">
        <Filtros
          categoria={categoria}
          setCategoria={setCategoria}
          tipoPresentacion={tipoPresentacion}
          setTipoPresentacion={setTipoPresentacion}
          unidadMedida={unidadMedida}
          setUnidadMedida={setUnidadMedida}
          categorias={categorias}
          tiposPresentacion={tiposPresentacion}
          unidadesMedida={unidadesMedida}
        />
        <div className="w-auto lg:w-full overflow-y grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="w-full">
              <CardProduct
                imageUrl={product.imagen}
                linkTo={`/producto/${product.id}`}
                titulo={product.titulo}
                precio={Number(product.precio).toFixed(2)}
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