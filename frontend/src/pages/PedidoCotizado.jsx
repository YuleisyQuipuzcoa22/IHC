import React, { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Button from "../components/Button";
import Input from "../components/Input";
import ErrorIcon from "../components/ErrorIcon";

function PedidoCotizado() {
  const [imagenPreview, setImagenPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const initialValues = {
    cotizacion: { 
      descripcion: "", 
      imagen: null 
    },
    pedido: {
      fecha: "",
    },
  };

  const validationSchema = Yup.object({
    cotizacion: Yup.object({
      descripcion: Yup.string().required("La descripción es obligatoria"),
      imagen: Yup.mixed().required("La imagen es obligatoria"),
    }),
    pedido: Yup.object({
      fecha: Yup.string().required("La fecha de entrega es obligatoria"),
    }),
  });

  const clearFieldError = (fieldName) => {
    if (errors[fieldName]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const handleFieldChange = (fieldPath, value, setFieldValue) => {
    const fieldName = fieldPath.split('.').pop();
    clearFieldError(fieldName);
    setFieldValue(fieldPath, value);
  };

  const handleSubmit = (values, { resetForm }) => {
    // Aquí solo mostramos los valores, sin enviar a backend
    console.log("Valores del formulario:", values);
    alert("Formulario enviado con éxito (simulación).");
    resetForm();
    setImagenPreview(null);
    setErrors({});

    // Limpiar input de archivo
    const fileInput = document.querySelector('input[type="file"][name="cotizacion.imagen"]');
    if (fileInput) {
      fileInput.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ setFieldValue, values }) => (
          <Form className="w-full max-w-md font-medium">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl shadow-2xl">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-black mb-2">
                  Realizar pedido cotizado
                </h1>
                <div className="w-16 h-1 bg-gradient-to-r from-amber-600 to-amber-800 mx-auto rounded-full"></div>
              </div>

              <div className="space-y-6">
                {/* Fecha */}
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha de entrega
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <Input
                        type="date"
                        name="pedido.fecha"
                        value={values.pedido.fecha}
                        className="w-full font-medium rounded-md p-3 outline-none border-gray-400"
                        onChange={(e) =>
                          handleFieldChange(
                            "pedido.fecha",
                            e.target.value,
                            setFieldValue
                          )
                        }
                      />
                    </div>
                    <ErrorIcon errors={errors} field="fecha" />
                  </div>
                </div>

                {/* Descripción */}
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción del producto
                  </label>
                  <div className="flex items-start gap-2">
                    <div className="flex-1">
                      <textarea
                        name="cotizacion.descripcion"
                        value={values.cotizacion.descripcion}
                        placeholder="Escribe la descripción del producto..."
                        className="w-full min-h-[3rem] max-h-[12rem] font-medium rounded-md p-4 border border-gray-400 focus:border-amber-600 focus:outline-none resize-none overflow-hidden transition-all duration-200"
                        rows={2}
                        onChange={(e) => {
                          handleFieldChange(
                            "cotizacion.descripcion",
                            e.target.value,
                            setFieldValue
                          );
                          const textarea = e.target;
                          textarea.style.height = "auto";
                          textarea.style.height = `${Math.min(
                            textarea.scrollHeight,
                            192
                          )}px`;
                        }}
                      />
                    </div>
                    <ErrorIcon errors={errors} field="descripcion" />
                  </div>
                </div>

                {/* Imagen */}
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seleccionar imagen de referencia
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <Input
                        type="file"
                        name="cotizacion.imagen"
                        onChange={(event) => {
                          const file = event.currentTarget.files[0];
                          clearFieldError("imagen");
                          setFieldValue("cotizacion.imagen", file);
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setImagenPreview(reader.result);
                            };
                            reader.readAsDataURL(file);
                          } else {
                            setImagenPreview(null);
                          }
                        }}
                        className="w-full border border-gray-400 text-black rounded-lg px-4 py-3 focus:border-amber-700 focus:bg-white/10 transition-all duration-300 file:bg-amber-900 file:text-white file:border-0 file:rounded-lg file:px-4 file:py-1 file:mr-4 file:cursor-pointer hover:file:bg-amber-700"
                      />
                    </div>
                    <ErrorIcon errors={errors} field="imagen" />
                  </div>
                </div>

                {/* Vista previa */}
                {imagenPreview && (
                  <div className="w-full border border-gray-400 rounded-lg p-4">
                    <p className="text-black text-sm mb-3 font-medium">
                      Vista previa:
                    </p>
                    <div className="flex justify-center">
                      <img
                        src={imagenPreview}
                        alt="Vista previa"
                        className="max-w-full h-32 object-cover rounded-lg border-2 border-gray-400 shadow-lg"
                      />
                    </div>
                  </div>
                )}

                {/* Botón */}
                <div className="w-full pt-4">
                  <Button
                    type="submit"
                    label="Crear cotización"
                    color="#2c2c2c"
                    textColor="#FFFFFF"
                    hoverColor="#494949"
                    hoverTextColor="#FFFFFF"
                    className="w-full py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg"
                  />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default PedidoCotizado;
