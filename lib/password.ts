import crypto from "crypto";

/**
 * Hash un mot de passe avec scrypt (algo recommandé par Node.js pour les mots de passe).
 * On génère un sel aléatoire de 16 octets pour que deux mots de passe identiques
 * produisent des hashes différents.
 * Format stocké : "sel:hash" (les deux en hexadécimal)
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

/**
 * Vérifie un mot de passe en clair contre un hash stocké.
 * timingSafeEqual évite les attaques par timing (on compare en temps constant).
 */
export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  const hashBuffer = Buffer.from(hash, "hex");
  const derived = crypto.scryptSync(password, salt, 64);
  return crypto.timingSafeEqual(hashBuffer, derived);
}
