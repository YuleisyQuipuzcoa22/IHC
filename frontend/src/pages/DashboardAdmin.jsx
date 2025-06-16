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
    nombre: prod.titulo +" " +prod.valorUnidadMedida + prod.unidadMedida,
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
];

const DashboardAdmin = () => {
  const { ventasPorProducto, totalVentas, dataCategorias } =
    obtenerEstadisticas();

  return (
    <div className="bg-gray-100 ">
      <div className="bg-[#e2b891]/80 p-8 text-center border-b-5 border-dashed border-[#663d25] mb-8">
        <h1 className="text-4xl font-bold text-[#663d25]">
          DASHBOARD DE VENTAS
        </h1>
      </div>
      <div className="pl-20 pr-20 pb-15">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">
            Total de productos vendidos:{" "}
            <span className="text-[#e8464d]">{totalVentas}</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Gráfica de barras: Ventas por producto */}
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <h2 className="font-semibold mb-4 text-xl text-[#663D25]">
              10 PRODUCTOS MÁS VENDIDOS
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ventasPorProducto}>
                <XAxis
                  dataKey="nombre"
                  tick={{ fontSize: 12 }}
                  interval={0}
                  angle={-20}
                  textAnchor="end"
                  height={90}                 
                  label={{
                    value: "Productos",
                    position: "insideBottom",
                    offset: -5,
                    className: "text-lg font-semibold",
                  }}
                />
                <YAxis
                  label={{
                    value: "N° de ventas",
                    angle: -90,
                    className: "text-lg font-semibold ",
                  }}
                />
                <Tooltip />
                <Bar dataKey="ventas" fill="#e8464d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Gráfica de pastel: Ventas por categoría */}
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <h3 className="font-semibold mb-4 text-xl text-[#663D25]">
              VENTAS POR CATEGORÍA
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dataCategorias}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {dataCategorias.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
