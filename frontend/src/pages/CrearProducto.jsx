import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

function CrearProducto() {
  const [errors, setErrors] = useState({});

  const initialValues = {
    nombre: "",
    descripcion: "",
    estado: "activo",
    idCategoria: "",
  };

  const categorias = [
    { id: 1, nombre: "Categoría 1" },
    { id: 2, nombre: "Categoría 2" },
    { id: 3, nombre: "Categoría 3" },
  ];

  const validationSchema = Yup.object({
    nombre: Yup.string().required("El nombre es obligatorio"),
    descripcion: Yup.string().required("La descripción es obligatoria"),
    estado: Yup.string().required("El estado es obligatorio"),
    idCategoria: Yup.string().required("La categoría es obligatoria"),
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

  const handleFieldChange = (fieldName, value, formikHandleChange) => {
    clearFieldError(fieldName);
    formikHandleChange({
      target: {
        name: fieldName,
        value,
      },
    });
  };

  const handleSubmit = (values, { resetForm }) => {
    alert("Producto creado exitosamente:\n" + JSON.stringify(values, null, 2));
    resetForm();
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        validate={() => ({})}
      >
        {({ setFieldValue, handleChange, values }) => (
          <Form className="w-full max-w-md font-medium">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl shadow-2xl">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-black mb-2">Crear Producto</h1>
                <div className="w-16 h-1 bg-gradient-to-r from-amber-600 to-amber-800 mx-auto rounded-full"></div>
              </div>

              <div className="space-y-6">
                {/* Nombre */}
                <div className="w-full">
                  <input
                    type="text"
                    name="nombre"
                    value={values.nombre}
                    placeholder="Nombre del producto"
                    className="w-full font-medium rounded-md p-3 outline-none border border-gray-400"
                    onChange={(e) => handleFieldChange("nombre", e.target.value, handleChange)}
                  />
                  {errors.nombre && (
                    <p className="text-red-600 text-sm mt-1">{errors.nombre}</p>
                  )}
                </div>

                {/* Descripción */}
                <div className="w-full">
                  <textarea
                    name="descripcion"
                    value={values.descripcion}
                    placeholder="Escribe la descripción del producto..."
                    className="w-full min-h-[3rem] max-h-[12rem] font-medium rounded-md p-4 border border-gray-400 focus:border-amber-600 focus:outline-none resize-none overflow-hidden transition-all duration-200"
                    rows={2}
                    onChange={(e) => {
                      handleFieldChange("descripcion", e.target.value, handleChange);
                      const textarea = e.target;
                      textarea.style.height = "auto";
                      textarea.style.height = `${Math.min(textarea.scrollHeight, 192)}px`;
                    }}
                  />
                  {errors.descripcion && (
                    <p className="text-red-600 text-sm mt-1">{errors.descripcion}</p>
                  )}
                </div>

                {/* Categoría */}
                <div className="w-full">
                  <select
                    name="idCategoria"
                    value={values.idCategoria}
                    className="w-full border border-gray-400 rounded-lg px-4 py-3 focus:border-amber-600 cursor-pointer"
                    onChange={(e) => handleFieldChange("idCategoria", e.target.value, handleChange)}
                  >
                    <option value="">Selecciona una categoría</option>
                    {categorias.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.nombre}
                      </option>
                    ))}
                  </select>
                  {errors.idCategoria && (
                    <p className="text-red-600 text-sm mt-1">{errors.idCategoria}</p>
                  )}
                </div>

                {/* Estado */}
                <div className="w-full">
                  <select
                    name="estado"
                    value={values.estado}
                    className="w-full border border-gray-400 rounded-lg px-4 py-3 focus:border-amber-600 cursor-pointer"
                    onChange={(e) => handleFieldChange("estado", e.target.value, handleChange)}
                  >
                    <option value="">Selecciona el estado</option>
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                  </select>
                  {errors.estado && (
                    <p className="text-red-600 text-sm mt-1">{errors.estado}</p>
                  )}
                </div>

                {/* Botón */}
                <div className="w-full pt-4">
                  <button
                    type="submit"
                    className="w-full py-4 text-lg font-semibold rounded-xl bg-gray-800 text-white hover:bg-gray-700 transition-all duration-300"
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
