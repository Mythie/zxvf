import { build } from 'esbuild';

const isWatching = !!process.env.WATCH;

build({
  entryPoints: ['./src/index.ts'],
  outdir: './dist',
  format: 'cjs',
  platform: 'node',
  bundle: true,
  watch: isWatching,
})
  .then((result) => {
    if (!isWatching) {
      console.log('Build complete');
      process.exit(0);
    }

    console.log('Watching for changes...');

    process.on('SIGINT', () => {
      result.stop && result.stop();

      console.log('Watching stopped');
    });
  })
  .catch((err) => {
    console.log('Build failed', err);
    process.exit(1);
  });
