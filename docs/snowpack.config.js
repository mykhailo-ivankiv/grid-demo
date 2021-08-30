// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  optimize: {
    bundle: true,
    minify: true,
    target: 'es2018',
  },
  mount: {
    /* ... */
  },
  plugins: ['snowpack-plugin-less'],
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    out: 'docs',

    /* ... */
  },
  exclude: ['**/node_modules/**/*', '**/.idea/**/*', '**/.git/**/*'],
}
