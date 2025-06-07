import React from "react";
import CardProduct from "../components/CardProducto";
import Filtros from "../components/Filtros";
function CatalogoProductos() {
  const products = [
    {
      id: 1,
      name: "Producto A",
      price: "$10",
      img: "https://res.cloudinary.com/riqra/image/upload/v1660930927/sellers/tortas-gaby/products/z2jh4yikyfxrq1hg0u48.png",
    },
    {
      id: 2,
      name: "Producto B",
      price: "$15",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjPESMzqXbN1DD5bw_c_-kqknq16oXk_fCAA&s",
    },
    {
      id: 3,
      name: "Producto C",
      price: "$20",
      img: "https://d20f60vzbd93dl.cloudfront.net/uploads/tienda_008404/tienda_008404_7fc3860ea329256e8eb7e7b097e0136d1692229a_producto_large_90.jpg?not-from-cache-please",
    },
    {
      id: 4,
      name: "Producto D",
      price: "$25",
      img: "https://res.cloudinary.com/riqra/image/upload/v1714514871/sellers/tortas-gaby/products/dnevh7ywhmnww7vpxtxp.png",
    },
    {
      id: 5,
      name: "Producto A",
      price: "$10",
      img: "https://res.cloudinary.com/riqra/image/upload/v1660930927/sellers/tortas-gaby/products/z2jh4yikyfxrq1hg0u48.png",
    },
    {
      id: 6,
      name: "Producto B",
      price: "$15",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjPESMzqXbN1DD5bw_c_-kqknq16oXk_fCAA&s",
    },
    {
      id: 7,
      name: "Producto C",
      price: "$20",
      img: "https://d20f60vzbd93dl.cloudfront.net/uploads/tienda_008404/tienda_008404_7fc3860ea329256e8eb7e7b097e0136d1692229a_producto_large_90.jpg?not-from-cache-please",
    },
    {
      id: 8,
      name: "Producto D",
      price: "$25",
      img: "https://res.cloudinary.com/riqra/image/upload/v1714514871/sellers/tortas-gaby/products/dnevh7ywhmnww7vpxtxp.png",
    },
  ];
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-6">
        <Filtros />

        {/* Productos */}
        <div className="w-auto lg:w-full max-h-[900px] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className=" w-full">
              <CardProduct
                imageUrl={product.img}
                linkTo={`/producto/${product.id}`}
                texto={`${product.name} - ${product.price}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CatalogoProductos;
