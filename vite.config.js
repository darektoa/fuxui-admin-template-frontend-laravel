import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/App.jsx"],
            refresh: true,
        }),
    ],
    resolve: {
        alias: {
            "@": "/resources/js",
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(path) {
                    console.log(path);
                    if (path.includes("node_modules")) {
                        return "vendor";
                    }
                    
                    if (path.includes("resources/js/")) {
                        // Buat chunk terpisah untuk setiap modul dalam resources/js
                        const parts = path.split("resources/js/");
                        return parts[1].split("/")[0];
                    }
                },
            }, // Set batas ukuran chunk agar peringatan tidak muncul
            chunkSizeWarningLimit: 500,
        },
    },
});
