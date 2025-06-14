import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import registro from "../assets/imagenregistro.jpg";

import {
  cargarUsuariosIniciales,
  usuarioExiste,
  registrarUsuario,
  buscarUsuarioPor,
} from "../utils/login_registro";

// Validaciones con Yup
const validationSchema = Yup.object({
  DNI: Yup.string().required("El DNI es obligatorio"),
  nombre: Yup.string().required("El Nombre es obligatorio"),
  apellido: Yup.string().required("El Apellido es obligatorio"),
  direccion: Yup.string().required("La Dirección es obligatoria"),
  correo: Yup.string()
    .email("Correo inválido")
    .required("El correo es obligatorio"),
  contraseña: Yup.string().required("La contraseña es obligatoria"),
});

function RegistrarCliente() {
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState("");

  // Cargar usuarios iniciales desde usuarios.json solo si localStorage está vacío
  useEffect(() => {
    cargarUsuariosIniciales();
  }, []);

  const initialValues = {
    DNI: "",
    nombre: "",
    apellido: "",
    direccion: "",
    telefono: "",
    correo: "",
    contraseña: "",
  };

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    setMensaje("");

    // Validar si ya existe un usuario con el mismo correo o DNI
    const existe = usuarioExiste(values.correo, values.DNI);

    if (existe) {
      setMensaje("Ya existe un usuario registrado con este correo o DNI.");
      setSubmitting(false);
      return;
    }
    registrarUsuario(values);
    setStatus({ success: "¡Registro exitoso! Ahora puedes iniciar sesión." });

    setTimeout(() => navigate("/login"), 1500);
    setSubmitting(false);
  };
  const handleBlurDNI = (e, setFieldValue, values) => {
    const dniIngresado = e.target.value;
    const usuarioExistente = buscarUsuarioPor( {DNI:dniIngresado});
    console.log("DNI ingresado:", dniIngresado);
    console.log("Usuario encontrado:", usuarioExistente);

    if (usuarioExistente) {
      setFieldValue("nombre", usuarioExistente.nombre);
      setFieldValue("apellido", usuarioExistente.apellido);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#c46c3c]">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full m-5">
        <div className="md:w-5/7 w-full h-64 md:h-auto">
          <img
            src={registro}
            alt="imagenregistro"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="md:w-1/2 w-full p-8">
          <p className="text-center"> ¡Únete a la dulzura!</p>
          <h2 className="lilita-text text-2xl text-center text-gray-800 mb-6">
            Regístrate aquí
          </h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              handleChange,
              isSubmitting,
              setFieldValue,
              status,
              values,
              errors,
              touched,
            }) => (
              <Form className="flex flex-col gap-2">
                <Input
                  label="DNI"
                  name="DNI"
                  value={values.DNI}
                  onChange={handleChange}
                  onBlur={(e) => handleBlurDNI(e, setFieldValue, values)}
                  className="placeholder:text-[#a3a3a3] text-[#000000] font-normal rounded-md p-3"
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                  }}
                />
                {touched.DNI && errors.DNI && (
                  <div className="text-red-600 text-xs">{errors.DNI}</div>
                )}

                <Input
                  label="Nombre"
                  name="nombre"
                  value={values.nombre}
                  onChange={handleChange}
                  className="placeholder:text-[#a3a3a3] text-[#000000] font-normal rounded-md p-3"
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                  }}
                />
                {touched.nombre && errors.nombre && (
                  <div className="text-red-600 text-xs">{errors.nombre}</div>
                )}

                <Input
                  label="Apellido"
                  name="apellido"
                  value={values.apellido}
                  onChange={handleChange}
                  className="placeholder:text-[#a3a3a3] text-[#000000] font-normal rounded-md p-3"
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                  }}
                />
                {touched.apellido && errors.apellido && (
                  <div className="text-red-600 text-xs">{errors.apellido}</div>
                )}

                <Input
                  label="Dirección"
                  name="direccion"
                  value={values.direccion}
                  onChange={handleChange}
                  className="placeholder:text-[#a3a3a3] text-[#000000] font-normal rounded-md p-3"
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                  }}
                />
                {touched.direccion && errors.direccion && (
                  <div className="text-red-600 text-xs">{errors.direccion}</div>
                )}
                <Input
                  label="Teléfono"
                  name="telefono"
                  type="tel"
                  value={values.telefono}
                  onChange={(e) => {
                    const soloNumeros = e.target.value.replace(/\D/g, "");
                    handleChange({
                      target: { name: "telefono", value: soloNumeros },
                    });
                  }}
                  className="placeholder:text-[#a3a3a3] text-[#000000] font-normal rounded-md p-3"
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                  }}
                />
                {touched.telefono && errors.telefono && (
                  <div className="text-red-600 text-xs">{errors.telefono}</div>
                )}

                <Input
                  label="Correo electrónico"
                  name="correo"
                  type="email"
                  value={values.correo}
                  onChange={handleChange}
                  className="placeholder:text-[#a3a3a3] text-[#000000] font-normal rounded-md p-3"
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                  }}
                />
                {touched.correo && errors.correo && (
                  <div className="text-red-600 text-xs">{errors.correo}</div>
                )}

                <Input
                  label="Contraseña"
                  name="contraseña"
                  type="password"
                  value={values.contraseña}
                  onChange={handleChange}
                  className="placeholder:text-[#a3a3a3] text-[#000000] font-normal rounded-md p-3"
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                  }}
                />
                {touched.contraseña && errors.contraseña && (
                  <div className="text-red-600 text-xs">
                    {errors.contraseña}
                  </div>
                )}

                <Button
                  type="submit"
                  label={isSubmitting ? "Registrando..." : "Registrarse"}
                  color="#2c2c2c"
                  textColor="#fff"
                  hoverColor="#494949"
                  hoverTextColor="#FFFFFF"
                  disabled={!!mensaje && mensaje.includes("Ya existe")}
                  className="cursor-pointer"
                />
                <Button
                  type="button"
                  label="Iniciar Sesión"
                  onClick={() => navigate("/login")}
                  transparent={true}
                  noBorder={true}
                  textColor="#000000"
                  className="hover:underline cursor-pointer"
                />

                {mensaje && (
                  <div
                    className={`text-center ${
                      mensaje.includes("Ya existe")
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {mensaje}
                  </div>
                )}
                {status?.success && (
                  <div className="text-green-600 text-center">
                    {status.success}
                  </div>
                )}
                {status?.error && (
                  <div className="text-red-600 text-center">{status.error}</div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default RegistrarCliente;
