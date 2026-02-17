import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
	site: "https://mybackpack.mikenavales.xyz",
	integrations: [svelte()],
	vite: {
		plugins: [tailwindcss()],
	},
	compressHTML: true,
	build: {
		inlineStylesheets: "always",
	},
	prefetch: true,
});
