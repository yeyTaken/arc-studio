"use client";

import Link from "next/link";
import { Avatar } from "@heroui/react";
import { useEffect, useState, useRef } from "react";
import { FaBars } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useSession } from "next-auth/react";

import ARCStudioTitle from "../title";
import { items } from "@/config";
import LoginCard from "@/components/ui/LoginCard";

export default function Navbar() {
  const { data: session } = useSession();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [showDropdowns, setShowDropdowns] = useState<Record<string, boolean>>(
    {}
  );
  const userButtonRef = useRef<HTMLButtonElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isCompact = isScrolled || isMobile;

  useEffect(() => {
    const handleResizeScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight / 4);
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("scroll", handleResizeScroll);
    window.addEventListener("resize", handleResizeScroll);
    handleResizeScroll();
    return () => {
      window.removeEventListener("scroll", handleResizeScroll);
      window.removeEventListener("resize", handleResizeScroll);
    };
  }, []);

  // Fechar dropdowns ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        userMenuOpen &&
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node) &&
        userButtonRef.current &&
        !userButtonRef.current.contains(e.target as Node)
      ) {
        setUserMenuOpen(false);
      }
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
      Object.entries(dropdownRefs.current).forEach(([key, el]) => {
        if (
          showDropdowns[key] &&
          el &&
          !el.contains(e.target as Node) &&
          buttonRefs.current[key] &&
          !buttonRefs.current[key]!.contains(e.target as Node)
        ) {
          setShowDropdowns((prev) => ({ ...prev, [key]: false }));
        }
      });
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userMenuOpen, menuOpen, showDropdowns]);

  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      if (
        (navigator.platform.includes("Mac") && e.metaKey && e.key === "p") ||
        (!navigator.platform.includes("Mac") && e.ctrlKey && e.key === "p")
      ) {
        e.preventDefault();
        console.log("Ctrl+P pressionado!"); // 👈 debug
        setUserMenuOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      const btn = buttonRef.current;
      const menu = menuRef.current;
      if (btn && menu) {
        const rect = btn.getBoundingClientRect();
        setMenuPosition({
          top: rect.bottom + 16,
          left: rect.right - menu.offsetWidth,
        });
      }
      window.addEventListener("resize", updatePosition);
    }
    function updatePosition() {
      if (buttonRef.current && menuRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setMenuPosition({
          top: rect.bottom + 16,
          left: rect.right - menuRef.current.offsetWidth,
        });
      }
    }
    return () => window.removeEventListener("resize", updatePosition);
  }, [menuOpen]);

  useEffect(() => {
    if (!isCompact && menuOpen) {
      setMenuOpen(false);
    }
  }, [isCompact, menuOpen]);

  const toggleDropdown = (key: string) =>
    setShowDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));

  const renderNavItems = (pos: "left" | "right") =>
    Object.entries(items.notCompact)
      .filter(([, item]) =>
        pos === "left" ? item.position === "left" : item.position !== "left"
      )
      .map(([key, item]) => (
        <div key={key} className="relative">
          {item.children ? (
            <>
              <button
                ref={(el) => (buttonRefs.current[key] = el)}
                onClick={() => toggleDropdown(key)}
                className="cursor-pointer relative flex items-center gap-1 px-2 py-0.5 rounded hover:text-[#5b9eff] transition"
              >
                {item.icon} <span>{item.label}</span>
                <IoIosArrowDown
                  className={`ml-1 text-xs transition-transform ${
                    showDropdowns[key] ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showDropdowns[key] && (
                <div
                  ref={(el) => (dropdownRefs.current[key] = el)}
                  className="text-foreground/70 absolute left-0 top-[calc(100%+24px)] 
             bg-[rgba(10,18,29,0.6)] backdrop-blur-md 
             rounded-lg shadow-lg border border-grid-line z-50"
                >
                  <ul className="p-2 text-sm">
                    {Object.entries(item.children).map(([subKey, subItem]) => (
                      <li key={subKey}>
                        <Link
                          href={subItem.href || "#"}
                          className="flex items-center gap-2 px-3 py-2 rounded hover:bg-[#141e2e75] transition"
                        >
                          {subItem.icon} <span>{subItem.label}</span>
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
              className="flex items-center gap-1 px-2 py-0.5 rounded hover:text-[#5b9eff] transition"
            >
              {item.icon} <span>{item.label}</span>
            </Link>
          ) : null}
        </div>
      ));

  return (
    <>
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 flex justify-between items-center backdrop-blur-sm border border-grid-line shadow-lg z-50 transition-all duration-500 ease-in-out ${
          isCompact
            ? "max-w-[420px] w-[90%] h-12 px-4 rounded-full bg-[#0a121de0]"
            : "w-[95%] px-8 py-3 rounded-2xl bg-[#0a121d61]"
        }`}
      >
        <div className="flex items-center gap-2">
          <Link href="/" className="flex-shrink-0">
            <ARCStudioTitle />
          </Link>
          {!isCompact && (
            <nav className="flex gap-1 text-sm">{renderNavItems("left")}</nav>
          )}
        </div>

        <div className="flex items-center gap-2">
          {!isCompact && (
            <nav className="flex gap-1 text-sm">{renderNavItems("right")}</nav>
          )}
          {isCompact && (
            <button
              ref={buttonRef}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="cursor-pointer p-2 rounded hover:bg-[#141e2e75] transition"
            >
              <FaBars size={20} />
            </button>
          )}
          <button
            ref={userButtonRef}
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            aria-label="Toggle user menu"
            className="cursor-pointer"
          >
            <Avatar
              src={session?.user?.image || "/images/avatar-placeholder.png"}
              alt={session?.user?.name || "Avatar"}
              size="sm"
              isBordered
              color="default"
            />
          </button>
        </div>
      </header>

      <LoginCard
        userMenuOpen={userMenuOpen}
        setUserMenuOpen={setUserMenuOpen}
        userButtonRef={userButtonRef}
        userMenuRef={userMenuRef}
      />

      {/* Compact dropdown */}

      <div
        ref={menuRef}
        style={{
          position: "fixed",
          top: menuPosition.top,
          left: menuPosition.left,
          width: 192,
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transform: menuOpen
            ? "translateY(0) scale(1)"
            : "translateY(-10px) scale(0.95)",
          transition: "opacity 0.3s, transform 0.3s",
        }}
        className="select-none bg-[#0a121db5] backdrop-blur-sm rounded-lg shadow-lg border border-grid-line z-50"
      >
        <ul className="flex flex-col p-3 gap-2">
          {Object.entries(items.isCompact).map(([key, item]) =>
            item.label ? (
              <li key={key}>
                {item.children ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(key)}
                      className="cursor-pointer flex justify-between items-center w-full px-3 py-2 rounded hover:bg-[#141e2e75] transition"
                    >
                      <div className="flex items-center gap-2">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                      <IoIosArrowDown
                        className={`text-xs transition-transform ${
                          showDropdowns[key] ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {showDropdowns[key] && (
                      <div className="flex mt-2 text-foreground/70">
                        <div className="flex flex-col justify-start">
                          <div className="h-full w-[2px] bg-grid-line ml-[18px] rounded"></div>
                        </div>
                        <ul className="ml-3 flex flex-col gap-1 max-w-[180px]">
                          {Object.entries(item.children).map(
                            ([subKey, subItem]) => (
                              <li key={subKey}>
                                <Link
                                  href={subItem.href || "#"}
                                  className="flex items-center gap-2 px-2 py-1 rounded hover:bg-[#141e2e75] transition max-w-full"
                                  onClick={() => setMenuOpen(false)}
                                >
                                  {subItem.icon}
                                  <span className="truncate">
                                    {subItem.label}
                                  </span>
                                </Link>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href || "#"}
                    className="flex items-center gap-2 px-3 py-2 rounded hover:bg-[#141e2e75] transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                )}
              </li>
            ) : null
          )}
        </ul>
        <div className="border-t border-grid-line mx-3 my-2"></div>
        <ul className="flex p-3 gap-4 justify-center">
          {Object.entries(items.isCompact).map(([key, item]) =>
            !item.label ? (
              <li key={key}>
                <Link
                  href={item.href || "#"}
                  className="p-2 rounded hover:bg-[#141e2e75] transition"
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
