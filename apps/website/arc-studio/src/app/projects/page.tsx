import ProjectsCard from "@/components/ProjectsCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projetos",
  description: "Explore nossos projetos desenvolvidos com foco em inovações, performance e boas práticas de desenvolvimento.",
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <h1 className="text-3xl font-bold text-center py-8 mt-18">
        Projetos
      </h1>
      <p className="text-center text-gray-500 max-w-xl mx-auto -mt-4 mb-6 px-4">
        Explore nossos projetos desenvolvidos com foco em inovações, performance e boas práticas de desenvolvimento.
      </p>
      <ProjectsCard />
    </main>
  );
}
