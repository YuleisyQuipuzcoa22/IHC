import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,

  setUser: (userData) => set({ user: userData }),

  login: async ({ correo, contraseña }) => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = usuarios.find(
      (u) => u.correo === correo && u.contraseña === contraseña
    );
    if (!usuario) {
      alert("Correo o contraseña incorrectos.");
      return null;
    }
    set({ user: usuario });
    localStorage.setItem("user", JSON.stringify(usuario));
    return usuario;
  },

  logout: async () => {
    set({ user: null });
    localStorage.removeItem("user");
  },
}));
