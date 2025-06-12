import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FaRegTrashCan } from "react-icons/fa6";

function CrearProducto() {
  const [previewImg, setPreviewImg] = useState(null);
  const [fileName, setFileName] = useState("Ningún archivo elegido");


  const categorias = ["Pasteles", "Bebidas", "Bocaditos"];

  const tipoPresentacionOpciones = ["Unidad", "Porción"];
  const unidadMedidaOpciones = ["Kilogramo", "Litro"];

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
    valorUnidadMedida: Yup.number()
      .required("Este campo es obligatorio")
      .positive(),
    precio: Yup.number().required("El precio es obligatorio").positive(),
    imagen: Yup.mixed().required("La imagen es obligatoria"),
  });

  const handleSubmit = (values, { resetForm, setErrors }) => {
    const productosGuardados = JSON.parse(
      localStorage.getItem("productos") || "[]"
    );

    // Verificar duplicados por título
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
  };


  const handleImageChange = (e, setFieldValue) => {
    const file = e.currentTarget.files[0];
    if (file) {
      setFileName(file.name)
      const reader = new FileReader();
      reader.onloadend = () => {
        setFieldValue("imagen", reader.result);
        setPreviewImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, setFieldValue, errors, touched }) => (
          <Form className="bg-white rounded-xl shadow-xl p-8 w-full max-w-xl space-y-6">
            <h1 className="text-2xl font-bold text-center">Crear Producto</h1>

            {/* Imagen */}
            <div>
              <label className="bg-[#ff4c4c] hover:bg-[#E8464D] text-white py-2 px-4 rounded cursor-pointer">
                Seleccionar archivo
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, setFieldValue)}
                  className="hidden"
                />
              </label>
              <span className="pl-5 text-sm text-gray-700">{fileName}</span>
              {previewImg && (
                <>
                  <div className="flex items-center gap-5 mt-2">
                    <img
                      src={previewImg}
                      alt="preview"
                      className="w-32 h-32 mt-2 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewImg(null);
                        setFieldValue("imagen", null);
                      }}
                      className="flex group hover:bg-red-500 rounded-full p-2 cursor-pointer"
                    >
                      <FaRegTrashCan className="group-hover:text-white text-[20px]" />
                    </button>
                  </div>
                </>
              )}
              {errors.imagen && touched.imagen && (
                <p className="text-red-600 text-sm">{errors.imagen}</p>
              )}
            </div>

            {/* Título */}
            <div>
              <input
                name="titulo"
                placeholder="Nombre del producto"
                className="w-full p-3 border rounded"
                value={values.titulo}
                onChange={handleChange}
              />
              {errors.titulo && touched.titulo && (
                <p className="text-red-600 text-sm">{errors.titulo}</p>
              )}
            </div>

            {/* Descripción */}
            <div>
              <textarea
                name="descripcion"
                placeholder="Descripción..."
                className="w-full p-3 border rounded resize-none"
                rows={3}
                value={values.descripcion}
                onChange={handleChange}
              />
              {errors.descripcion && touched.descripcion && (
                <p className="text-red-600 text-sm">{errors.descripcion}</p>
              )}
            </div>

            {/* Categoría */}
            <div>
              <select
                name="categoria"
                className="w-full p-3 border rounded"
                value={values.categoria}
                onChange={handleChange}
              >
                <option value="">Selecciona categoría</option>
                {categorias.map((c, i) => (
                  <option key={i} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {errors.categoria && touched.categoria && (
                <p className="text-red-600 text-sm">{errors.categoria}</p>
              )}
            </div>

            {/* Tipo Presentación */}
            <div>
              <select
                name="tipoPresentacion"
                className="w-full p-3 border rounded"
                value={values.tipoPresentacion}
                onChange={handleChange}
              >
                <option value="">Selecciona presentación</option>
                {tipoPresentacionOpciones.map((t, i) => (
                  <option key={i} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              {errors.tipoPresentacion && touched.tipoPresentacion && (
                <p className="text-red-600 text-sm">
                  {errors.tipoPresentacion}
                </p>
              )}
            </div>

            {/* Unidad Medida */}
            <div>
              <select
                name="unidadMedida"
                className="w-full p-3 border rounded"
                value={values.unidadMedida}
                onChange={handleChange}
              >
                <option value="">Unidad de medida</option>
                {unidadMedidaOpciones.map((u, i) => (
                  <option key={i} value={u}>
                    {u}
                  </option>
                ))}
              </select>
              {errors.unidadMedida && touched.unidadMedida && (
                <p className="text-red-600 text-sm">{errors.unidadMedida}</p>
              )}
            </div>

            {/* Valor Unidad Medida */}
            <div>
              <input
                type="number"
                name="valorUnidadMedida"
                placeholder="Valor de unidad (ej: 1.5)"
                className="w-full p-3 border rounded"
                value={values.valorUnidadMedida}
                onChange={handleChange}
              />
              {errors.valorUnidadMedida && touched.valorUnidadMedida && (
                <p className="text-red-600 text-sm">
                  {errors.valorUnidadMedida}
                </p>
              )}
            </div>

            {/* Precio */}
            <div>
              <input
                type="number"
                name="precio"
                placeholder="Precio del producto"
                className="w-full p-3 border rounded"
                value={values.precio}
                onChange={handleChange}
              />
              {errors.precio && touched.precio && (
                <p className="text-red-600 text-sm">{errors.precio}</p>
              )}
            </div>

            {/* Botón */}
            <div>
              <button
                type="submit"
                className="!text-white w-full bg-[#C46C3C] hover:bg-amber-800  font-bold py-3 rounded transition-all"
                
              >
                Crear Producto
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CrearProducto;
