const esbuild = require('esbuild');
const fs = require('fs');

/** Verify if public folder is created if not will create all */
if (!fs.existsSync('public')) {
  fs.mkdirSync('public');
}

console.log('--> Copying index.html');
fs.copyFileSync('./frontend/index.html', './public/index.html');

esbuild.build({
  entryPoints: ['./frontend/index.jsx'],
  outdir: 'public',
  minify: true,
  bundle: true,
  sourcemap: 'external',
  allowOverwrite: true,
  logLevel: 'info',
});