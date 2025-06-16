import Carrusel from "../components/CarruselMain";
import carrusel_1 from "../assets/carrusel_1.png";
import carrusel_2 from "../assets/carrusel_2.png";
import carrusel_3 from "../assets/carrusel_3.jpg";
import carrusel_4 from "../assets/carrusel_4.jpg";
import presentacion_personal from "../assets/presentacion_personal.jpg";
import sedes from "../assets/sedes.png";
import borde2 from "../assets/borde2.png";
import bordeondas from "../assets/bordeondas.png";
import Dashboard from "../components/Dashboard";
import Dboard_masvendidos from "../components/Dboard_masvendidos";

const imagenesCarrusel = [
  { imagen: carrusel_1 },
  { imagen: carrusel_2 },
  { imagen: carrusel_3 },
  { imagen: carrusel_4 },
];
const frases = [
  { color: "#E8464D", texto: "Con Dulcinelly, tus celebraciones saben mejor." },
  { color: "#E8464D", texto: "Endulzamos tus momentos más especiales." },
  { color: "#E8464D", texto: "Cada bocado es una historia hecha con amor." },
  {
    color: "#E8464D",
    texto: "Descubre el placer de lo hecho en casa… con alma Dulcinelly",
  },
  { color: "#E8464D", texto: "Pasteles que se ven tan bien como saben.." },
  {
    color: "#E8464D",
    texto:
      "“Pasteles artesanales que despiertan sonrisas – Dulcinelly lo hace posible.",
  },
];

function MainPage() {
  return (
    <div>
      <Carrusel
        diapositivas={imagenesCarrusel}
        autoAvance={true}
        intervaloAuto={4000}
        tipoTransicion="fade"
        height="h-[650px]"
      />
      <Dashboard />
      <div className="relative bg-[#E8464D] ">
        <img className="absolute top-0 left-0 w-full z-10   " src={borde2} />
        <Carrusel
          diapositivas={frases}
          autoAvance={true}
          intervaloAuto={5000}
          tipoTransicion="slide"
          height="h-[300px]"
          direccionSlide="y"
          className="spicy-text text-4xl pt-3 border-b-5 border-[#f8b6ba] "
          mostrarBarras={false}
          mostrarFlechas={false}
        />
        <img
          className="absolute bottom-0 left-0 w-full z-10 "
          src={bordeondas}
        />
      </div>
      <div>
        <Dboard_masvendidos cantidad={4} />
      </div>

      <div className="px-6 sm:px-20 py-10 flex flex-col items-center bg-gradient-to-b from-[#f8b6ba] via-[#FFFFFF] to-[#FFFFFF]">
        <h1 className="spicy-text text-4xl sm:text-5xl text-black pb-5 text-center">
          ¿Por qué elegirnos?
        </h1>
        <p className="text-center max-w-3xl">
          En Dulcinelly fusionamos el alma de Trujillo con la dulzura de lo
          hecho en casa. Inspirados en nuestras tradiciones como la alegría de
          la Marinera y la calidez de nuestras reuniones familiares, creamos
          postres artesanales que despiertan emociones.
        </p>
        <p className="dancing-text font-bold  text-2xl  pb-10 text-center max-w-2xl">
          No solo endulzamos tu mesa, le damos sabor a tus momentos más
          especiales. 💗🍰
        </p>

        <div className="grid sm:grid-cols-2 gap-6 bg-[#C46C3C] p-6 sm:p-10 rounded-lg">
          <div className="flex justify-center items-center">
            <img
              className="w-full  h-100 object-cover"
              src={presentacion_personal}
            />
          </div>
          <div className="text-white ml-5">
            <p className="lilita-text uppercase  text-lg text-[#fce9ae]">
              Dulcinelly nace del deseo de convertir lo cotidiano en momentos
              dulces y memorables...
            </p>
            <p>
              Desde 2018, empezamos con una sencilla cocina familiar en Perú,
              donde el amor por lo artesanal, los ingredientes naturales y el
              detalle en cada creación se convirtieron en nuestro sello. Con el
              tiempo, Dulcinelly fue conquistando corazones y mesas en
              celebraciones, regalos especiales y momentos cotidianos. <br />
              <br />
              Nuestra filosofía es clara: elaborar productos frescos, creativos
              y con ese sabor casero que despierta sonrisas. Cada pedido lo
              realizamos con dedicación, cuidando desde la presentación hasta el
              último toque decorativo.
              <br />
              <br />
              Ofrecemos desde postres clásicos reinventados hasta bocaditos
              personalizados. Dulcinelly también es innovación: creamos
              colecciones por temporada y detalles para fechas especiales.
            </p>

            <p className="italic font-semibold ">
              Hoy, Dulcinelly sigue creciendo con el mismo cariño del primer
              día… y con muchas ideas deliciosas por venir.
            </p>
          </div>
        </div>
      </div>

      <div
        className="w-full h-142 bg-cover bg-center bg-no-repeat flex p-5 mb-5"
        style={{ backgroundImage: `url(${sedes})` }}
      >
        <div className="flex flex-col items-center m-10 bg-white/60 h-auto w-100 rounded-br-4xl rounded-tl-4xl p-12 text-center ">
          <h1 className=" lilita-text  text-3xl ">NUESTROS LOCALES </h1>
          <h2 className="underline text-2xl">TRUJILLO</h2>
          <ul className="text-lg font-medium text-left list-disc leading-relaxed pt-5">
            <li>Los Diamantes 159. Santa Inés</li>
            <li>Av. Larco 1266. Víctor Larco</li>
            <li>Los Pinos 245. Huanchaco</li>
            <li>Junín 497. Centro</li>
            <li>El Golf</li>
            <li>Mall Plaza</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
