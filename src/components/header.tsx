import { Logo } from "./logo";
import { ModeToggle } from "./mode-toggle";

export function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto max-w-7xl flex h-12 items-center justify-between">
        <div className="flex items-center">
          <Logo />
          <h1 className="text-2xl font-bold">Spooly</h1>
        </div>
        <ModeToggle />
      </div>
    </header>
  );
}

