import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

// Validaciones con Yup
const validationSchema = Yup.object({
  DNI: Yup.string().required("El DNI es obligatorio"),
  nombre: Yup.string().required("El Nombre es obligatorio"),
  apellido: Yup.string().required("El Apellido es obligatorio"),
  direccion: Yup.string().required("La Dirección es obligatoria"),
  correo: Yup.string().email("Correo inválido").required("El correo es obligatorio"),
  contraseña: Yup.string().required("La contraseña es obligatoria"),
});

function RegistrarCliente() {
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState("");

  // Cargar usuarios iniciales desde usuarios.json solo si localStorage está vacío
  useEffect(() => {
    const usuariosLocal = localStorage.getItem("usuarios");
    if (!usuariosLocal) {
      fetch("/Data/usuarios.json")
        .then((res) => res.json())
        .then((data) => localStorage.setItem("usuarios", JSON.stringify(data)));
    }
  }, []);

  const initialValues = {
    DNI: "",
    nombre: "",
    apellido: "",
    direccion: "",
    correo: "",
    contraseña: "",
  };

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    setMensaje("");
    // Obtener usuarios existentes de localStorage o array vacío
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    // Validar si ya existe un usuario con el mismo correo o DNI
    const existe = usuarios.some(
      (u) => u.correo === values.correo || u.DNI === values.DNI
    );
    if (existe) {
      setMensaje("Ya existe un usuario registrado con este correo o DNI.");
      setSubmitting(false);
      return;
    }
    // Agregar nuevo usuario
    usuarios.push({ ...values, tipo_usuario: "cliente" });
    // Guardar en localStorage
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    setStatus({ success: "¡Registro exitoso! Ahora puedes iniciar sesión." });
    setTimeout(() => navigate("/login"), 1500);
    setSubmitting(false);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#E8464D]">
      <div className="bg-white p-10 rounded-4xl shadow-lg w-96">
        <h2 className="text-2xl text-center text-gray-800 mb-6">Registro de Cliente</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, isSubmitting, setFieldValue, status, values, errors, touched }) => (
            <Form className="flex flex-col gap-2">
              <Input
                label="DNI"
                name="DNI"
                value={values.DNI}
                onChange={handleChange}
                onBlur={(e) => handleBlurDNI(e, setFieldValue, values)}
                className="text-[#57595c] font-medium rounded-md p-3"
                style={{ backgroundColor: "#fff", borderRadius: "10px", fontWeight: 500 }}
              />
              {touched.DNI && errors.DNI && <div className="text-red-600 text-xs">{errors.DNI}</div>}

              <Input
                label="Nombre"
                name="nombre"
                value={values.nombre}
                onChange={handleChange}
                className="text-[#57595c] font-medium rounded-md p-3"
                style={{ backgroundColor: "#fff", borderRadius: "10px", fontWeight: 500 }}
              />
              {touched.nombre && errors.nombre && <div className="text-red-600 text-xs">{errors.nombre}</div>}

              <Input
                label="Apellido"
                name="apellido"
                value={values.apellido}
                onChange={handleChange}
                className="text-[#57595c] font-medium rounded-md p-3"
                style={{ backgroundColor: "#fff", borderRadius: "10px", fontWeight: 500 }}
              />
              {touched.apellido && errors.apellido && <div className="text-red-600 text-xs">{errors.apellido}</div>}

              <Input
                label="Dirección"
                name="direccion"
                value={values.direccion}
                onChange={handleChange}
                className="text-[#57595c] font-medium rounded-md p-3"
                style={{ backgroundColor: "#fff", borderRadius: "10px", fontWeight: 500 }}
              />
              {touched.direccion && errors.direccion && <div className="text-red-600 text-xs">{errors.direccion}</div>}

              <Input
                label="Correo electrónico"
                name="correo"
                type="email"
                value={values.correo}
                onChange={handleChange}
                className="text-[#57595c] font-medium rounded-md p-3"
                style={{ backgroundColor: "#fff", borderRadius: "10px", fontWeight: 500 }}
              />
              {touched.correo && errors.correo && <div className="text-red-600 text-xs">{errors.correo}</div>}

              <Input
                label="Contraseña"
                name="contraseña"
                type="password"
                value={values.contraseña}
                onChange={handleChange}
                className="text-[#57595c] font-medium rounded-md p-3"
                style={{ backgroundColor: "#fff", borderRadius: "10px", fontWeight: 500 }}
              />
              {touched.contraseña && errors.contraseña && <div className="text-red-600 text-xs">{errors.contraseña}</div>}

              <Button
                type="submit"
                label={isSubmitting ? "Registrando..." : "Registrarse"}
                color="#2c2c2c"
                textColor="#fff"
                disabled={!!mensaje && mensaje.includes("Ya existe")}
              />

              {mensaje && (
                <div className={`text-center ${mensaje.includes("Ya existe") ? "text-red-600" : "text-green-600"}`}>
                  {mensaje}
                </div>
              )}
              {status?.success && <div className="text-green-600 text-center">{status.success}</div>}
              {status?.error && <div className="text-red-600 text-center">{status.error}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default RegistrarCliente;
