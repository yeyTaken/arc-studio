"use client";

import { useEffect, useState, useRef } from "react";
import { LuLayoutPanelLeft } from "react-icons/lu"; // não usado mais
import { GoProjectRoadmap } from "react-icons/go";
import { FaBars, FaGithub } from "react-icons/fa"; // GitHub importado

import ARCStudioTitle from "../title";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const checkScroll = () => {
      const quarter = window.innerHeight / 4;
      setIsScrolled(window.scrollY > quarter);
    };

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkMobile);
    checkScroll();
    checkMobile();

    return () => {
      window.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const isCompact = isScrolled || isMobile;

  interface NavItem {
    href: string;
    label?: string;
    icon: React.ReactNode;
    position?: "left" | "right";
  }

    interface NavItemCompact {
    href: string;
    label?: string;
    icon: React.ReactNode;
  }

  interface NavbarItems {
    isCompact: Record<string, NavItemCompact>;
    notCompact: Record<string, NavItem>;
  }

  const items: NavbarItems = {
    isCompact: {
      projects: {
        href: "/#",
        label: "Projetos",
        icon: <GoProjectRoadmap />,
      },
    },
    notCompact: {
      projects: {
        href: "/#",
        label: "Projetos",
        icon: <GoProjectRoadmap className="text-lg" />,
        position: "left",
      },
      github: {
        href: "/#",
        icon: <FaGithub className="text-lg" />,
      },
    },
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!isCompact && menuOpen) {
      setMenuOpen(false);
    }
  }, [isCompact, menuOpen]);

  const updateMenuPosition = () => {
    if (buttonRef.current && menuRef.current) {
      const btnRect = buttonRef.current.getBoundingClientRect();
      const menuWidth = menuRef.current.offsetWidth;
      const left = btnRect.right - menuWidth;
      const top = btnRect.bottom + 16;

      setMenuPosition({ top, left });
    }
  };

  useEffect(() => {
    if (menuOpen) {
      updateMenuPosition();
      window.addEventListener("resize", updateMenuPosition);
    }

    return () => {
      window.removeEventListener("resize", updateMenuPosition);
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <>
      <header
        className={`select-none fixed top-4 left-1/2 -translate-x-1/2 flex justify-between items-center backdrop-blur-sm z-50 border border-grid-line shadow-md transition-[width,height,padding,background-color] ease-in-out duration-500 ${
          isCompact
            ? "w-[420px] h-12 px-4 rounded-full bg-[#0a121de0]"
            : "w-[95%] px-8 py-3 rounded-2xl bg-[#0a121d61]"
        }`}
      >
        {/* Lado esquerdo: Título + itens "left" */}
        <div className="flex items-center gap-2">
          <a href="/" className="flex-shrink-0">
            <ARCStudioTitle />
          </a>
          {!isCompact && (
            <nav className="flex gap-2 text-sm">
              {Object.entries(items.notCompact)
                .filter(([_, item]) => item.position === "left")
                .map(([key, item]) => (
                  <a
                    key={key}
                    href={item.href}
                    className="flex items-center gap-1 px-3 py-1 rounded"
                  >
                    {item.icon}
                    <span className="cursor-pointer">{item.label}</span>
                  </a>
                ))}
            </nav>
          )}
        </div>

        {/* Lado direito: itens "right" + botão menu */}
        <div className="flex items-center gap-2">
          {!isCompact && (
            <nav className="flex gap-2 text-sm">
              {Object.entries(items.notCompact)
                .filter(([_, item]) => item.position !== "left")
                .map(([key, item]) => (
                  <a
                    key={key}
                    href={item.href}
                    className="flex items-center gap-1 px-3 py-1 rounded"
                  >
                    {item.icon}
                    <span className="cursor-pointer">{item.label}</span>
                  </a>
                ))}
            </nav>
          )}

          {isCompact && (
            <button
              ref={buttonRef}
              className="ml-2 cursor-pointer z-60"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <FaBars size={20} />
            </button>
          )}
        </div>
      </header>

      {/* Menu flutuante em modo compacto */}
      <div
        ref={menuRef}
        style={{
          position: "fixed",
          top: menuPosition.top,
          left: menuPosition.left,
          width: 192,
          transformOrigin: "top right",
          transition: "opacity 0.3s ease, transform 0.3s ease",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transform: menuOpen
            ? "translateY(0) scale(1)"
            : "translateY(-10px) scale(0.95)",
        }}
        className="bg-[#0a121db5] rounded-lg shadow-lg border border-grid-line backdrop-blur-sm z-50"
      >
        <ul className="flex flex-col p-3 gap-2">
          {Object.entries(items.isCompact).map(([key, item]) => (
            <li key={key}>
              <a
                href={item.href}
                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-[#141e2e75] transition-colors backdrop-blur-sm"
                onClick={() => setMenuOpen(false)}
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
