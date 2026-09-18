import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * This library has no application entry point — the only thing Vite builds here
 * is Storybook. `@storybook/react-vite` merges this config into its own and
 * does not apply the React plugin itself, so it is declared here.
 */
export default defineConfig({
  plugins: [react()],
});
