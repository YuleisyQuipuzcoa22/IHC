import React, { useRef, useState, useEffect } from "react";
import DashboardCard from "./DashboardCard.jsx";
import useOnScreen from "../hooks/useOnScreen.js";
import useContadorAnimado from "../hooks/useContadorAnimado.js";
import usuarioIcono from "../assets/Usuario_icono.png";
import ventaIcono from "../assets/venta_icono.png";

const Dashboard = () => {
  // Productos
  const [productosMostrado, setProductosMostrado] = useState(false);
  const productosContadorRef = useRef();
  const productosVisible = useOnScreen(productosContadorRef);
  useEffect(() => {
    if (productosVisible && !productosMostrado) setProductosMostrado(true);
  }, [productosVisible, productosMostrado]);
  const productos = useContadorAnimado(40, 1200, productosMostrado);

  // Usuarios
  const [usuariosMostrado, setUsuariosMostrado] = useState(false);
  const usuariosContadorRef = useRef();
  const usuariosVisible = useOnScreen(usuariosContadorRef);
  useEffect(() => {
    if (usuariosVisible && !usuariosMostrado) setUsuariosMostrado(true);
  }, [usuariosVisible, usuariosMostrado]);
  const usuarios = useContadorAnimado(3000, 1200, usuariosMostrado);

  // Ventas
  const [ventasMostrado, setVentasMostrado] = useState(false);
  const ventasContadorRef = useRef();
  const ventasVisible = useOnScreen(ventasContadorRef);
  useEffect(() => {
    if (ventasVisible && !ventasMostrado) setVentasMostrado(true);
  }, [ventasVisible, ventasMostrado]);
  const ventas = useContadorAnimado(10000, 1200, ventasMostrado);

  return (
    <div
      className="w-full py-8 flex flex-col md:flex-row justify-center items-center gap-8 md:gap-20"
      style={{ backgroundColor: "#F8B6BA" }}
    >
      <DashboardCard
        icon={usuarioIcono}
        value={"+"+productos.toLocaleString()}
        label="Productos disponibles con receta única"
        ref={productosContadorRef}
      />
      <DashboardCard
        icon={ventaIcono}
        value={"+"+ventas.toLocaleString()}
        label="Ventas realizadas en este 2025"
        ref={ventasContadorRef}
      />
      <DashboardCard
        icon={usuarioIcono}
        value={"+"+usuarios.toLocaleString()}
        label="Usuarios confían en Dulcinelly"
        ref={usuariosContadorRef}
      />
    </div>
  );
};

export default Dashboard;