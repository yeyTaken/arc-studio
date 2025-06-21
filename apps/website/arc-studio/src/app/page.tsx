"use client";

import Image from "next/image";
import Link from "next/link";
import { TfiNewWindow } from "react-icons/tfi";

export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
        {/* Ícone: primeiro no mobile, depois no desktop */}
        <div className="flex items-center justify-center order-1 md:order-2">
          <Image
            src="/images/icone.png"
            alt="Ícone do site"
            width={360}
            height={360}
            className="w-[300px] h-[300px] md:w-[360px] md:h-[360px] object-contain"
            priority
          />
        </div>

        {/* Texto */}
        <div className="flex flex-col justify-center text-center md:text-left order-2 md:order-1">
          <h1 className="text-4xl font-bold mb-4">Quer tirar sua ideia do papel?</h1>
          <p className="text-lg text-gray-500 mb-3">
            Seu projeto merece o melhor — vamos torná-lo realidade com inovação e dedicação.
          </p>
          <p className="text-lg text-gray-500 mb-6">
            Conheça nossa <Link href="/team" className="text-blue-600 underline">Equipe</Link>!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              href="/projects"
              className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition cursor-pointer text-center"
            >
              Saiba mais
            </Link>
            <Link
              href="/contact"
              className="px-6 py-2 rounded-xl border border-blue-600 text-blue-600 hover:bg-grid-line transition cursor-pointer inline-flex items-center gap-2 justify-center"
            >
              Contato <TfiNewWindow />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
