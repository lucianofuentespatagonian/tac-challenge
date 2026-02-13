"use client";

import { UserMenu } from "./UserMenu";

export function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-6">
      <div>
        <h1 className="text-lg font-semibold">Sistema de Gestión de Stock</h1>
      </div>
      <UserMenu />
    </header>
  );
}
