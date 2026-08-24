import {
    createAppleSplashScreens,
    defineConfig,
    minimal2023Preset as preset,
} from '@vite-pwa/assets-generator/config';

export default defineConfig({
    headLinkOptions: {
        preset: '2023',
    },
    preset: {
        ...preset,
        appleSplashScreens: createAppleSplashScreens({
            padding: 0.3,
            resizeOptions: { fit: 'contain', background: '#49ac67' },
            darkResizeOptions: { fit: 'contain', background: '#1c1c1e' },
            linkMediaOptions: {
                log: true,
                addMediaScreen: true,
                xhtml: true,
            },
        }),
    },
    images: ['public/logo.png'],
});