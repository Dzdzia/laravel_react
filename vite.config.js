import { defineConfig } from 'vite';

import path from 'path';
import laravel from "laravel-vite-plugin";
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [
        react(),
         laravel({
             input:[
                'resources/css/index.css',
                'resources/js/main.jsx',
            ],
    refresh: true,

    }),
        ],
    }
    );


