import esbuild from 'esbuild';

esbuild
    .build({
        entryPoints: ['src/app.ts'],
        bundle: true,
        minify: true,
        sourcemap: true,
        packages: 'external',
        format: 'esm',
        platform: 'node',
        outdir: 'dist'
    })
    .catch(() => process.exit(1));
