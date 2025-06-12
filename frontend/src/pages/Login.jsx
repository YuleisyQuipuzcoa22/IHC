import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import logo from "../assets/logodulcinelly.png";
import Button from "../components/Button";
import Input from "../components/Input";
import { useUserStore } from "../store/usuario.store";

function Login() {
  const navigate = useNavigate();
  const { login } = useUserStore();

  const initialValues = {
    correo: "",
    contraseña: "",
  };

  const handleSubmit = async (values) => {
    const result = await login(values);
    if (result) {
      // Si login es exitoso, navega según tipo_usuario
      switch (result.tipo_usuario) {
        case "admin":
          navigate("/admin");
          break;
        case "asistente":
          navigate("/asistente");
          break;
        case "cliente":
          navigate("/");
          break;
        default:
          navigate("/login");
      }
    }
    
  };

  return (
    <div
      className="h-screen flex items-center justify-center font-medium bg-[#E8464D]"
      
    >
      <div className="bg-white p-10 rounded-4xl shadow-lg w-96">
        <h2 className="text-2xl text-center text-gray-800 mb-6">
          Iniciar Sesión
        </h2>
        <div className="flex flex-col items-center">
          <img src={logo} alt="Logo" className="h-20 w-auto" />
          <h2
            className="text-[14px] text-center p-2 text-[#C85E5E]"
            
          >
            Bienvenido a Dulcinelly
          </h2>
          <h2 className="text-[10px] text-center text-gray-700 p-3">
            Ingresa tu correo y contraseña para iniciar sesión
          </h2>
        </div>

        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ handleChange, values }) => (
            <Form className="flex flex-col gap-2">
              <Input
                type="text"
                label="Correo electrónico"
                name="correo"
                onChange={handleChange}
                value={values.correo}
                className="text-[#57595c] font-medium rounded-md p-3 outline-none bg-[#fff] rounded-[10px]"
                
              />
              <Input
                type="password"
                label="Contraseña"
                name="contraseña"
                onChange={handleChange}
                value={values.contraseña}
                className="text-[#57595c] font-medium rounded-md p-3 outline-none bg-[#fff] rounded-[10px]"                
              />

              <Button
                type="submit"
                label="Iniciar Sesión"
                color="#2c2c2c"
                textColor="#FFFFFF"
                hoverColor="#494949"
                hoverTextColor="#FFFFFF"
              />

              <Button
                type="button"
                label="Registrarse"
                onClick={() => navigate("/registrarcliente")}
                transparent={true}
                noBorder={true}
                textColor="#000000"
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;
