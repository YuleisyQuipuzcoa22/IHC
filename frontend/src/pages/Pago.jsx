import React, { useEffect, useState } from "react";
import CheckoutItem from "../components/CheckoutItem";
import PaymentMethods from "../components/PaymentMethods";
import { obtenerCarrito } from "../utils/carrito";
import { useUserStore } from "../store/usuario.store";

const CheckoutSection = ({ productos, subtotal }) => {
  const { user } = useUserStore();
  const [modoEntrega, setModoEntrega] = useState("delivery");
  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    correo: "",
    direccion: "",
    distrito: "Trujillo",
    referencia: "",
    sede: "",
  });

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        nombre: user.nombre || "",
        apellidos: user.apellidos || "",
        correo: user.correo || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-4">
      {/* Título */}
      <h3 className="text-lg font-bold mb-4 text-center">TIPO DE ENTREGA</h3>
      {/* Botones de tipo de entrega */}
      <div className="flex justify-center gap-5 mt-4 pt-4 border-t-4 border-[#663D25]">
        <button
          className={`transition duration-300 ease-in-out hover:scale-115 px-4 py-2 border rounded ${
            modoEntrega === "delivery"
              ? "bg-[#FAB5C1]"
              : "border-gray-400 shadow"
          }`}
          onClick={() => setModoEntrega("delivery")}
        >
          Delivery
        </button>
        <button
          className={`transition duration-300 ease-in-out hover:scale-115 px-4 py-2 border rounded ${
            modoEntrega === "recojo" ? "bg-[#FAB5C1]" : "border-gray-400 shadow"
          }`}
          onClick={() => setModoEntrega("recojo")}
        >
          Recojo
        </button>
      </div>
      {/* Nombre y apellidos */}
      <div className="flex gap-4">
        <div className="flex flex-col w-1/2">
          <label className="mb-1 font-medium">Nombre</label>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            className="bg-white w-full p-2 border border-gray-400 shadow rounded placeholder-[#a8a8a8]"
            value={form.nombre}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col w-1/2">
          <label className="mb-1 font-medium">Apellidos</label>
          <input
            type="text"
            name="apellidos"
            placeholder="Apellidos"
            className="bg-white w-full p-2 border border-gray-400 shadow rounded placeholder-[#a8a8a8]"
            value={form.apellidos}
            onChange={handleChange}
          />
        </div>
      </div>
      {/* Correo */}
      <div className="flex flex-col">
        <label className="font-medium">Correo</label>
        <input
          type="email"
          name="correo"
          placeholder="@gmail.com"
          className="bg-white w-full p-2 border border-gray-400 shadow rounded placeholder-[#a8a8a8]"
          value={form.correo}
          onChange={handleChange}
        />
      </div>
      {/* Campos adicionales según el modo de entrega */}
      {modoEntrega === "delivery" && (
        <>
          <div className="flex gap-4">
            <div className="flex flex-col w-1/2">
              <label className="mb-1 font-medium">Dirección</label>
              <input
                type="text"
                name="direccion"
                placeholder="Dirección"
                className="bg-white w-full p-2 border border-gray-400 shadow rounded placeholder-[#a8a8a8]"
                value={form.direccion}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label className="mb-1 font-medium">Distrito</label>
              <select
                name="distrito"
                className="bg-white w-full p-2 border border-gray-400 shadow rounded"
                value={form.distrito}
                onChange={handleChange}
              >
                <option value="">Seleccione un distrito</option>
                <option value="Trujillo">Trujillo</option>
                <option value="Víctor Larco">Víctor Larco</option>
                <option value="Huanchaco">Huanchaco</option>
                <option value="La Esperanza">La Esperanza</option>
                <option value="Moche">Moche</option>
                <option value="El Porvenir">El Porvenir</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col mt-2">
            <label className="mb-1 font-medium">Referencia</label>
            <input
              type="text"
              name="referencia"
              placeholder="Referencia"
              className="bg-white w-full p-2 border border-gray-400 shadow rounded placeholder-[#a8a8a8]"
              value={form.referencia}
              onChange={handleChange}
            />
          </div>
        </>
      )}
      {modoEntrega === "recojo" && (
        <div className="flex flex-col w-1/2">
          <label className="mb-1 font-medium">Sede</label>
          <select
            name="sede"
            className="bg-white w-full p-2 border border-gray-400 shadow rounded"
            value={form.sede}
            onChange={handleChange}
          >
            <option value="">Seleccione una sede</option>
            <option value="Sede Central - Trujillo">
              Sede Central - Trujillo
            </option>
            <option value="Sede Mall Aventura">Sede Mall Aventura</option>
            <option value="Sede El Golf">Sede El Golf</option>
          </select>
        </div>
      )}
      {/* Resumen de la orden */}
      <div className="mt-8">
        <h3 className="pt-10 text-lg font-bold mb-1 text-center">RESUMEN DE LA ORDEN</h3>
        <p className="flex justify-between mt-6 border-t-4 border-[#663D25] pt-4">
          <span className="text-sm font-semibold">Subtotal:</span>
          <span className="text-sm font-semibold">S/.{subtotal.toFixed(2)}</span>
        </p>
        <p className="pt-8 flex justify-between ">
          <span className="text-base font-bold">Total:💰</span>
          <span className="text-base font-bold text-gray-700 " >S/.{subtotal.toFixed(2)}</span>
        </p>
      </div>
      {/* Métodos de pago */}
      <PaymentMethods />
    </div>
  );
};

const Pago = () => {
  const [productos, setProductos] = useState(() => obtenerCarrito());
  useEffect(() => {
    const syncCarrito = () => setProductos(obtenerCarrito());
    window.addEventListener("storage", syncCarrito);
    return () => window.removeEventListener("storage", syncCarrito);
  }, []);

  const subtotal = productos.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3 bg-[#ECE0E0] p-6 rounded-lg shadow overflow-y-auto max-h-[600px] ">
          <h2 className="text-2xl font-bold ">CHECK OUT</h2>
          <div className="mt-5 border-t-4 border-[#663D25] pt-4 "></div>
          {productos.map((item, index) => (
            <CheckoutItem key={index} {...item} />
          ))}
        </div>
        <div className="lg:w-1/3 bg-[#ECE0E0] p-6 rounded-lg shadow ">
          <CheckoutSection productos={productos} subtotal={subtotal} />
        </div>
      </div>
    </div>
  );
};

export default Pago;