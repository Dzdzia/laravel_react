import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css'],
            refresh: true,
        }),
        reactRefresh(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src_react'),
        },
    },
    build: {
        outDir: 'public/js',
        assetsDir: '',
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, 'src_react/main.jsx'),
            },
            output: {
                entryFileNames: 'main.js',
                chunkFileNames: 'main.js',
                assetFileNames: 'main.js',
            },
        },
    },
});
