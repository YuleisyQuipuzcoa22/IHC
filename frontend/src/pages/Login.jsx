import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import logo from "../assets/logodulcinelly.png";
import Button from "../components/Button";
import Input from "../components/Input";
import {
  buscarUsuarioPor,
  cargarUsuariosIniciales,
} from "../utils/login_registro";
import bienvenida from "../assets/bienvenida.jpg";

// Esquema de validación Yup
const validationSchema = Yup.object({
  correo: Yup.string()
    .email("Correo inválido")
    .required("El correo es obligatorio"),
  contraseña: Yup.string().required("La contraseña es obligatoria"),
});

function Login() {
  const navigate = useNavigate();
  const initialValues = {
    correo: "",
    contraseña: "",
  };

  useEffect(() => {
    cargarUsuariosIniciales();
  }, []);

  const handleSubmit = (values) => {
    const usuarioEncontrado = buscarUsuarioPor({
      correo: values.correo,
      contraseña: values.contraseña,
    });

    const usuarioCorreo = buscarUsuarioPor({ correo: values.correo });

    if (usuarioEncontrado) {
      localStorage.setItem(
        "usuarioLogueado",
        JSON.stringify(usuarioEncontrado)
      );
      // Si login es exitoso, navega según tipo_usuario
      switch (usuarioEncontrado.tipo_usuario) {
        case "admin":
          navigate("/admin");
          break;
        case "cliente":
          navigate("/");
          break;
        default:
          navigate("/login");
      }
    } else {
      if (usuarioCorreo) {
        alert("contraseña incorrecta");
      } else {
        alert("Usuario no encontrado");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E8464D]">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full m-5">
        <div className="md:w-5/7 w-full h-64 md:h-auto">
          <img
            src={bienvenida}
            alt="bienvenida"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="bg-white p-10 rounded-4xl shadow-lg md:w-1/2 w-full p-8">
          <h2 className="text-2xl text-center text-gray-800 mb-6">
            Iniciar Sesión
          </h2>
          <div className="flex flex-col items-center">
            <img src={logo} alt="Logo" className="h-20 w-auto" />
            <h2 className="text-[14px] text-center p-2 text-[#C85E5E]">
              Bienvenido a Dulcinelly
            </h2>
            <h2 className="text-[10px] text-center text-gray-700 p-3">
              Ingresa tu correo y contraseña para iniciar sesión
            </h2>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, values, errors, touched }) => (
              <Form className="flex flex-col gap-4">
                <Input
                  label="Correo electrónico"
                  name="correo"
                  type="email"
                  value={values.correo}
                  onChange={handleChange}
                  className="p-3 rounded-md border border-gray-300"
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
                  className="p-3 rounded-md border border-gray-300"
                />
                {touched.contraseña && errors.contraseña && (
                  <div className="text-red-600 text-xs">{errors.contraseña}</div>
                )}
                <Button
                  type="submit"
                  label="Iniciar Sesión"
                  color="#2c2c2c"
                  textColor="#FFFFFF"
                  hoverColor="#494949"
                  hoverTextColor="#FFFFFF"
                  className="cursor-pointer"
                />

                <Button
                  type="button"
                  label="Registrarse"
                  onClick={() => navigate("/registrarcliente")}
                  transparent={true}
                  noBorder={true}
                  textColor="#000000"
                  className="hover:underline cursor-pointer"
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
export default Login;
