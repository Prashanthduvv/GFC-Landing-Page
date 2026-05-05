import { useEffect, useRef } from "react";

export default function Cursor() {
  const gloveRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth <= 768) return;

    const glove = gloveRef.current;
    const ring = ringRef.current;

    let mouseX = 0, mouseY = 0;
    let x = 0, y = 0;
    let rx = 0, ry = 0;

    let rafId;

    const move = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      // fast cursor
      x += (mouseX - x) * 0.25;
      y += (mouseY - y) * 0.25;

      // slow floating ring
      rx += (mouseX - rx) * 0.12;
      ry += (mouseY - ry) * 0.12;

      glove.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;

      rafId = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", move);
    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", move);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Floating Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-14 h-14 pointer-events-none z-[9998]
        -translate-x-1/2 -translate-y-1/2
        rounded-full
        bg-[radial-gradient(circle,rgba(255,0,0,0.4),rgba(255,0,0,0.1),transparent)]
        blur-[2px]
        shadow-[0_0_25px_rgba(255,0,0,0.6),inset_0_0_15px_rgba(255,0,0,0.5)]
        transition-transform duration-150 ease-out"
      />

      {/* Glove */}
      <img
        ref={gloveRef}
        src="/glove.png"
        alt="cursor"
        className="fixed top-0 left-0 w-[45px] pointer-events-none z-[9999]
        -translate-x-1/2 -translate-y-1/2
        will-change-transform
        drop-shadow-[0_0_15px_rgba(255,0,0,0.8)]"
      />
    </>
  );
}
