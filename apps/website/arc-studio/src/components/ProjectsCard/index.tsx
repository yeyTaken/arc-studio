"use client";

import Image from "next/image";
import Link from "next/link";

import { projects } from "@/config";

export default function ProjectsCard() {
  const entries = Object.entries(projects);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {entries.map(([key, { name, uri, thumbnail, creators }]) => (
        <Link
          key={key}
          href={uri}
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-[#0f172a]/50 backdrop-blur-md border border-grid-line rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <div className="relative w-full aspect-video overflow-hidden">
            <Image
              src={thumbnail}
              alt={name}
              width={800}
              height={450}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              unoptimized // usar se thumbnail vem de string (ex: JSON)
            />
          </div>

          <div className="p-4 space-y-1">
            <h2 className="text-lg font-bold">{name}</h2>
            <p className="text-sm text-muted-foreground">
              Criadores: {creators.join(", ")}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
