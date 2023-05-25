import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';
import vitePluginWindicss from 'vite-plugin-windicss';


export default defineConfig({
    plugins: [
        laravel({
            input: path.resolve(__dirname, 'src_react/main.jsx'),
            refresh: true,
        }),
        reactRefresh(),
        vitePluginWindicss(),
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
                assetFileNames: '[name].[ext]',
            },
        },
    },
});
