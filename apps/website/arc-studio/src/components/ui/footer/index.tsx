import Link from "next/link";
import { FaGithub, FaDiscord } from "react-icons/fa";

import ARCStudioTitle from "../title";
import { siteConfig } from "@/config/site";
import { FaHeart } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="select-none w-full py-14 bg-[#0a121d6b] border-t border-grid-line backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="flex justify-center ">
            <ARCStudioTitle />
          </Link>

          <div className="mt-10 mb-10 border-b border-grid-line">
          </div>

          <div className="flex space-x-10 justify-center items-center mb-14">
            <a
              href={siteConfig.links.github}
              className="block transition-all duration-500 hover:text-blue-800"
              aria-label="GitHub"
            >
              <FaGithub className="w-[1.688rem] h-[1.688rem]" />
            </a>

            <a
              href={siteConfig.links.discord}
              className="block transition-all duration-500 hover:text-blue-800"
              aria-label="Discord"
            >
              <FaDiscord className="w-[1.688rem] h-[1.688rem]" />
            </a>

            <a
              href={siteConfig.links.sponsor}
              className="block transition-all duration-500 hover:text-red-800"
              aria-label="Donate"
            >
              <FaHeart className="w-[1.688rem] h-[1.688rem]" />
            </a>

          </div>

          <span className="text-lg text-gray-500 text-center block">
            ©{" "}
            <Link href="/">
              <ARCStudioTitle />
            </Link>{" "}
            2025, Todos os direitos reservados.
          </span>
        </div>
      </div>
    </footer>
  );
}
