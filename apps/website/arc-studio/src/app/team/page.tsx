import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Equipe",
  description:
    "Explore nossa equipe dedicada, focada em inovações, performance e boas práticas de desenvolvimento.",
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <h1 className="text-3xl font-bold text-center py-8 mt-18">Equipe</h1>
      <p className="text-center text-gray-500 max-w-xl mx-auto -mt-4 mb-6 px-4">
        Conheça nossa equipe dedicada. Estamos comprometidos em entregar
        soluções de alta qualidade.
      </p>
    </main>
  );
}
