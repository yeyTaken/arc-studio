import { getServerSession } from "next-auth";
import Link from "next/link";
import Image from "next/image";

import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

import LogoutButton from "./LogoutButton";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/auth/login");
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="bg-background backdrop-blur-ms border border-grid-line rounded-2xl p-8 shadow-xl max-w-md w-full text-center space-y-4">
        <Image
          src={session.user.image!}
          alt="Avatar"
          width={96}
          height={96}
          className="rounded-full border mx-auto"
        />
        <h1 className="text-2xl font-semibold">
          {session.user.name}
        </h1>
        <p className="text-sm text-gray-300">Email: {session.user.email}</p>
        <p className="text-sm text-gray-400">ID: {session.user.id}</p>

        <div className="flex justify-center items-center gap-4 mt-6">
          <Link
            href="/"
            className="px-6 py-2 rounded-md bg-white/10 hover:bg-white/20 transition text-sm"
          >
            Voltar à home
          </Link>

          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
