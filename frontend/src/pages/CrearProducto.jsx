import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaRegTrashCan } from "react-icons/fa6";

function CrearProducto() {
  const [previewImg, setPreviewImg] = useState(null);
  const [fileName, setFileName] = useState("Ningún archivo elegido");
  const categorias = ["Pasteles", "Bebidas", "Bocaditos"];
  const tipoPresentacionOpciones = ["Unidad", "Porción"];
  const unidadMedidaOpciones = ["Kg", "Lt", "Gr", "Ml", "otro"];

  const initialValues = {
    titulo: "",
    descripcion: "",
    categoria: "",
    tipoPresentacion: "",
    unidadMedida: "",
    valorUnidadMedida: "",
    precio: "",
    imagen: null,
  };

  const validationSchema = Yup.object({
    titulo: Yup.string().required("El nombre es obligatorio"),
    descripcion: Yup.string().required("La descripción es obligatoria"),
    categoria: Yup.string().required("La categoría es obligatoria"),
    tipoPresentacion: Yup.string().required("La presentación es obligatoria"),
    unidadMedida: Yup.string().required("La unidad es obligatoria"),
    valorUnidadMedida: Yup.string()
      .required("Este campo es obligatorio")
      .matches(/^[0-9/\.]+$/, "Solo números y /"),
    precio: Yup.number().required("El precio es obligatorio").positive("El precio debe ser un número positivo"),
    imagen: Yup.mixed().required("La imagen es obligatoria"),
  });

  const handleSubmit = (values, { resetForm, setErrors }) => {
    const productosGuardados = JSON.parse(
      localStorage.getItem("productos") || "[]"
    );

    const existe = productosGuardados.some(
      (p) =>
        p.titulo.trim().toLowerCase() === values.titulo.trim().toLowerCase()
    );
    if (existe) {
      setErrors({ titulo: "Ya existe un producto con ese nombre" });
      return;
    }

    const nuevoProducto = {
      id: Date.now(),
      ...values,
    };

    const nuevosProductos = [...productosGuardados, nuevoProducto];
    localStorage.setItem("productos", JSON.stringify(nuevosProductos));

    alert("Producto creado con éxito 🎉");
    resetForm();
    setPreviewImg(null);
    setFileName("Ningún archivo elegido");
  };

  const handleImageChange = (e, setFieldValue) => {
    const file = e.currentTarget.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFieldValue("imagen", reader.result);
        setPreviewImg(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFileName("Ningún archivo elegido");
      setFieldValue("imagen", null);
      setPreviewImg(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4 sm:p-6">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, setFieldValue, errors, touched }) => (
          <Form className="bg-white rounded-xl shadow-xl p-6 sm:p-8 w-full max-w-5xl">
            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-800">
              Crear Producto
            </h1>

            {/* Este div maneja la responsividad del diseño de dos columnas */}
            {/* Por defecto es flex-col (columnas apiladas) en móvil y md:flex-row (dos columnas) en desktop */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-4">
              {/* Columna Izquierda (Datos del producto) */}
              <div className="flex-1 space-y-4">
                {/* Imagen */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Imagen del Producto</label>
                  <label className="bg-[#ff4c4c] hover:bg-[#E8464D] text-white py-2 px-4 rounded cursor-pointer transition-colors duration-200">
                    Seleccionar archivo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, setFieldValue)}
                      className="hidden"
                    />
                  </label>
                  <span className="ml-3 text-sm text-gray-700 block mt-2 md:inline-block md:mt-0">
                    {fileName}
                  </span>
                  {previewImg && (
                    <div className="flex items-center gap-4 mt-4">
                      <img
                        src={previewImg}
                        alt="preview"
                        className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg shadow-md"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewImg(null);
                          setFieldValue("imagen", null);
                          setFileName("Ningún archivo elegido");
                        }}
                        className="flex items-center justify-center p-2 rounded-full text-gray-500 hover:bg-red-100 hover:text-red-600 transition-colors duration-200"
                        aria-label="Eliminar imagen"
                      >
                        <FaRegTrashCan className="text-[20px]" />
                      </button>
                    </div>
                  )}
                  <ErrorMessage
                    name="imagen"
                    component="p"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                {/* Título */}
                <div>
                  <label htmlFor="titulo" className="block text-gray-700 text-sm font-bold mb-2">Título del Producto</label>
                  <Field
                    name="titulo"
                    id="titulo"
                    placeholder="Nombre del producto"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4c4c]"
                  />
                  <ErrorMessage
                    name="titulo"
                    component="p"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                {/* Categoría */}
                <div>
                  <label htmlFor="categoria" className="block text-gray-700 text-sm font-bold mb-2">Categoría</label>
                  <Field
                    as="select"
                    name="categoria"
                    id="categoria"
                    className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#ff4c4c]"
                  >
                    <option value="">Selecciona categoría</option>
                    {categorias.map((c, i) => (
                      <option key={i} value={c}>
                        {c}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="categoria"
                    component="p"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                {/* Tipo Presentación */}
                <div>
                  <label htmlFor="tipoPresentacion" className="block text-gray-700 text-sm font-bold mb-2">Tipo de Presentación</label>
                  <Field
                    as="select"
                    name="tipoPresentacion"
                    id="tipoPresentacion"
                    className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#ff4c4c]"
                  >
                    <option value="">Selecciona presentación</option>
                    {tipoPresentacionOpciones.map((t, i) => (
                      <option key={i} value={t}>
                        {t}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="tipoPresentacion"
                    component="p"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                {/* Unidad Medida */}
                <div>
                  <label htmlFor="unidadMedida" className="block text-gray-700 text-sm font-bold mb-2">Unidad de Medida</label>
                  <Field
                    as="select"
                    name="unidadMedida"
                    id="unidadMedida"
                    className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#ff4c4c]"
                  >
                    <option value="">Unidad de medida</option>
                    {unidadMedidaOpciones.map((u, i) => (
                      <option key={i} value={u}>
                        {u}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="unidadMedida"
                    component="p"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                {/* Valor Unidad Medida */}
                <div>
                  <label htmlFor="valorUnidadMedida" className="block text-gray-700 text-sm font-bold mb-2">Valor de la Unidad (ej: 1.5, 1/4)</label>
                  <Field
                    type="text"
                    name="valorUnidadMedida"
                    id="valorUnidadMedida"
                    placeholder="Valor de unidad (ej: 1.5, 1/4)"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4c4c]"
                  />
                  <ErrorMessage
                    name="valorUnidadMedida"
                    component="p"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                {/* Precio */}
                <div>
                  <label htmlFor="precio" className="block text-gray-700 text-sm font-bold mb-2">Precio del Producto</label>
                  <Field
                    type="number"
                    name="precio"
                    id="precio"
                    placeholder="Precio del producto"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4c4c]"
                  />
                  <ErrorMessage
                    name="precio"
                    component="p"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
              </div>

              {/* Columna Derecha (Descripción y Botón) */}
              <div className="flex-1 flex flex-col space-y-4">
                {/* Descripción */}
                <div>
                  <label htmlFor="descripcion" className="block text-gray-700 text-sm font-bold mb-2">Descripción</label>
                  <Field
                    as="textarea"
                    name="descripcion"
                    id="descripcion"
                    placeholder="Descripción detallada del producto..."
                    className="w-full p-3 border border-gray-300 rounded-lg resize-y min-h-[150px] focus:outline-none focus:ring-2 focus:ring-[#ff4c4c]"
                    rows={8}
                  />
                  <ErrorMessage
                    name="descripcion"
                    component="p"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                {/* Botón */}
                <div className="mt-auto pt-4">
                  <button
                    type="submit"
                    className="w-full bg-[#C46C3C] hover:bg-amber-800 text-white font-bold py-3 rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#C46C3C] focus:ring-offset-2"
                  >
                    Crear Producto
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CrearProducto;