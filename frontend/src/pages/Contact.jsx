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
          alert(
            "Error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde."
          );
        }
      );
  };

  return (
    <div className="pt-24 pb-24 px-8 flex flex-col min-h-screen w-full bg-gradient-to-br from-[#fff7f0] via-[#ffe5e0] to-[#f9c7b6] items-center">
      <div className="flex flex-col items-center justify-center mb-12 mt-4 w-full">
        <img
          src={logo}
          alt="Logo Dulcinelly"
          className="h-28 w-auto mb-2 drop-shadow-lg"
        />
        <h1 className="text-5xl font-bold text-[#C46C3C] mb-2 lilita-text text-center">
          Dulcinelly
        </h1>
        <p className="text-[#E8464D] text-2xl font-semibold mb-2 text-center">
          ¡Queremos saber de ti!
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-start w-full max-w-7xl gap-24 px-4">
        <div className="md:w-[38%] w-full flex flex-col items-center justify-center gap-8 p-10 z-10">
          {/* Ubicación */}
          <div className="flex flex-col items-center mb-4 w-full">
            <div className="h-14 w-14 mb-2 bg-[#f9c7b6] rounded-full flex items-center justify-center shadow">
              <img src={ubicacion} alt="ubicación" className="h-8 w-8" />
            </div>
            <p className="text-[#C46C3C] font-bold text-xl text-center mb-1">
              Ubicación:
            </p>
            <div className="grid grid-cols-2 gap-x-8 text-[#C46C3C] text-center text-lg font-normal w-full max-w-md mx-auto">
              <div>
                <div>Los Diamantes 159. Santa Inés</div>
                <div>Av. Larco 1266. Víctor Larco</div>
                <div>Los Pinos 245. Huanchaco</div>
              </div>
              <div>
                <div>Junín 497. Centro</div>
                <div>El Golf</div>
                <div>Plaza del Centro Comercial</div>
              </div>
            </div>
          </div>
          {/* Horario */}
          <div className="flex flex-col items-center mb-4">
            <div className="h-14 w-14 mb-2 bg-[#f9c7b6] rounded-full flex items-center justify-center shadow">
              <img src={horario} alt="horario" className="h-8 w-8" />
            </div>
            <p className="text-[#C46C3C] font-bold text-xl text-center">
              Horario:
            </p>
            <p className="text-[#C46C3C] text-center text-lg">
              Lunes a viernes: 6:30am a 9:00pm
              <br />
              Domingos: 12:00pm a 8:00pm
            </p>
          </div>
          {/* Teléfono */}
          <div className="flex flex-col items-center mb-4">
            <div className="h-14 w-14 mb-2 bg-[#f9c7b6] rounded-full flex items-center justify-center shadow">
              <img src={telefono} alt="teléfono" className="h-8 w-8" />
            </div>
            <p className="text-[#C46C3C] font-bold text-xl text-center">
              Teléfono:
            </p>
            <p className="text-[#C46C3C] text-center text-lg">
              +51 986 358 682
            </p>
          </div>
          {/* Correo */}
          <div className="flex flex-col items-center">
            <div className="h-14 w-14 mb-2 bg-[#f9c7b6] rounded-full flex items-center justify-center shadow">
              <img src={correo} alt="correo" className="h-8 w-8" />
            </div>
            <p className="text-[#C46C3C] font-bold text-xl text-center">
              Correo:
            </p>
            <p className="text-[#C46C3C] text-center text-lg break-all">
              Dulcinelly.@gmail.com
            </p>
          </div>
        </div>
        <div className="md:w-[38%] w-full flex flex-col items-center justify-center z-10">
          <form
            ref={form}
            onSubmit={enviarcorreo}
            className="flex flex-col gap-6 w-full max-w-xl justify-center p-12 bg-transparent"
            style={{ minHeight: "500px" }}
          >
            <h2 className="text-4xl font-bold mb-2 text-center text-[#E8464D]">
              Contáctanos
            </h2>
            <p className="text-center text-[#c46c3c] mb-4 text-xl">
              ¿Tienes dudas, sugerencias o quieres saludarnos? ¡Escríbenos!
            </p>
            <input
              type="text"
              name="nombre"
              placeholder="Tu nombre"
              required
              className="p-4 rounded-md border-2 border-[#8B3A1C] focus:border-[#E8464D] outline-none text-lg font-semibold shadow-sm"
            />
            <input
              type="email"
              name="correo"
              placeholder="Tu correo electrónico"
              required
              className="p-4 rounded-md border-2 border-[#8B3A1C] focus:border-[#E8464D] outline-none text-lg font-semibold shadow-sm"
            />
            <input
              type="text"
              name="asunto"
              placeholder="Asunto"
              required
              className="p-4 rounded-md border-2 border-[#8B3A1C] focus:border-[#E8464D] outline-none text-lg font-semibold shadow-sm"
            />
            <textarea
              name="mensaje"
              placeholder="Escribe tu mensaje"
              required
              rows={6}
              className="p-4 rounded-md border-2 border-[#8B3A1C] focus:border-[#E8464D] outline-none resize-none text-lg font-semibold shadow-sm"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-[#E8464D] to-[#C46C3C] text-white font-semibold py-3 rounded-md text-xl hover:from-[#c93c41] hover:to-[#a94e2c] transition"
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
