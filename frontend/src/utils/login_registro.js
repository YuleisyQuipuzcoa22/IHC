import usuariosIniciales from "../data/usuarios.json";
// Obtener todos los usuarios
export const getUsuarios = () => {
  return JSON.parse(localStorage.getItem("usuarios")) || [];
};

// Guardar la lista de usuarios
export const setUsuarios = (usuarios) => {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
};

// Verificar si ya existe un usuario por correo o DNI
export const usuarioExiste = (correo, DNI) => {
  const usuarios = getUsuarios();
  return usuarios.some((u) => u.correo === correo || u.DNI === DNI);
};


export const buscarUsuarioPor = (filtros) => {
  const usuarios = getUsuarios();
  return usuarios.find((u) =>
    Object.entries(filtros).every(([clave, valor]) => u[clave] === valor)
  );
};


// Registrar un nuevo usuario
export const registrarUsuario = (nuevoUsuario) => {
  const usuarios = getUsuarios();
  usuarios.push({ ...nuevoUsuario, tipo_usuario: "cliente" });
  setUsuarios(usuarios);
};

// Cargar los usuarios desde el archivo JSON (solo si no existen aún)
export const cargarUsuariosIniciales = () => {
  const usuariosLocal = localStorage.getItem("usuarios");

  // Solo carga los usuarios iniciales si NO hay nada en localStorage
  if (!usuariosLocal) {
    console.log("Cargando usuarios iniciales desde JSON...");
    setUsuarios(usuariosIniciales);
  } else {
    console.log("Usuarios ya existen en localStorage.");
  }
};


