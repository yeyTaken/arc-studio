"use client";

import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="cursor-pointer p-2 rounded-md bg-red-500/10 hover:bg-red-500/20 transition text-red-300"
      title="Sair"
      aria-label="Logout"
    >
      <FiLogOut size={20} />
    </button>
  );
}
