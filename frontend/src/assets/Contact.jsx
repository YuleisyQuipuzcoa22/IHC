import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import logo from "../assets/logodulcinelly.png";
import ubicacion from "../assets/ubicacion.png";
import telefono from "../assets/telefono.png";
import correo from "../assets/correo.png";
import horario from "../assets/horario.png";

function Contact() {
  const form = useRef();

  const enviarcorreo = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_857blle",
        "template_cxmqbff",
        form.current,
        "I-lTjKWx3ic9WqYZz"
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#fff7f0] via-[#ffe5e0] to-[#f9c7b6]">
      <div className="flex flex-col md:flex-row rounded-2xl shadow-2xl overflow-hidden max-w-5xl w-full m-5 bg-[#fff7f0]">
        {/* Columna izquierda: Información de contacto */}
        <div className="md:w-1/2 w-full flex flex-col items-center justify-center gap-8 p-8 bg-[#fff7f0]">
          {/* Ubicación */}
          <div className="flex flex-col items-center mb-4">
            <div className="h-10 w-10 mb-2 bg-[#f9c7b6] rounded-full flex items-center justify-center">
              <img src={ubicacion} alt="ubicación" className="h-6 w-6" />
            </div>
            <p className="text-[#C46C3C] font-semibold text-center mb-1">
              Ubicación:
            </p>
            <ul className="text-[#C46C3C] text-center text-sm font-normal space-y-1">
              <li>Los Diamantes 159. Santa Inés</li>
              <li>Av. Larco 1266. Víctor Larco</li>
              <li>Los Pinos 245. Huanchaco</li>
              <li>Junín 497. Centro</li>
              <li>El Golf</li>
              <li>Plaza del Centro Comercial</li>
            </ul>
          </div>
          {/* Horario */}
          <div className="flex flex-col items-center mb-4">
            <div className="h-10 w-10 mb-2 bg-[#f9c7b6] rounded-full flex items-center justify-center">
              <img src={horario} alt="horario" className="h-6 w-6" />
            </div>
            <p className="text-[#C46C3C] font-semibold text-center">Horario:</p>
            <p className="text-[#C46C3C] text-center text-sm">
              Lunes a viernes: 6:30am a 9:00pm
              <br />
              Domingos: 12:00pm a 8:00pm
            </p>
          </div>
          {/* Teléfono */}
          <div className="flex flex-col items-center mb-4">
            <div className="h-10 w-10 mb-2 bg-[#f9c7b6] rounded-full flex items-center justify-center">
              <img src={telefono} alt="teléfono" className="h-6 w-6" />
            </div>
            <p className="text-[#C46C3C] font-semibold text-center">Teléfono:</p>
            <p className="text-[#C46C3C] text-center text-sm">
              +51 986 358 682
            </p>
          </div>
          {/* Correo */}
          <div className="flex flex-col items-center">
            <div className="h-10 w-10 mb-2 bg-[#f9c7b6] rounded-full flex items-center justify-center">
              <img src={correo} alt="correo" className="h-6 w-6" />
            </div>
            <p className="text-[#C46C3C] font-semibold text-center">Correo:</p>
            <p className="text-[#C46C3C] text-center text-sm break-all">
              Dulcinelly.@gmail.com
            </p>
          </div>
        </div>
        {/* Columna derecha: Formulario */}
        <div className="md:w-1/2 w-full flex flex-col items-center justify-center p-8 bg-[#fff7f0]">
          <img
            src={logo}
            alt="Logo Dulcinelly"
            className="h-20 w-auto mb-2 drop-shadow-lg"
          />
          <h1 className="text-3xl font-bold text-[#C46C3C] mb-1 lilita-text">
            Dulcinelly
          </h1>
          <p className="text-[#E8464D] text-lg font-semibold mb-4">
            ¡Queremos saber de ti!
          </p>
          <form
            ref={form}
            onSubmit={enviarcorreo}
            className="flex flex-col gap-4 bg-[#fff7f0] p-8 rounded-2xl shadow-2xl w-full max-w-md border-2 border-[#f9c7b6]"
          >
            <h2 className="text-2xl font-bold mb-2 text-center text-[#E8464D]">
              Contáctanos
            </h2>
            <p className="text-center text-[#c46c3c] mb-4">
              ¿Tienes dudas, sugerencias o quieres saludarnos? ¡Escríbenos!
            </p>
            <input
              type="text"
              name="nombre"
              placeholder="Tu nombre"
              required
              className="p-3 rounded-md border border-[#f9c7b6] focus:border-[#E8464D] outline-none"
            />
            <input
              type="email"
              name="correo"
              placeholder="Tu correo electrónico"
              required
              className="p-3 rounded-md border border-[#f9c7b6] focus:border-[#E8464D] outline-none"
            />
            <input
              type="text"
              name="asunto"
              placeholder="Asunto"
              required
              className="p-3 rounded-md border border-[#f9c7b6] focus:border-[#E8464D] outline-none"
            />
            <textarea
              name="mensaje"
              placeholder="Escribe tu mensaje"
              required
              rows={5}
              className="p-3 rounded-md border border-[#f9c7b6] focus:border-[#E8464D] outline-none resize-none"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-[#E8464D] to-[#C46C3C] text-white font-semibold py-2 rounded-md hover:from-[#c93c41] hover:to-[#a94e2c] transition"
            >
              ¡Enviar dulzura!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;