import { create } from "zustand";
import usuarios from "../data/usuarios.json";

export const useUserStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,

  setUser: (userData) => set({ user: userData }),

  login: async (values) => {
    try {   
    
      // Busca el usuario
      const usuarioEncontrado = usuarios.find(
        (u) => u.correo === values.correo && u.contraseña === values.contraseña
      );

      if (usuarioEncontrado) {
        set({ user: usuarioEncontrado });
        localStorage.setItem("user", JSON.stringify(usuarioEncontrado));
        return usuarioEncontrado;
      } else {
        alert("Usuario o contraseña incorrectos");
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
