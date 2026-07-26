import path from "path";
import { defineConfig } from "vitest/config";

// Config de test séparée de vite.config.ts : les tests n'ont besoin ni de React,
// ni de Tailwind, ni de lovable-tagger. Environnement `node` par défaut — les
// modules testés sont purs et reçoivent leurs entrées en paramètres, jamais via
// le DOM. Un test qui aurait besoin du navigateur doit le déclarer lui-même.
export default defineConfig({
  test: {
    include: ["src/**/*.test.ts"],
    environment: "node",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
