"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaDiscord } from "react-icons/fa";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/profile");
    }
  }, [session, router]);

  if (!session) {
    return (
      <div className="select-none flex min-h-screen items-center justify-center px-6">
        <div className="bg-background backdrop-blur-sm border border-grid-line rounded-2xl p-8 shadow-xl max-w-sm w-full text-center space-y-6">
          <h1 className="text-2xl font-semibold">
            Faça login com Discord
          </h1>
          <button
            onClick={() => signIn("discord", { callbackUrl: "/profile" })}
            className="inline-flex items-center justify-center gap-3 w-full px-6 py-3 rounded-md bg-[#5865F2] hover:bg-[#4752c4] transition cursor-pointer font-medium text-lg"
            aria-label="Login com Discord"
          >
            <FaDiscord size={24} />
            Entrar com Discord
          </button>
        </div>
      </div>
    );
  }

  return null;
}
