const esbuild = require('esbuild');

// chokidar Fast cross-platform command line utility to watch file system changes.
const chokidar = require('chokidar');
const fs = require('fs');

if (!fs.existsSync('public')) {
  fs.mkdirSync('public');
}

chokidar.watch(['./frontend/index.html'], { interval: 100 }).on('all', () => {
  console.log('index.html changed, copying...');
  fs.copyFileSync('./frontend/index.html', './public/index.html');
});

esbuild.build({
  entryPoints: ['./frontend/index.jsx'],
  outdir: 'public',
  minify: false,
  bundle: true,
  sourcemap: 'external',
  logLevel: 'info',
  allowOverwrite: true,
  watch: true,
});