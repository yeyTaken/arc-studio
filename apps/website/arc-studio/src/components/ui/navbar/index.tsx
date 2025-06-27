"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { FaBars, FaRegUserCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { signIn, signOut, useSession } from "next-auth/react";

import ARCStudioTitle from "../title";
import { items } from "@/config";
import { FaDiscord } from "react-icons/fa6";
import Image from "next/image";
import { FiCheckCircle, FiCopy, FiLogOut } from "react-icons/fi";

export default function Navbar() {
  const { data: session } = useSession();

    const [showWumpus, setShowWumpus] = useState(false);


  const [copied, setCopied] = useState(false);

  const handleCopyId = async () => {
    if (!session?.user?.id) return;
    await navigator.clipboard.writeText(session.user.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const userButtonRef = useRef<HTMLButtonElement>(null);

  // Fecha o menu do usuário se clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuOpen &&
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node) &&
        userButtonRef.current &&
        !userButtonRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userMenuOpen]);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [showDropdowns, setShowDropdowns] = useState<Record<string, boolean>>(
    {}
  );

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
                        className="flex items-center gap-[2px] px-2 py-0.5 rounded cursor-pointer hover:text-[#5b9eff] transition-colors"
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
                        className="flex items-center gap-[2px] px-2 py-0.5 rounded cursor-pointer hover:text-[#5b9eff] transition-colors"
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
                          {Object.entries(item.children).map(
                            ([subKey, subItem]) => (
                              <li key={subKey}>
                                <Link
                                  href={subItem.href || "#"}
                                  className="flex items-center gap-2 px-3 py-2 hover:bg-[#141e2e75] rounded transition-colors"
                                >
                                  {subItem.icon}
                                  <span>{subItem.label}</span>
                                </Link>
                              </li>
                            )
                          )}
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
                        className="flex items-center gap-[2px] px-2 py-0.5 rounded cursor-pointer hover:text-[#5b9eff] transition-colors"
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
                        className="flex items-center gap-[2px] px-2 py-0.5 rounded cursor-pointer hover:text-[#5b9eff] transition-colors"
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
                          {Object.entries(item.children).map(
                            ([subKey, subItem]) => (
                              <li key={subKey}>
                                <Link
                                  href={subItem.href || "#"}
                                  className="flex items-center gap-2 px-3 py-2 hover:bg-[#141e2e75] rounded transition-colors"
                                >
                                  {subItem.icon}
                                  <span>{subItem.label}</span>
                                </Link>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
            </nav>
          )}

          {/* Ícone menu hamburguer */}
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

          {/* Ícone usuário */}
          <div className="flex items-center gap-2">
            {!session ? (
              <button
                ref={userButtonRef}
                onClick={() => setUserMenuOpen((prev) => !prev)}
                className="cursor-pointer"
                aria-label="Toggle user menu"
              >
                <FaRegUserCircle size={28} />
              </button>
            ) : (
              <button
                ref={userButtonRef}
                onClick={() => setUserMenuOpen((prev) => !prev)}
                className="cursor-pointer"
                aria-label="Toggle user menu"
              >
                <Image
                  src={session.user.image!}
                  alt={session.user.name!}
                  width={28}
                  height={28}
                  className="rounded-full border-2 mx-auto border-grid-line"
                />
              </button>
            )}
          </div>
        </div>
      </header>

      <>
        {/* Overlay de fundo com blur médio */}
        <div
          className={`fixed inset-0 bg-[#0a121daa] backdrop-blur-md z-40 transition-opacity duration-300 ease-in-out ${
            userMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setUserMenuOpen(false)}
        />

        {/* Card central de login */}
        <div
          ref={userMenuRef}
          className={`fixed top-[15vh] left-1/2 z-50 
      w-[90vw] max-w-[400px] min-w-[280px]
      h-[65vh] max-h-[500px] min-h-[360px]
      bg-[#0a121d] rounded-xl shadow-xl border border-[#2c3e50]
      px-6 py-5 flex flex-col justify-between
      transition-opacity duration-300 ease-in-out
      ${
        userMenuOpen
          ? "opacity-100 translate-x-[-50%] translate-y-0 scale-100"
          : "opacity-0 translate-x-[-50%] translate-y-[-10px] scale-95"
      }`}
          style={{ transformOrigin: "top center" }}
        >
          {!session ? (
    <>
      {/* Título */}
      <h2 className="text-xl font-bold mb-3 text-center">
        Entrar com Discord
      </h2>

      {/* Conteúdo */}
      <div className="flex-grow overflow-y-auto text-center px-1 text-sm text-neutral-300">
        <p>Faça login para aproveitar todos os recursos da plataforma.</p>
      </div>

      {/* Área do botão */}
      <div
        className="relative mt-5 flex flex-col items-center"
        onMouseEnter={() => setShowWumpus(true)}
        onMouseLeave={() => setShowWumpus(false)}
      >
        {/* Wumpus no topo direito do botão */}
        {showWumpus && (
          <div className="absolute -top-17 right-10 transition-opacity duration-300">
            <Image
              src="/gif/wumpus_happy.gif"
              alt="Discord Login"
              width={70}
              height={70}
            />
          </div>
        )}

        {/* Botão de login aumentado */}
        <button
          onClick={() => signIn("discord", { callbackUrl: "/" })}
          className="w-64 cursor-pointer flex items-center justify-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] font-extrabold text-sm px-6 py-2 rounded transition-colors"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          <FaDiscord size={20} />
          Discord
        </button>
      </div>
    </>

          ) : (
            <>
              {/* Conteúdo fixo no topo (sem borda) */}
              <div className="select-none fixed top-4 left-4 right-4 bg-background px-6 py-4 flex items-center gap-4 border-b border-grid-line z-50">
                {/* Avatar */}
                <Image
                  src={session.user.image!}
                  alt={session.user.name!}
                  width={64}
                  height={64}
                  className="rounded-full border-2 border-grid-line"
                />

                {/* Nome e ID */}
                <div className="flex flex-col">
                  <h1 className="text-lg font-semibold mt-1">
                    {session.user.name}
                  </h1>

                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>ID: {session.user.id}</span>

                    <button
                      onClick={handleCopyId}
                      className="cursor-pointer p-1 rounded hover:bg-white/10 transition"
                      title={copied ? "Copiado" : "Copiar ID"}
                    >
                      {copied ? (
                        <FiCheckCircle size={16} className="text-green-400" />
                      ) : (
                        <FiCopy size={16} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Área principal com scroll (sem borda) */}
              <main className="absolute top-[88px] bottom-[72px] left-4 right-4 overflow-y-auto bg-background rounded-xl p-6 mt-5">
                <h1 className="font-semibold">Espaço do Usuário</h1>
                <p className="text-sm text-gray-400">
                  Aqui você pode ver suas informaçoes.
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Esta área é reservada para futuras funcionalidades, como
                  gerenciamento de conta, configurações e muito mais.
                </p>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <p className="text-sm text-gray-400">
                  Fique atento às atualizações!
                </p>
              </main>

              {/* Footer fixo com borda */}
              <footer className="fixed bottom-4 left-4 right-4 backdrop-blur-sm border border-[#2c3e50] rounded-xl px-6 py-2 flex items-center justify-end shadow-xl z-50">
                <button
                  onClick={() => signOut()}
                  className="cursor-pointer p-2 rounded-md bg-red-500/10 hover:bg-red-500/20 transition text-red-300"
                  title="Sair"
                  aria-label="Logout"
                >
                  <FiLogOut size={20} />
                </button>
              </footer>
            </>
          )}
        </div>
      </>

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
                          {Object.entries(item.children).map(
                            ([subKey, subItem]) => (
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
                            )
                          )}
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
