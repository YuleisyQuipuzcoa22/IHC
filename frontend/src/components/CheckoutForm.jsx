import React, { useEffect, useState } from "react";
import { useUserStore } from "../store/usuario.store";

const CheckoutForm = () => {
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

  // Al cargar el componente, llenar el formulario si hay usuario logueado
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

  // Manejo de cambios en inputs
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
    </div>
  );
};

export default CheckoutForm;
