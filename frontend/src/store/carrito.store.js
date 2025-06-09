import { create } from "zustand";

export const useCarritoStore = create((set, get) => ({
    productos: [],

    // Inicializa productos
    setProductos: (nuevosProductos) => set({ productos: nuevosProductos }),


    // Agregar productos desde el catálogo 
    agregarProducto: (producto) => {
        const productosActuales = get().productos;
        const existente = productosActuales.find((p) => p.id === producto.id);
        if (existente) {
            set({
                productos: productosActuales.map((p) =>
                    p.id === producto.id
                        ? { ...p, cantidad: p.cantidad + 1 }
                        : p
                ),
            });
        } else {
            set({ productos: [...productosActuales, { ...producto, cantidad: 1 }] });
        }
    },
    eliminarProducto: (id) =>
        set({ productos: get().productos.filter((p) => p.id !== id) }),

    // Actualiza la cantidad de un producto
    actualizarCantidad: (id, nuevaCantidad) =>
        set({
            productos: get().productos.map((p) =>
                p.id === id ? { ...p, cantidad: nuevaCantidad } : p
            ),
        }),
    // Devuelve la cantidad total de productos en el carrito
    getTotalProductos: () =>
        get().productos.reduce((acc, prod) => acc + prod.cantidad, 0),


    limpiarCarrito: () => set({ productos: [] }),
}));
