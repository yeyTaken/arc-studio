"use client";
import { useEffect, useRef } from "react";

export default function Background() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current!;
    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < 30; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      const size = Math.random() * 4 + 1;
      Object.assign(p.style, {
        width: `${size}px`,
        height: `${size}px`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 15}s`,
      });
      container.append(p);
      particles.push(p);
    }

    return () => {
      particles.forEach((p) => container.removeChild(p));
    };
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const x = (window.innerWidth / 2 - e.clientX) / 50;
      const y = (window.innerHeight / 2 - e.clientY) / 50;
      document.querySelector<HTMLElement>(".glow")
        ?.style.setProperty("transform", `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`);
      document.querySelector<HTMLElement>(".title")
        ?.style.setProperty("transform", `translate(${x/5}px, ${y/5}px)`);
    };
    document.addEventListener("mousemove", move);
    return () => document.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div className="particles" ref={ref} />
      <div className="grid-overlay" />
    </>
  );
}
