"use server";

import { prisma } from "@/lib/prisma";
import { ProductUpdateSchema } from "@/lib/schemas/product";
import { revalidatePath } from "next/cache";

export type UpdateProductState = {
  errors?: Partial<Record<keyof typeof ProductUpdateSchema.shape, string[]>>;
  success?: boolean;
  message?: string;
} | null;

/**
 * Server Action de mise à jour produit — flux :
 *
 *  1. Extraire les champs depuis FormData (tout est string à ce stade)
 *  2. safeParse() — Zod valide et coerce les types (ex: "149.99" → 149.99)
 *     → si invalide : retourner les erreurs par champ (pas d'exception)
 *     → si valide   : `result.data` est typé ProductUpdate garanti propre
 *  3. Prisma update en base
 *  4. revalidatePath() pour invalider le cache de la page produit
 */
export async function updateProduct(
  id: string,
  _prevState: UpdateProductState,
  formData: FormData
): Promise<UpdateProductState> {
  const raw = {
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    category: formData.get("category"),
    brand: formData.get("brand"),
  };

  // safeParse ne lève jamais d'exception
  const result = ProductUpdateSchema.safeParse(raw);

  if (!result.success) {
    // flatten() transforme les erreurs Zod en { fieldErrors: { name: ["..."] } }
    return { errors: result.error.flatten().fieldErrors };
  }

  await prisma.product.update({
    where: { id },
    data: { ...result.data, updatedAt: new Date() },
  });

  // Invalide le cache de la page détail et de la liste admin
  revalidatePath(`/products`);
  revalidatePath(`/admin/products`);

  return { success: true, message: "Produit mis à jour." };
}
