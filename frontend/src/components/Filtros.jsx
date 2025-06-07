import React, { useEffect, useState } from "react";

function Filtros() {
  // Datos locales de ejemplo (antes venían de store)
  const categorias = [
    { nombre: "Electrónica" },
    { nombre: "Ropa" },
    { nombre: "Hogar" },
  ];

  const tipo_presentacion = [
    { nombre: "Caja" },
    { nombre: "Bolsa" },
    { nombre: "Unidad" },
  ];

  const unidad_medida = [
    { nombre: "Kilogramo" },
    { nombre: "Litro" },
    { nombre: "Metro" },
  ];

  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  // Estados separados para cada filtro
  const [categoria, setCategoria] = useState('');
  const [presentacion, setPresentacion] = useState('');
  const [medida, setMedida] = useState('');

  // Detecta cambios en el tamaño de la pantalla
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Funciones para manejar cambios individuales
  const handleCategoriaChange = (valor) => setCategoria(valor);
  const handlePresentacionChange = (valor) => setPresentacion(valor);
  const handleMedidaChange = (valor) => setMedida(valor);

  // Funciones para limpiar filtros individuales
  const limpiarCategoria = () => setCategoria('');
  const limpiarPresentacion = () => setPresentacion('');
  const limpiarMedida = () => setMedida('');

  // Función para limpiar todos los filtros
  const limpiarTodosFiltros = () => {
    setCategoria('');
    setPresentacion('');
    setMedida('');
  };

  const renderFiltro = (label, opciones, name, valorActual, handlerChange, limpiarFiltro) => {
    return (
      <div className={`${isLargeScreen ? 'mb-6' : 'mb-3'}`}>
        {isLargeScreen ? (
          <div className="flex flex-col gap-1">
            <div className="w-full h-1 bg-gradient-to-r from-amber-600 to-amber-800 mx-auto rounded-full"></div>
            <div className="flex flex-row items-center gap-4">
              <h3 className="text-lg font-semibold mb-2">{label}</h3>
              {valorActual && (
                <button
                  onClick={limpiarFiltro}
                  className="text-sm text-red-500 hover:text-red-700 mb-2"
                >
                  Limpiar
                </button>
              )}
            </div>
            {opciones.map((op, idx) => (
              <label key={idx} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                <input 
                  type="radio" 
                  name={name} 
                  value={op.nombre}
                  checked={valorActual === op.nombre}
                  onChange={(e) => handlerChange(e.target.value)}
                  className="w-4 h-4 text-amber-600 focus:ring-amber-500"
                />
                <span className="text-gray-700">{op.nombre}</span>
              </label>
            ))}
          </div>
        ) : (
          <div className="w-full">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-6 bg-gradient-to-b from-amber-600 to-amber-800 rounded-full flex-shrink-0"></div>
              <label className="text-sm font-medium text-gray-700 flex-1">{label}:</label>
              {valorActual && (
                <button
                  onClick={limpiarFiltro}
                  className="text-xs text-red-500 hover:text-red-700 px-2 py-1 rounded-full bg-red-50 hover:bg-red-100 transition-colors"
                >
                  ✕
                </button>
              )}
            </div>
            <select 
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 shadow-sm"
              value={valorActual}
              onChange={(e) => handlerChange(e.target.value)}
            >
              <option value="" className="text-gray-500">Seleccionar {label.toLowerCase()}</option>
              {opciones.map((op, idx) => (
                <option key={idx} value={op.nombre} className="text-gray-800">
                  {op.nombre}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    );
  };

  const filtrosActivos = [categoria, presentacion, medida].filter(Boolean);

  return (
    <aside className={`
      w-full bg-white rounded-xl shadow-lg border border-gray-100 p-4
      ${isLargeScreen 
        ? 'lg:w-min lg:h-max flex flex-col gap-4' 
        : 'flex flex-col space-y-4'
      }
    `}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
          Filtros
        </h2>
      </div>
      
      <div className={`${isLargeScreen ? 'space-y-6' : 'grid grid-cols-1 gap-4'}`}>
        {renderFiltro("Categorías", categorias, "categoria", categoria, handleCategoriaChange, limpiarCategoria)}
        {renderFiltro("Presentación", tipo_presentacion, "presentacion", presentacion, handlePresentacionChange, limpiarPresentacion)}
        {renderFiltro("Medida", unidad_medida, "medida", medida, handleMedidaChange, limpiarMedida)}
      </div>

      {filtrosActivos.length > 0 && !isLargeScreen && (
        <div className="mt-4 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border">
          <h4 className="text-sm font-semibold mb-2 text-gray-700 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
            Filtros aplicados:
          </h4>
          <div className="flex flex-wrap gap-2">
            {categoria && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full border border-blue-200">
                <span className="font-medium">Cat:</span> {categoria}
                <button
                  onClick={limpiarCategoria}
                  className="ml-1 hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                  title="Remover filtro"
                >
                  ×
                </button>
              </span>
            )}
            {presentacion && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full border border-green-200">
                <span className="font-medium">Pres:</span> {presentacion}
                <button
                  onClick={limpiarPresentacion}
                  className="ml-1 hover:bg-green-200 rounded-full p-0.5 transition-colors"
                  title="Remover filtro"
                >
                  ×
                </button>
              </span>
            )}
            {medida && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full border border-purple-200">
                <span className="font-medium">Med:</span> {medida}
                <button
                  onClick={limpiarMedida}
                  className="ml-1 hover:bg-purple-200 rounded-full p-0.5 transition-colors"
                  title="Remover filtro"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}

      {filtrosActivos.length > 0 && isLargeScreen && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="text-sm font-semibold mb-2 text-gray-700">Filtros activos:</h4>
          <div className="space-y-1">
            {categoria && <div className="text-xs text-blue-700 bg-blue-50 px-2 py-1 rounded">Categoría: {categoria}</div>}
            {presentacion && <div className="text-xs text-green-700 bg-green-50 px-2 py-1 rounded">Presentación: {presentacion}</div>}
            {medida && <div className="text-xs text-purple-700 bg-purple-50 px-2 py-1 rounded">Medida: {medida}</div>}
          </div>
        </div>
      )}
    </aside>
  );
}

export default Filtros;
