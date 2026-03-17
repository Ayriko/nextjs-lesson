import Link from "next/link";

export default function Header() {
    return (
        <header className="border-b border-zinc-200 dark:border-zinc-800">
            <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
                <Link href="/" className="text-xl font-semibold">
                    My App
                </Link>
                <ul className="flex gap-6">
                    <li>
                        <Link href="/" className="hover:underline">
                            Accueil
                        </Link>
                    </li>
                    <li>
                        <Link href="/about" className="hover:underline">
                            À propos
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
