import Link from "next/link";
import Image from "next/image";
import screenshot from './screenshot.jpg'

export default async function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-20rem)] text-center px-4">
      <div className="max-w-3xl space-y-8">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Track Your 3D Printing Inventory
        </h1>
        <p className="text-lg text-muted-foreground sm:text-xl">
          A simple, no-frills way to manage your inventory. Keep track of what you have, what you're using, and what you need to buy.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/filaments"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            Sign In
          </Link>
        </div>

        <Image
          src="/screenshot.webp"
          alt="Spooly Screenshot"
          width={1000}
          height={1000}
          className="w-full max-w-3xl rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}
