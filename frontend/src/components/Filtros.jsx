import React, { useEffect, useState } from "react";

function Filtros({
  categoria,
  setCategoria,
  tipoPresentacion,
  setTipoPresentacion,
  unidadMedida,
  setUnidadMedida,
  categorias = [],
  tiposPresentacion = [],
  unidadesMedida = [],
}) {
  const categoriasOpciones = categorias.map((nombre) => ({ nombre }));
  const tiposPresentacionOpciones = tiposPresentacion.map((nombre) => ({
    nombre,
  }));
  const unidadesMedidaOpciones = unidadesMedida.map((nombre) => ({ nombre }));
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCategoriaChange = (valor) => setCategoria(valor);
  const handleTipoPresentacionChange = (valor) => setTipoPresentacion(valor);
  const handleUnidadMedidaChange = (valor) => setUnidadMedida(valor);

  const limpiarCategoria = () => setCategoria("");
  const limpiarTipoPresentacion = () => setTipoPresentacion("");
  const limpiarUnidadMedida = () => setUnidadMedida("");

  const limpiarTodosFiltros = () => {
    setCategoria("");
    setTipoPresentacion("");
    setUnidadMedida("");
  };
  const renderFiltro = (
    label,
    opciones,
    name,
    valorActual,
    handlerChange,
    limpiarFiltro
  ) => {
    return (
      <div className={`${isLargeScreen ? "mb-6" : "mb-3"}`}>
        {isLargeScreen ? (
          <div className="flex flex-col gap-1">
            <div className="w-full h-1 bg-gradient-to-r from-amber-600 to-amber-800 mx-auto rounded-full"></div>
            <div className="flex flex-row items-center justify-between gap-2 mr-2">
              <h3 className="text-lg font-semibold mb-2">{label}</h3>
              {valorActual && (
                <button
                  onClick={limpiarFiltro}
                  className="text-sm text-red-500 hover:text-red-700 mb-2  px-2 py-1 rounded-full bg-red-50 hover:bg-red-100 transition-colors"
                >
                  Limpiar
                </button>
              )}
            </div>
            {opciones.map((op, idx) => (
              <label
                key={idx}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
              >
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
              <label className="text-sm font-medium text-gray-700 flex-1">
                {label}:
              </label>
              {valorActual && (
                <button
                  onClick={limpiarTodosFiltros}
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
              <option value="" className="text-gray-500">
                Seleccionar {label.toLowerCase()}
              </option>
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

  const filtrosActivos = [categoria, tipoPresentacion, unidadMedida].filter(
    Boolean
  );

  return (
    <aside
      className={` 
      w-full bg-white rounded-xl shadow-lg border border-gray-100 p-4
      ${
        isLargeScreen
          ? "lg:min-w-[270px] lg:max-w-[300px] flex flex-col gap-4"
          : "flex flex-col space-y-4"
      }
    `}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
          Filtros
        </h2>
        {filtrosActivos.length > 0 && (
          <button
            onClick={limpiarTodosFiltros}
            className="text-sm text-red-600 hover:text-red-800 px-2 py-1 rounded-full bg-red-50 hover:bg-red-100 transition-colors"
          >
            Limpiar todos
          </button>
        )}
      </div>

      <div className={`${isLargeScreen ? "space-y-6" : "grid grid-cols-1 gap-4"}`}>
        {renderFiltro(
          "Categoría",
          categoriasOpciones,
          "categoria",
          categoria,
          handleCategoriaChange,
          limpiarCategoria
        )}
        {renderFiltro(
          "Tipo de Presentación",
          tiposPresentacionOpciones,
          "tipoPresentacion",
          tipoPresentacion,
          handleTipoPresentacionChange,
          limpiarTipoPresentacion
        )}
        {renderFiltro(
          "Unidad de Medida",
          unidadesMedidaOpciones,
          "unidadMedida",
          unidadMedida,
          handleUnidadMedidaChange,
          limpiarUnidadMedida
        )}
      </div>

      {/* Resumen de filtros activos */}
      {(categoria || tipoPresentacion || unidadMedida) && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="text-sm font-semibold mb-2 text-gray-700">
            Filtros activos:
          </h4>
          <div className="space-y-1">
            {categoria && (
              <div className="text-xs text-blue-700 bg-blue-50 px-2 py-1 rounded">
                Categoría: {categoria}
              </div>
            )}
            {tipoPresentacion && (
              <div className="text-xs text-green-700 bg-green-50 px-2 py-1 rounded">
                Tipo de Presentación: {tipoPresentacion}
              </div>
            )}
            {unidadMedida && (
              <div className="text-xs text-purple-700 bg-purple-50 px-2 py-1 rounded">
                Unidad de medida: {unidadMedida}
              </div>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}

export default Filtros;
