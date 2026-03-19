import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Administration</h1>
      <p className="mt-2 text-zinc-500">Bienvenue dans l'espace d'administration.</p>

      <div className="mt-8 flex gap-4">
        <Link
          href="/admin/products"
          className="rounded-xl bg-zinc-900 px-6 py-2 text-white dark:bg-white dark:text-zinc-900"
        >
          Gérer les produits
        </Link>
      </div>
    </div>
  );
}