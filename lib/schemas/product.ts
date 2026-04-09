import { z } from "zod";

/**
 * Schéma Zod pour la mise à jour d'un produit.
 *
 * Zod joue deux rôles ici :
 *  1. VALIDATION — vérifie les données reçues dans le Server Action
 *     (types, min/max, format). Si ça échoue, on a les erreurs par champ.
 *  2. TYPAGE — z.infer<typeof ProductUpdateSchema> génère le type TypeScript
 *     automatiquement. Plus besoin de déclarer une interface à la main.
 *
 * Les données arrivent depuis FormData (tout est string) → on coerce les
 * nombres avec z.coerce.number() au lieu de z.number().
 */

export const ProductUpdateSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  description: z.string().min(1, "La description est requise"),
  price: z.coerce
    .number({ error: "Le prix doit être un nombre" })
    .positive("Le prix doit être positif"),
  stock: z.coerce
    .number({ error: "Le stock doit être un nombre" })
    .int("Le stock doit être un entier")
    .min(0, "Le stock ne peut pas être négatif"),
  category: z.string().min(1, "La catégorie est requise"),
  brand: z.string().min(1, "La marque est requise"),
});

// Type inféré automatiquement — utilisé dans le formulaire et l'action
export type ProductUpdate = z.infer<typeof ProductUpdateSchema>;
