import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Label,
} from "recharts";
import productosPredefinidos from "../data/productos.json";

function obtenerEstadisticas() {
  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  const productosGuardados =
    JSON.parse(localStorage.getItem("productos")) || [];
  const todosLosProductos = [...productosPredefinidos, ...productosGuardados];

  // Contar ventas por producto
  const contador = {};
  pedidos.forEach((pedido) => {
    pedido.productos.forEach((prod) => {
      contador[prod.id] = (contador[prod.id] || 0) + prod.cantidad;
    });
  });

  // Generar datos para la gráfica de barras
  let ventasPorProducto = todosLosProductos.map((prod) => ({
    nombre: prod.titulo + " " + prod.valorUnidadMedida + prod.unidadMedida,
    ventas: contador[prod.id] || 0,
  }));

  // Ordenar y tomar los 10 más vendidos
  ventasPorProducto = ventasPorProducto
    .sort((a, b) => b.ventas - a.ventas)
    .slice(0, 10);

  // Total de ventas
  const totalVentas = ventasPorProducto.reduce((acc, p) => acc + p.ventas, 0);

  // Ventas por categoría
  const ventasPorCategoria = {};
  todosLosProductos.forEach((prod) => {
    const cat = prod.categoria || "Sin categoría";
    ventasPorCategoria[cat] =
      (ventasPorCategoria[cat] || 0) + (contador[prod.id] || 0);
  });
  const dataCategorias = Object.entries(ventasPorCategoria).map(
    ([cat, ventas]) => ({
      name: cat,
      value: ventas,
    })
  );

  return { ventasPorProducto, totalVentas, dataCategorias };
}
const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7f50",
  "#a4de6c",
  "#d0ed57",
  "#ff7300", // Añadimos más colores para evitar repeticiones si hay muchas categorías
  "#3f6c8d",
  "#8f3f8d",
  "#8d7e3f",
];

const DashboardAdmin = () => {
  const { ventasPorProducto, totalVentas, dataCategorias } =
    obtenerEstadisticas();
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-[#e2b891]/80 p-6 sm:p-8 text-center border-b-5 border-dashed border-[#663d25] mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#663d25] break-words">
          DASHBOARD DE VENTAS
        </h1>
      </div>
      {/* Contenedor principal con padding responsivo */}
      <div className="p-4 sm:p-6 md:px-20 md:pb-15">
        <div className="mb-6 sm:mb-8 text-center md:text-left">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">
            Total de productos vendidos:{" "}
            <span className="text-[#e8464d] font-bold">{totalVentas}</span>
          </h2>
        </div>
        {/* Contenedor de las gráficas: apiladas en móvil/tableta, lado a lado en desktop */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* Gráfica de barras: Top 10 productos más vendidos*/}
          {/* Añadimos overflow-x-auto para el scroll horizontal en caso de etiquetas largas */}
          <div className="bg-white rounded-lg shadow p-4 text-center overflow-x-auto w-full lg:w-1/2">
            <h2 className="font-semibold mb-4 text-lg sm:text-xl text-[#663D25]">
              10 PRODUCTOS MÁS VENDIDOS
            </h2>
            {/* El ResponsiveContainer se asegura de que el gráfico ocupe el 100% del ancho disponible */}
            {/* Definimos un ancho fijo mínimo para el BarChart para forzar el scroll si es necesario */}
            <ResponsiveContainer width="100%" minWidth={400} height={350}>
              <BarChart data={ventasPorProducto} margin={{ top: 10, right: 0, left: 0, bottom: 50 }}>
                <XAxis
                  dataKey="nombre"
                  tick={{ fontSize: 11 }}
                  interval={0}
                  angle={-30} // Ángulo un poco más pronunciado para texto más largo
                  textAnchor="end"
                  height={80} // Altura de la XAxis para acomodar las etiquetas rotadas
                />
                <YAxis
                  label={{
                    value: "N° de ventas",
                    angle: -90,
                    position: "insideLeft",
                    className: "text-md font-semibold",
                  }}
                />
                <Tooltip cursor={{ fill: '#f0f0f0' }} /> {/* Fondo claro para el tooltip */}
                <Bar dataKey="ventas" fill="#e8464d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfica de pastel: Ventas por categoría */}
          <div className="bg-white rounded-lg shadow p-4 text-center w-full lg:w-1/2">
            <h3 className="font-semibold mb-4 text-lg sm:text-xl text-[#663D25]">
              VENTAS POR CATEGORÍA
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={dataCategorias}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} // Muestra nombre y porcentaje
                >
                  {dataCategorias.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} unidades`} /> {/* Formato más amigable */}
                <Legend layout="horizontal" align="center" verticalAlign="bottom" /> {/* Leyenda debajo y centrada */}
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;