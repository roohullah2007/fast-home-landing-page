import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';
import { compression } from 'vite-plugin-compression2';
import { constants as zlibConstants } from 'zlib';

export default defineConfig(({ isSsrBuild }) => ({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            ssr: 'resources/js/ssr.jsx',
            refresh: true,
            // Build to public/app-assets instead of the default public/build.
            // The production server's old public/build is owned by another user
            // and can't be overwritten by the git deploy; a fresh directory
            // sidesteps that permission lock without needing server access.
            buildDirectory: 'app-assets',
        }),
        react({
            // Enable automatic JSX runtime
            jsxRuntime: 'automatic',
        }),
        // Pre-compress ONLY the browser-served client bundle. The SSR bundle
        // (bootstrap/ssr) is run by Node and never served to a browser, so
        // compressing it is pure CPU waste — skip it to speed up the build.
        ...(isSsrBuild ? [] : [
            // Gzip compression. The exclude regex MUST be /\.(gz|br)$/ with no
            // stray space — a space before the closing slash makes it never
            // match, so each plugin re-compresses the other's output and you get
            // "overwrites a previously emitted file" warnings + wasted CPU.
            compression({
                algorithm: 'gzip',
                exclude: [/\.(gz|br)$/],
            }),
            // Brotli compression (better than gzip). quality 10 builds much
            // faster than the default 11 with a negligible size difference.
            compression({
                algorithm: 'brotliCompress',
                exclude: [/\.(gz|br)$/],
                compressionOptions: { params: { [zlibConstants.BROTLI_PARAM_QUALITY]: 10 } },
            }),
        ]),
        // vite-plugin-compression2 leaves worker handles open that keep Node
        // alive after the build is done: `vite build` prints its full summary
        // then hangs forever, stalling CI (and previously the on-server build).
        // Force a clean exit on the final build hook. Safe because: closeBundle
        // runs after every asset (incl. compressed) is flushed to disk; dev mode
        // (`vite` serve) never calls it; and `npm run build:ssr` runs two
        // separate processes via `&&`, so each exits 0 and the chain continues.
        {
            name: 'force-exit-after-build',
            closeBundle() {
                process.exit(0);
            },
        },
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './resources/js'),
        },
    },
    build: {
        // Optimize build output
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.trace'],
            },
        },
        // CSS code splitting
        cssCodeSplit: true,
        // Source maps for production debugging (disable for faster builds)
        sourcemap: false,
        // Chunk size warning
        chunkSizeWarningLimit: 1000,
        rollupOptions: {
            output: {
                // Conservative chunking to prevent React module duplication
                manualChunks: (id) => {
                    if (id.includes('node_modules')) {
                        // Heavy chart libraries - lazy loaded only
                        if (id.includes('recharts') || id.includes('d3-')) {
                            return 'charts';
                        }
                        // Everything else in vendor (React, Inertia, Headless UI together)
                        return 'vendor';
                    }
                },
                // Optimize chunk file names
                chunkFileNames: 'assets/js/[name]-[hash].js',
                // SSR entry must be emitted UNHASHED at bootstrap/ssr/ssr.js:
                // Laravel's Inertia BundleDetector only looks for that exact
                // path (or ssr.mjs), and when it finds nothing the HttpGateway
                // silently skips SSR and every page falls back to client-side
                // rendering — even with the SSR server running.
                entryFileNames: isSsrBuild ? '[name].js' : 'assets/js/[name]-[hash].js',
                assetFileNames: ({ name }) => {
                    if (/\.(gif|jpe?g|png|svg|webp)$/.test(name ?? '')) {
                        return 'assets/images/[name]-[hash][extname]';
                    }
                    if (/\.css$/.test(name ?? '')) {
                        return 'assets/css/[name]-[hash][extname]';
                    }
                    return 'assets/[name]-[hash][extname]';
                },
            },
        },
        // Asset inlining threshold
        assetsInlineLimit: 4096, // 4kb
    },
    optimizeDeps: {
        include: ['react', 'react-dom', '@inertiajs/react', '@headlessui/react'],
        exclude: ['recharts'],  // Lazy load heavy libraries
        esbuildOptions: {
            target: 'es2020',
        },
    },
    performance: {
        hints: 'warning',
        maxAssetSize: 512000, // 500 KiB
        maxEntrypointSize: 512000, // 500 KiB
    },
    server: {
        host: 'localhost',
        // Dedicated port for THIS project. strictPort makes Vite fail loudly if
        // the port is already taken instead of silently sharing 5173 with another
        // project's dev server (which caused the browser to load the wrong app's
        // .tsx pages and 404 on HomePage).
        port: 5174,
        strictPort: true,
        hmr: {
            host: 'localhost',
        },
    },
}));
