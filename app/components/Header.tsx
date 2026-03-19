import Link from "next/link";
import CartIcon from "@/app/components/CartIcon";

export default function Header() {
    return (
        <header className="border-b border-zinc-200 dark:border-zinc-800">
            <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
                <Link href="/" className="text-xl font-semibold">
                    Ma boutique trop bien
                </Link>
                <ul className="flex items-center gap-6">
                    <li>
                        <Link href="/" className="hover:underline">
                            Accueil
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin" className="hover:underline">
                            Admin
                        </Link>
                    </li>
                    <li>
                        <Link href="/about" className="hover:underline">
                            À propos
                        </Link>
                    </li>
                    <li>
                        <CartIcon />
                    </li>
                </ul>
            </nav>
        </header>
    );
}
