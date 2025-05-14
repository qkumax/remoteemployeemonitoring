import { useRef } from "react";

const useActivityTracker = () => {
  const keyboardCount = useRef(0);
  const mouseCount = useRef(0);
  const intervalRef = useRef(null);

  const handleKeydown = () => {
    keyboardCount.current += 1;
  };

  const handleMousemove = () => {
    mouseCount.current += 1;
  };

  const start = (onUpdate) => {
    keyboardCount.current = 0;
    mouseCount.current = 0;

    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("mousemove", handleMousemove);

    intervalRef.current = setInterval(() => {
      if (onUpdate) {
        onUpdate({
          keyboardActivity: keyboardCount.current,
          mouseActivity: mouseCount.current
        });
      }
    }, 1000);

    // Возвращает функцию для остановки прослушки
    return () => {
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("mousemove", handleMousemove);
      clearInterval(intervalRef.current);
    };
  };

  const stop = () => {
    window.removeEventListener("keydown", handleKeydown);
    window.removeEventListener("mousemove", handleMousemove);
    clearInterval(intervalRef.current);

    return {
      keyboardActivity: keyboardCount.current,
      mouseActivity: mouseCount.current
    };
  };

  return { start, stop };
};

export default useActivityTracker;
