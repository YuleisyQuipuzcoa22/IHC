import { Route, Routes, useLocation,matchPath } from "react-router-dom";
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
import ProductoIndividual from "./pages/ProductoIndividual";
import CompraExitosa from "./pages/CompraExitosa";
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
  { path: "/producto/:id", element: <ProductoIndividual  /> },
  { path: "/compra-exitosa", element: <CompraExitosa /> },
  { path: "/registrarcliente", element: <RegistrarCliente /> },
  { path: "/contact", element: <Contact /> },
];
const rutasValidas = rutasConocidas.map((ruta) => ruta.path);

    
  

  //array solo con los paths
 const isRutaValida = rutasValidas.some((ruta) => matchPath(ruta, location.pathname));


  

  // 4. Definimos si ocultar el layout
  const ocultarLayout =
    ["/login", "/registrarcliente"].includes(location.pathname) || !isRutaValida;;

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
