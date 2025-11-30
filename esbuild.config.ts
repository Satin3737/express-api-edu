import dotenv from 'dotenv';
import esbuild from 'esbuild';

dotenv.config();

esbuild
    .build({
        entryPoints: ['src/app.ts'],
        bundle: true,
        minify: true,
        sourcemap: true,
        packages: 'external',
        format: 'esm',
        platform: 'node',
        outdir: 'dist',
        define: Object.fromEntries(
            Object.entries(process.env).map(([key, value]) => [`process.env.${key}`, JSON.stringify(value)])
        )
    })
    .catch(() => process.exit(1));
