"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { FaBars } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

import ARCStudioTitle from "../title";
import { items } from "@/config";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [showDropdowns, setShowDropdowns] = useState<Record<string, boolean>>({});

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

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
    function handleClickOutsideDropdown(event: MouseEvent) {
      Object.entries(dropdownRefs.current).forEach(([key, dropdownEl]) => {
        const buttonEl = buttonRefs.current[key];
        if (
          showDropdowns[key] &&
          dropdownEl &&
          !dropdownEl.contains(event.target as Node) &&
          buttonEl &&
          !buttonEl.contains(event.target as Node)
        ) {
          setShowDropdowns((prev) => ({ ...prev, [key]: false }));
        }
      });
    }

    document.addEventListener("mousedown", handleClickOutsideDropdown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    };
  }, [showDropdowns]);

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

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleDropdown = (key: string) =>
    setShowDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <>
      <header
        className={`select-none fixed top-4 left-1/2 -translate-x-1/2 flex justify-between items-center backdrop-blur-sm z-50 border border-grid-line shadow-lg transition-[width,height,padding,background-color,border-radius,transform] duration-500 ease-in-out ${
          isCompact
            ? "max-w-[420px] w-[90%] h-12 px-4 mx-auto rounded-full bg-[#0a121de0] scale-[0.97]"
            : "w-[95%] px-8 py-3 rounded-2xl bg-[#0a121d61] scale-100"
        }`}
      >
        <div className="flex items-center gap-2">
          <Link href="/" className="flex-shrink-0">
            <ARCStudioTitle />
          </Link>

          {!isCompact && (
            <nav className="flex gap-1 text-sm">
              {Object.entries(items.notCompact)
                .filter(([, item]) => item.position === "left")
                .map(([key, item]) => (
                  <div key={key} className="relative">
                    {item.children ? (
                      <button
                        ref={(el) => {
                          buttonRefs.current[key] = el;
                        }}
                        onClick={() => toggleDropdown(key)}
                        className="flex items-center gap-[2px] px-2 py-0.5 rounded cursor-pointer"
                      >
                        {item.icon}
                        <span>{item.label}</span>
                        <span
                          className={`ml-1 text-xs transition-transform duration-300 ${
                            showDropdowns[key] ? "rotate-180" : ""
                          }`}
                        >
                          {item.label && <IoIosArrowDown />}
                        </span>
                      </button>
                    ) : item.href ? (
                      <Link
                        href={item.href}
                        className="flex items-center gap-[2px] px-2 py-0.5 rounded cursor-pointer hover:bg-[#141e2e75] transition-colors"
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    ) : null}

                    {item.children && showDropdowns[key] && (
                      <div
                        ref={(el) => {
                          dropdownRefs.current[key] = el;
                        }}
                        className="absolute left-0 top-full mt-4 bg-[#0a121db5] rounded shadow-lg border border-grid-line backdrop-blur-sm z-50 flex"
                      >
                        <ul className="p-2 text-sm">
                          {Object.entries(item.children).map(([subKey, subItem]) => (
                            <li key={subKey}>
                              <Link
                                href={subItem.href || "#"}
                                className="flex items-center gap-2 px-3 py-2 hover:bg-[#141e2e75] rounded transition-colors"
                              >
                                {subItem.icon}
                                <span>{subItem.label}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
            </nav>
          )}
        </div>

        <div className="flex items-center gap-2">
          {!isCompact && (
            <nav className="flex gap-1 text-sm">
              {Object.entries(items.notCompact)
                .filter(([, item]) => item.position !== "left")
                .map(([key, item]) => (
                  <div key={key} className="relative">
                    {item.children ? (
                      <button
                        ref={(el) => {
                          buttonRefs.current[key] = el;
                        }}
                        onClick={() => toggleDropdown(key)}
                        className="flex items-center gap-[2px] px-2 py-0.5 rounded cursor-pointer"
                      >
                        {item.icon}
                        <span>{item.label}</span>
                        <span
                          className={`ml-1 text-xs transition-transform duration-300 ${
                            showDropdowns[key] ? "rotate-180" : ""
                          }`}
                        >
                          {item.label && <IoIosArrowDown />}
                        </span>
                      </button>
                    ) : item.href ? (
                      <Link
                        href={item.href}
                        className="flex items-center gap-[2px] px-2 py-0.5 rounded cursor-pointer hover:bg-[#141e2e75] transition-colors"
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    ) : null}

                    {item.children && showDropdowns[key] && (
                      <div
                        ref={(el) => {
                          dropdownRefs.current[key] = el;
                        }}
                        className="absolute left-0 top-full mt-4 bg-[#0a121db5] rounded shadow-lg border border-grid-line backdrop-blur-sm z-50 flex"
                      >
                        <ul className="p-2 text-sm">
                          {Object.entries(item.children).map(([subKey, subItem]) => (
                            <li key={subKey}>
                              <Link
                                href={subItem.href || "#"}
                                className="flex items-center gap-2 px-3 py-2 hover:bg-[#141e2e75] rounded transition-colors"
                              >
                                {subItem.icon}
                                <span>{subItem.label}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
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
          transform: menuOpen ? "translateY(0) scale(1)" : "translateY(-10px) scale(0.95)",
        }}
        className="select-none bg-[#0a121db5] rounded-lg shadow-lg border border-grid-line backdrop-blur-sm z-50"
      >
        <ul className="flex flex-col p-3 gap-2">
          {Object.entries(items.isCompact).map(([key, item]) =>
            item.label ? (
              <li key={key}>
                {item.children ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(key)}
                      className="flex items-center justify-between w-full px-3 py-2 rounded hover:bg-[#141e2e75] transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                      <span
                        className={`text-xs transition-transform duration-300 ${
                          showDropdowns[key] ? "rotate-180" : ""
                        }`}
                      >
                        <IoIosArrowDown />
                      </span>
                    </button>

                    {showDropdowns[key] && (
                      <div className="flex mt-2">
                        <div className="flex flex-col justify-start">
                          <div className="h-full w-[2px] bg-grid-line ml-[18px] rounded"></div>
                        </div>
                        <ul className="ml-3 flex flex-col gap-1">
                          {Object.entries(item.children).map(([subKey, subItem]) => (
                            <li key={subKey}>
                              <Link
                                href={subItem.href || "#"}
                                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-[#141e2e75] transition-colors"
                                onClick={() => setMenuOpen(false)}
                              >
                                {subItem.icon}
                                <span>{subItem.label}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                ) : item.href ? (
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 px-3 py-2 rounded hover:bg-[#141e2e75] transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ) : null}
              </li>
            ) : null
          )}
        </ul>

        <div className="border-t border-grid-line mx-3 my-2"></div>

        <ul className="flex flex-row p-3 gap-4 justify-center">
          {Object.entries(items.isCompact).map(([key, item]) =>
            !item.label ? (
              <li key={key}>
                <Link
                  href={item.href || "#"}
                  className="flex items-center justify-center p-2 rounded hover:bg-[#141e2e75] transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.icon}
                </Link>
              </li>
            ) : null
          )}
        </ul>
      </div>
    </>
  );
}
