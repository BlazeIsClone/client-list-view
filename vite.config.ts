import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { resolve } from 'path';

/**
 * Configuring Vite
 *
 * we can use the defineConfig helper which should
 * provide intellisense
 *
 * @see https://vitejs.dev/config
 */
export default defineConfig({
	envPrefix: 'APP_',
	envDir: '../',
	root: './src',
	build: {
		emptyOutDir: true,
		outDir: '../dist',
	},
	server: {
		port: 5000,
		host: '0.0.0.0',
	},
	preview: {
		port: 5000,
		host: '0.0.0.0',
	},
	plugins: [
		react(),
		tsconfigPaths({
			projects: [resolve(__dirname, 'tsconfig.json')],
		}),
	],
});
