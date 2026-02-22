import { defineConfig } from 'vite';

export default defineConfig({
    base: './', // Ensure relative paths for assets
    build: {
        outDir: 'dist',
    },
    server: {
        port: 3000,
        open: true,
    },
});
