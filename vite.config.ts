import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
    base: "/mcalc",
    server: {
        port: 3000,
        open: true
    },
    plugins: [
        react(),
        VitePWA({
            strategies: "generateSW",
            manifest: {
                name: 'MCalc',
                short_name: 'MCalc',
                description: 'MCalc',
                theme_color: "#49ac67",
                background_color: "#49ac67",
                icons: [
                    {
                        "src": "pwa-64x64.png",
                        "sizes": "64x64",
                        "type": "image/png"
                    },
                    {
                        "src": "pwa-192x192.png",
                        "sizes": "192x192",
                        "type": "image/png"
                    },
                    {
                        "src": "pwa-512x512.png",
                        "sizes": "512x512",
                        "type": "image/png"
                    },
                    {
                        "src": "maskable-icon-512x512.png",
                        "sizes": "512x512",
                        "type": "image/png",
                        "purpose": "maskable"
                    }
                ]

            },
            pwaAssets: {
                config: true,
                injectThemeColor: false,
                overrideManifestIcons: true
            },
            devOptions: {
                enabled: true,
                type: 'module',
            }
        })
    ]
})
