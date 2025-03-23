import { Logo } from "./logo";

export function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto max-w-7xl flex h-12 items-centes">
        <div className="flex items-center">
          <Logo />
          <h1 className="text-2xl font-bold">Spooly</h1>
        </div>
      </div>
    </header>
  );
}

