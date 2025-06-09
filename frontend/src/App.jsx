import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NotFoundPage from "./pages/NotFound";
import MainPage from "./pages/MainPage";
import Producto from "./pages/CrearProducto";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Cotizacion from './pages/PedidoCotizado'
import Catalogo from './pages/CatalogoProductos';
import Pago from "./pages/Pago";
import Carrito from './pages/CarritoCompras';
import RegistrarCliente from "./pages/RegistrarCliente";
import Contact from "./pages/Contact"; 


function App() {
  const location = useLocation();

  // Declaramos todas las rutas válidas
  const rutasConocidas = [
    { path: "/", element: <MainPage /> },
    { path: "/producto", element: <Producto /> },
    { path: "/login", element: <Login /> },
    { path: "/admin", element: <Admin /> },
    { path: "/pedido/cotizacion", element: <Cotizacion/> },
    { path: "/catalogo-productos", element: <Catalogo/> },
    { path: "/pago", element: <Pago /> },
    { path: "/carrito", element: <Carrito /> },
    { path: "/registrarcliente", element: <RegistrarCliente /> },
    { path: "/contact", element: <Contact /> },
  ];

  //array solo con los paths
  const rutasValidas = rutasConocidas.map((r) => r.path);

  //Detectamos si estamos en una ruta válida o no
  const isNotFound = !rutasValidas.includes(location.pathname);

  // 4. Definimos si ocultar el layout
  const ocultarLayout =
    ["/login", "/registrarcliente"].includes(location.pathname) || isNotFound;

  return (
    <div className="min-h-screen flex flex-col">
      {!ocultarLayout && <Header />}
      <main className="flex-1">
        <Routes>
          {rutasConocidas.map(({ path, element }, index) => (
            <Route key={index} path={path} element={element} />
          ))}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {!ocultarLayout && <Footer />}
    </div>
  );
}

export default App;
