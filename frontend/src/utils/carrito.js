// Obtener productos del carrito
export const obtenerCarrito = () => {
  return JSON.parse(localStorage.getItem("carrito")) || [];
};
// Agregar producto al carrito
export const agregarProducto = (producto, cantidad = 1) => {
  const carrito = obtenerCarrito();
  const index = carrito.findIndex((p) => p.id === producto.id);

  if (index !== -1) {
    carrito[index].cantidad += cantidad;
  } else {
    carrito.push({ ...producto, cantidad });
  }

  guardarCarrito(carrito);
};

// Guardar carrito actualizado
const guardarCarrito = (carrito) => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

// Eliminar producto
export const eliminarProducto = (id) => {
  const carrito = obtenerCarrito().filter((p) => p.id !== id);
  guardarCarrito(carrito);
};

// Actualizar cantidad
export const actualizarCantidad = (id, nuevaCantidad) => {
  const carrito = obtenerCarrito().map((p) =>
    p.id === id ? { ...p, cantidad: nuevaCantidad } : p
  );
  guardarCarrito(carrito);
};

// Total de productos
export const getTotalProductos = () => {
  return obtenerCarrito().reduce((acc, prod) => acc + prod.cantidad, 0);
};

// Limpiar carrito
export const limpiarCarrito = () => {
  localStorage.removeItem("carrito");
};
