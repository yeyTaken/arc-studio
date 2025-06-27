"use client";

import { useEffect, useRef } from "react";

export default function Background() {
  const particlesRef = useRef<HTMLDivElement | null>(null);

  // Gera partículas ao montar
  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;

    const particleCount = 30;
    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.classList.add("particle");

      // Tamanho aleatório
      const size = Math.random() * 4 + 1;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      // Posição aleatória
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;

      // Atraso de animação
      particle.style.animationDelay = `${Math.random() * 15}s`;

      container.appendChild(particle);
      particles.push(particle);
    }

    // Cleanup ao desmontar
    return () => {
      particles.forEach((p) => {
        if (container.contains(p)) container.removeChild(p);
      });
    };
  }, []);

  // Parallax do brilho e do título
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (window.innerWidth / 2 - e.clientX) / 50;
      const y = (window.innerHeight / 2 - e.clientY) / 50;

      const glowEl = document.querySelector(".glow") as HTMLElement | null;
      if (glowEl) {
        glowEl.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
      }

      const titleEl = document.querySelector(".title") as HTMLElement | null;
      if (titleEl) {
        titleEl.style.transform = `translate(${x / 5}px, ${y / 5}px)`;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <div ref={particlesRef} />
      {/* <div className="grid-overlay" /> */}
    </>
  );
}
