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
            '@': path.resolve(__dirname, 'src_react'), // Popraw ścieżkę do folderu src_react
        },
    },
    build: {
        outDir: 'public/js',
        assetsDir: '',
        rollupOptions: {
            input: path.resolve(__dirname, 'src_react/main.jsx'), // Popraw ścieżkę do pliku main.jsx
        },
    },
});
