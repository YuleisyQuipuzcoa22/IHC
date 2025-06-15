import { useEffect, useState } from "react";

export default function useContadorAnimado(final, duracion = 1500, activo = true) {
  const [valor, setValor] = useState(0);

  useEffect(() => {
    if (!activo) return;
    let start = 0;
    const startTime = Date.now();

    function animate() {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duracion, 1);
      const current = Math.floor(progress * final);
      setValor(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setValor(final);
      }
    }

    animate();

    return () => {};
  }, [final, duracion, activo]);

  return valor;
}