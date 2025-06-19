import { FaInstagram, FaFacebookF, FaYoutube, FaGlobe } from "react-icons/fa";

import ARCStudioTitle from "../title";

export default function Footer() {
  return (
    <footer className="w-full py-14 bg-[#0a121d6b] border-t border-grid-line backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <a href="/" className="flex justify-center ">
            <ARCStudioTitle />
          </a>

          <ul className="text-lg flex items-center justify-center flex-col gap-7 md:flex-row md:gap-12 transition-all duration-500 py-16 mb-10 border-b border-grid-line">
            <li>
              <a href="#" className="hover">
                Teste1
              </a>
            </li>
            <li>
              <a href="#" className="hover">
                Teste2
              </a>
            </li>
            <li>
              <a href="#" className="hover">
                Teste3
              </a>
            </li>
            <li>
              <a href="#" className="hover">
                Teste4
              </a>
            </li>
            <li>
              <a href="#" className="hover">
                Teste5
              </a>
            </li>
          </ul>

          <div className="flex space-x-10 justify-center items-center mb-14">
            <a
              href="#"
              className="block transition-all duration-500 hover:text-indigo-600"
              aria-label="Website"
            >
              <FaGlobe className="w-[1.688rem] h-[1.688rem]" />
            </a>

            <a
              href="#"
              className="block transition-all duration-500 hover:text-indigo-600"
              aria-label="Instagram"
            >
              <FaInstagram className="w-[1.688rem] h-[1.688rem]" />
            </a>

            <a
              href="#"
              className="block transition-all duration-500 hover:text-indigo-600"
              aria-label="Facebook"
            >
              <FaFacebookF className="w-[0.938rem] h-[1.625rem]" />
            </a>

            <a
              href="#"
              className="block transition-all duration-500 hover:text-indigo-600"
              aria-label="YouTube"
            >
              <FaYoutube className="w-[1.875rem] h-[1.375rem]" />
            </a>
          </div>

          <span className="text-lg text-gray-500 text-center block">
            ©{" "}
            <a href="/">
              <ARCStudioTitle />
            </a>{" "}
            2025, Todos os direitos reservados.
          </span>
        </div>
      </div>
    </footer>
  );
}
