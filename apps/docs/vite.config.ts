import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

// No path alias here on purpose. The "@" alias was unused by src/ (all imports
// are relative) and resolving it pulled in "path" and "__dirname", which failed
// type-checking because @types/node is not a dependency. Keep this identical in
// shape to apps/cloud.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/",
});
