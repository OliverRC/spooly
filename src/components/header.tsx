import { Logo } from "./logo";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { logout } from "@/app/login/actions";

export async function Header() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="border-b">
      <div className="mx-auto max-w-7xl flex h-12 items-center justify-between">
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
          <Logo />
          <h1 className="text-2xl font-bold">Spooly</h1>
        </Link>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="text-sm">{user.email}</span>
              <form action={logout}>
                <Button type="submit" variant="outline">Logout</Button>
              </form>
            </>
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}