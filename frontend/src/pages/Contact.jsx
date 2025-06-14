import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser"; // Asegúrate de instalar emailjs-com si no lo has hecho

function Contact() {
  const form = useRef();

  const enviarcorreo = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_857blle",
        "template_cxmqbff",
        form.current,
        "I-lTjKWx3ic9WqYZz" // Tu public key, debe ser string
      )
      .then(
        () => {
          alert("Mensaje enviado con éxito");
          form.current.reset();
        },
        (error) => {
          console.error("Error al enviar el mensaje:", error);
          alert("Error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.");
        }
      );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen" style={{ backgroundColor: "#FFE5E0" }}>
      <form ref={form} onSubmit={enviarcorreo} className="flex flex-col gap-4 bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#E8464D]">Contáctanos</h2>
        <input
          type="text"
          name="nombre"
          placeholder="Tu nombre"
          required
          className="p-3 rounded-md border border-gray-300"
        />
        <input
          type="email"
          name="correo"
          placeholder="Tu correo electrónico"
          required
          className="p-3 rounded-md border border-gray-300"
        />
        <input
          type="text"
          name="asunto"
          placeholder="Asunto"
          required
          className="p-3 rounded-md border border-gray-300"
        />
        <textarea
          name="mensaje"
          placeholder="Escribe tu mensaje"
          required
          rows={5}
          className="p-3 rounded-md border border-gray-300"
        />
        <button
          type="submit"
          className="bg-[#E8464D] text-white font-semibold py-2 rounded-md hover:bg-[#c93c41] transition"
        >
          Enviar mensaje
        </button>
      </form>
    </div>
  );
}

export default Contact;