import React, { useState, useEffect, useRef } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { FaDiscord } from "react-icons/fa6";
import Image from "next/image";
import { FiCheckCircle, FiCopy, FiLogOut } from "react-icons/fi";
import { Avatar, Kbd } from "@heroui/react";

export interface LoginCardProps {
  userMenuOpen: boolean;
  setUserMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userButtonRef: React.RefObject<HTMLButtonElement>;
}

export default function LoginCard({
  userMenuOpen,
  setUserMenuOpen,
  userButtonRef,
}: LoginCardProps) {
  const { data: session } = useSession();
  const [showWumpus, setShowWumpus] = useState(false);
  const [copied, setCopied] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Copy ID to clipboard
  const handleCopyId = async () => {
    if (!session?.user?.id) return;
    await navigator.clipboard.writeText(session.user.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Close on outside click
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
  }, [userMenuOpen, setUserMenuOpen, userButtonRef]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-[#0a121daa] backdrop-blur-md z-40 transition-opacity duration-300 ease-in-out ${
          userMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setUserMenuOpen(false)}
      />

      {/* Card */}
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
<div className="select-none flex flex-col h-full">
  <div>
    <h2 className="text-xl font-bold mb-3 text-center">
      Entrar com Discord
    </h2>
    <div className="text-center px-1 text-sm text-neutral-300">
      <p>Faça login para aproveitar todos os recursos da plataforma.</p>
    </div>
  </div>

  <div
    className="relative flex flex-col items-center mt-auto"
    onMouseEnter={() => setShowWumpus(true)}
    onMouseLeave={() => setShowWumpus(false)}
  >
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
    <button
      onClick={() => signIn("discord")}
      className="w-64 cursor-pointer flex items-center justify-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] font-extrabold text-sm px-6 py-2 rounded transition-colors"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <FaDiscord size={20} />
      Discord
    </button>
  </div>
</div>

        ) : (
          <>
            <div className="select-none fixed top-4 left-4 right-4 bg-background px-6 py-4 flex items-center gap-4 border-b border-grid-line z-50">
              <Avatar
                src={session.user.image!}
                name={session.user.name!}
                alt={session.user.name!}
                size="lg"
                isBordered
                color="default"
              />
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
            <main className="absolute top-[88px] bottom-[72px] left-4 right-4 overflow-y-auto bg-background rounded-xl p-6 mt-5">
              <h1 className="font-semibold">Espaço do Usuário</h1>
              <p className="text-sm text-gray-400">
                Aqui você pode ver suas informaçoes.
              </p>
              <p className="text-sm text-gray-400 mt-100">
                Área reservada para futuras funcionalidades.
              </p>
            </main>
            <footer className="select-none fixed bottom-4 left-4 right-4 backdrop-blur-sm border border-[#2c3e50] rounded-xl px-6 py-2 flex items-center justify-between shadow-xl z-50">
              <span className="flex items-center gap-1">
                <Kbd keys={["ctrl"]}>P</Kbd>
              </span>

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
  );
}