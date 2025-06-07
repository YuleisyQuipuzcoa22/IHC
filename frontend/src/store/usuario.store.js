import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,

  setUser: (userData) => set({ user: userData }),

  login: async (values) => {
    try {
      // Carga usuarios desde archivo JSON
      const response = await fetch("/Data/usuarios.json");
; 
      const usuarios = await response.json();

      // Busca el usuario
      const usuarioEncontrado = usuarios.find(
        (u) => u.correo === values.correo && u.contraseña === values.contraseña
      );

      if (usuarioEncontrado) {
        set({ user: usuarioEncontrado });
        localStorage.setItem("user", JSON.stringify(usuarioEncontrado));
        return usuarioEncontrado;
      } else {
        alert("Usuario o contraseña incorrectos (simulado)");
        return null;
      }
    } catch (error) {
      alert("Error al cargar usuarios");
      return null;
    }
  },

  logout: async () => {
    set({ user: null });
    localStorage.removeItem("user");
  },
}));
