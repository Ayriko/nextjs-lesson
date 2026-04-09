"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { ProductUpdateSchema } from "@/lib/schemas/product";
import { revalidatePath, revalidateTag } from "next/cache";

export type UpdateProductState = {
  errors?: Partial<Record<keyof typeof ProductUpdateSchema.shape, string[]>>;
  success?: boolean;
  error?: string;    // erreur globale (DB KO, test, etc.)
  message?: string;
} | null;

export async function updateProduct(
  id: string,
  _prevState: UpdateProductState,
  formData: FormData
): Promise<UpdateProductState> {

  /**
   * _intent permet à plusieurs boutons de partager le même formulaire
   * et le même useActionState, sans créer d'actions séparées.
   * Le bouton qui soumet ajoute son intent via name="intent" value="...".
   */
  if (formData.get("_intent") === "test_error") {
    return { error: "Erreur de test déclenchée manuellement." };
  }

  const raw = {
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    category: formData.get("category"),
    brand: formData.get("brand"),
  };

  const result = ProductUpdateSchema.safeParse(raw);

  if (!result.success) {
    return { errors: z.flattenError(result.error).fieldErrors };
  }

  /**
   * On entoure l'appel Prisma d'un try/catch.
   * Sans ça, une exception non gérée remonte au client comme erreur React
   * (écran rouge en dev, page blanche en prod) — pas de message propre.
   * Ici on intercepte et on retourne { error } pour que le formulaire
   * l'affiche comme n'importe quel autre état.
   */
  try {
    await prisma.product.update({
      where: { id },
      data: { ...result.data, updatedAt: new Date() },
    });
  } catch (e) {
    console.error("[updateProduct] Prisma error:", e);
    return { error: "Erreur lors de la mise à jour en base de données." };
  }

  revalidateTag("products", "max");
  revalidatePath("/");
  revalidatePath("/admin/products");

  return { success: true, message: "Produit mis à jour." };
}
