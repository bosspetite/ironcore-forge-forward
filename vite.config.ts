import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

const repoName = "ironcore-forge-forward";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isGitHubPages =
    process.env.GITHUB_ACTIONS === "true" ||
    process.env.DEPLOY_TARGET === "github-pages";

  return {
    base: isGitHubPages ? `/${repoName}/` : "/",
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(
      Boolean,
    ),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      outDir: "dist",
      assetsDir: "assets",
    },
  };
});
