import React from "react";
import { useNavigate } from "react-router-dom";
import YapeModal from "./YapeModal";
import BCPModal from "./BCPModal";
import { limpiarCarrito, obtenerCarrito } from "../utils/carrito";
import { guardarPedido } from "../utils/pedidos";

const PaymentMethods = ({ getCheckoutForm }) => {
  const navigate = useNavigate();
  const [modalAbierto, setModalAbierto] = React.useState(false);
  const [tipoModal, setTipoModal] = React.useState("");
  const [metodoSeleccionado, setMetodoSeleccionado] = React.useState(null);
  const [bcpDatosValidados, setBcpDatosValidados] = React.useState(false);

  const handlePagar = () => {
    const productos = obtenerCarrito();
    if (!localStorage.getItem("usuarioLogueado")) {
      alert("Por favor, inicia sesión para continuar.");
      return;
    }
    if (!productos || productos.length === 0) {
      alert("¡No hay productos en el carrito por cual pagar!");
      return;
    }
    if (!metodoSeleccionado) {
      alert("Por favor, selecciona un método de pago.");
      return;
    }
    // 1. Obtener usuario logueado
    const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));

    // 3. Obtener datos del formulario de checkout
    const datosCheckout = getCheckoutForm ? getCheckoutForm() : {};

    // 4. Crear pedido
    const pedido = {
      usuario,
      productos,
      datosCheckout,
      fecha: new Date().toISOString(),
      metodoPago: metodoSeleccionado,
    };

    // 5. Guardar pedido
    guardarPedido(pedido);

    // 6. Limpiar carrito
    limpiarCarrito();

    // 7. Redirigir
    navigate("/compra-exitosa");
  };

  const abrirModal = (tipo) => {
    setTipoModal(tipo);
    setModalAbierto(true);
    setMetodoSeleccionado(tipo);
  };
  const cerrarModal = () => {
    setModalAbierto(false);
    setTipoModal("");
  };

  return (
    <div className="text-center mt-6">
      <h4 className=" text-lg font-bold mb-4 text-center">MÉTODOS DE PAGO</h4>
      <div className="flex justify-center items-center gap-4 text 2xl mb-4 border-t-4 border-[#663D25] pt-4">
        <div className="flex flex-col justify-center items-center gap-4 w-full">
          <div className="flex gap-1 text-4xl mb-1">
            <img
              src="/src/assets/yape.png"
              className="w-50 duration-300 ease-in-out hover:scale-110"
              onClick={() => abrirModal("yape")}
              alt="Yape"
            ></img>
            <img
              src="/src/assets/BCP.png"
              className="w-35 h-18 mt-4 transition duration-300 ease-in-out hover:scale-110"
              onClick={() => abrirModal("bcp")}
              alt="BCP"
            ></img>
          </div>

          <div>
            <button
              className="font-bold bg-[#C46C3C] text-white py-3 md:w-lg w-xs rounded hover:bg-amber-700  transition duration-300 ease-in-out hover:scale-104"
              onClick={handlePagar}
            >
              Pagar
            </button>
          </div>

          <button
            className="border border-amber-900 text-amber-900 py-3 md:w-lg w-xs rounded hover:bg-[#E2B891] transition duration-300 ease-in-out hover:scale-104"
            onClick={() => navigate("/catalogo-productos")}
          >
            Seguir comprando
          </button>
        </div>
      </div>
      {modalAbierto && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 transition-colors duration-300"
          style={{
            backgroundColor: "rgba(43, 43, 43, 0.4)", // gris semitransparente
            transition: "background-color 0.3s",
          }}
        >
          <div className="bg-white p-8 rounded-lg shadow-lg relative w-[350px] transform transition-all duration-300 scale-100 opacity-100">
            <button
              className="absolute top-2 right-2 text-xl font-bold"
              onClick={cerrarModal}
            >
              ×
            </button>
            {tipoModal === "yape" && <YapeModal onClose={cerrarModal} />}
            {tipoModal === "bcp" && (
              <BCPModal
                onClose={cerrarModal}
                onDatosValidados={() => setBcpDatosValidados(true)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default PaymentMethods;
