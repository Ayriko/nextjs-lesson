"use server";

import { revalidateTag, revalidatePath } from "next/cache";

export async function revalidateSponsored() {
  // Invalide toutes les fetches taggées "sponsored"
  revalidateTag("sponsored");

  // Alternative : invalider la route entière
  // revalidatePath("/");

  console.log("[revalidate] tag:sponsored invalidé");
}
