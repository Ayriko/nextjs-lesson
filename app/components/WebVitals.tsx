"use client";

import { useReportWebVitals } from "next/web-vitals";

// Seuils officiels Google (en ms, sauf CLS qui est sans unité)
const THRESHOLDS: Record<string, { good: number; needsImprovement: number }> = {
  FCP:  { good: 1800,  needsImprovement: 3000  },
  LCP:  { good: 2500,  needsImprovement: 4000  },
  INP:  { good: 200,   needsImprovement: 500   },
  TTFB: { good: 800,   needsImprovement: 1800  },
  CLS:  { good: 0.1,   needsImprovement: 0.25  },
};

const LABELS: Record<string, string> = {
  FCP:  "First Contentful Paint",
  LCP:  "Largest Contentful Paint",
  INP:  "Interaction to Next Paint",
  TTFB: "Time to First Byte",
  CLS:  "Cumulative Layout Shift",
};

function getRating(name: string, value: number): "good" | "needs-improvement" | "poor" {
  const t = THRESHOLDS[name];
  if (!t) return "good";
  if (value <= t.good) return "good";
  if (value <= t.needsImprovement) return "needs-improvement";
  return "poor";
}

function formatValue(name: string, value: number): string {
  if (name === "CLS") return value.toFixed(4);
  return `${Math.round(value)} ms`;
}

const RATING_STYLES: Record<string, string> = {
  good:              "color: #0cce6b",
  "needs-improvement": "color: #ffa400",
  poor:              "color: #ff4e42",
};

export function WebVitals() {
  useReportWebVitals((metric) => {
    const { name, value, rating, id, navigationType } = metric;
    const label = LABELS[name] ?? name;
    const computedRating = rating ?? getRating(name, value);
    const formatted = formatValue(name, value);
    const t = THRESHOLDS[name];

    const ratingEmoji =
      computedRating === "good" ? "✅" :
      computedRating === "needs-improvement" ? "⚠️" : "❌";

    console.groupCollapsed(
      `%c[WebVitals] ${ratingEmoji} ${name} — ${formatted}`,
      RATING_STYLES[computedRating]
    );
    console.log(`Métrique      : ${label} (${name})`);
    console.log(`Valeur        : ${formatted}`);
    console.log(`Note          : ${computedRating.toUpperCase()}`);
    if (t) {
      console.log(`Seuils        : ✅ ≤ ${formatValue(name, t.good)}  ⚠️ ≤ ${formatValue(name, t.needsImprovement)}  ❌ au-delà`);
    }
    console.log(`ID            : ${id}`);
    console.log(`Navigation    : ${navigationType ?? "—"}`);

    // Diagnostic ciblé par métrique
    if (computedRating !== "good") {
      console.warn(`[Diagnostic ${name}]`, getDiagnostic(name, value));
    }

    console.groupEnd();
  });

  return null;
}

function getDiagnostic(name: string, value: number): string {
  switch (name) {
    case "FCP":
      return `FCP à ${Math.round(value)} ms — Le navigateur met du temps à afficher le premier contenu. ` +
             `Causes probables : fonts bloquantes (ajoutez display=swap), CSS critique non inliné, ` +
             `serveur lent (voir TTFB), ou ressources non pré-chargées (<link rel="preload">).`;
    case "LCP":
      return `LCP à ${Math.round(value)} ms — Le plus grand élément visible (hero image, h1...) s'affiche trop tard. ` +
             `Causes : image sans priority prop (<Image priority>), LCP hors viewport, ` +
             `fetch de données côté client pour le contenu principal, ou ressource non préchargée.`;
    case "INP":
      return `INP à ${Math.round(value)} ms — Les interactions utilisateur (clics, touches) provoquent un blocage du thread principal. ` +
             `Causes : handlers lourds synchrones, recalcul de style massif, ` +
             `long tasks JS (splittez avec setTimeout/scheduler), hydratation coûteuse.`;
    case "TTFB":
      return `TTFB à ${Math.round(value)} ms — Le serveur (ou CDN) répond lentement. ` +
             `Causes : pas de cache (ajoutez Cache-Control ou revalidate), ` +
             `requêtes DB lentes, middleware coûteux, région de déploiement éloignée.`;
    case "CLS":
      return `CLS à ${value.toFixed(4)} — Des éléments bougent après le chargement initial. ` +
             `Causes : images sans dimensions explicites (width/height ou aspect-ratio), ` +
             `polices provoquant un FOUT, contenu injecté dynamiquement (bannières, ads) sans espace réservé.`;
    default:
      return `Valeur hors seuil recommandé pour ${name}.`;
  }
}