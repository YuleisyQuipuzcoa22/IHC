import React, { useState } from "react";
const BCPModal = ({ onClose, onDatosValidados }) => {
  const [form, setForm] = useState({
    tarjeta: "4111 1111 1111 1111",
    cvv: "123",
    vencimiento: "12/25",
    titular: "Juan Pérez",
    email: "juan.perez@email.com",
  });
  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validar = () => {
    const nuevosErrores = {};
    if (!form.tarjeta) nuevosErrores.tarjeta = "Requerido";
    if (!form.cvv) nuevosErrores.cvv = "Requerido";
    if (!form.vencimiento) nuevosErrores.vencimiento = "Requerido";
    if (!form.titular) nuevosErrores.titular = "Requerido";
    if (!form.email) nuevosErrores.email = "Requerido";
    return nuevosErrores;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = validar();
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length === 0) {
      alert("Datos validados correctamente. Ahora puedes pagar.");
      if (onDatosValidados) onDatosValidados();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-[rgba(100,100,100,0.4)] transition-colors duration-300">
      <div className="bg-white p-8 rounded-lg shadow-lg relative w-[350px] transform transition-all duration-300 scale-95 opacity-0 animate-modalIn">
        <button
          className="absolute top-2 right-2 text-xl font-bold"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Pago con Tarjeta BCP</h2>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            name="tarjeta"
            placeholder="Número de tarjeta"
            className="bg-white w-full p-2 border border-gray-400 shadow rounded"
            value={form.tarjeta}
            onChange={handleChange}
          />
          {errores.tarjeta && <span className="text-red-500 text-xs">{errores.tarjeta}</span>}
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            className="bg-white w-full p-2 border border-gray-400 shadow rounded"
            value={form.cvv}
            onChange={handleChange}
          />
          {errores.cvv && <span className="text-red-500 text-xs">{errores.cvv}</span>}
          <input
            type="text"
            name="vencimiento"
            placeholder="Fecha de vencimiento (MM/AA)"
            className="bg-white w-full p-2 border border-gray-400 shadow rounded"
            value={form.vencimiento}
            onChange={handleChange}
          />
          {errores.vencimiento && <span className="text-red-500 text-xs">{errores.vencimiento}</span>}
          <input
            type="text"
            name="titular"
            placeholder="Nombre del titular"
            className="bg-white w-full p-2 border border-gray-400 shadow rounded"
            value={form.titular}
            onChange={handleChange}
          />
          {errores.titular && <span className="text-red-500 text-xs">{errores.titular}</span>}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="bg-white w-full p-2 border border-gray-400 shadow rounded"
            value={form.email}
            onChange={handleChange}
          />
          {errores.email && <span className="text-red-500 text-xs">{errores.email}</span>}
          <button
            type="submit"
            className="bg-[#023EC6] text-white py-2 rounded mt-2 font-bold hover:bg-[#1857b8] transition"
          >
            Pagar
          </button>
        </form>
      </div>
      <style>
        {`
          @keyframes modalIn {
            from { opacity: 0; transform: scale(0.95);}
            to { opacity: 1; transform: scale(1);}
          }
          .animate-modalIn {
            animation: modalIn 0.3s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default BCPModal;