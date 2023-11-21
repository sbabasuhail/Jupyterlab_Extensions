const CopyWebpackPlugin = require('copy-webpack-plugin');

/**
 * Resolves the module name and normalizes slashes to be posix/unix-like forward slashes.
 *
 * @param moduleName The name of the module to be searched for
 * @returns The module path normalized
 */
function resolveModule(moduleName) {
  const module = require.resolve(moduleName);
  return module.replace(/\\+/g, '/');
}

/**
 * This function will find out the module path using node `require.resolve` function
 * and add the suffix param after the folder with module name.
 *
 * @param moduleName "@module/name"
 * @param suffix to be added after the module path
 * @returns the /path/to/@module/name/<suffix>
 */
function getModulePath(moduleName, suffix, packageJsonWorkaround = false) {
  const moduleNameWithSlashes = `/${moduleName}/`;
  const module = resolveModule(
    moduleName + (packageJsonWorkaround ? '/package.json' : '')
  );

  const modulePosition = module.lastIndexOf(moduleNameWithSlashes);
  return `${module.slice(
    0,
    modulePosition + moduleNameWithSlashes.length
  )}${suffix}`;
}

module.exports = {
  plugins: [
    // copy the shared dependencies js bundles to the "bundles" folder
    new CopyWebpackPlugin({
      patterns: [
        { from: 'static', to: 'bundles/' },
        { from: getModulePath('es-module-shims', 'dist'), to: 'bundles/' },
        {
          from: getModulePath(
            '@hitachivantara/app-shell-vite-plugin',
            'dist/esm-externals',
            true
          ),
          to: 'bundles/'
        },
        {
          from: resolveModule(
            '@hitachivantara/app-shell-shared/bundles/app-shell-shared.esm.js'
          ),
          to: 'bundles/'
        },
        {
          from: resolveModule(
            '@hitachivantara/uikit-react-shared/bundles/uikit-react-shared.esm.js'
          ),
          to: 'bundles/'
        },
        {
          from: getModulePath(
            '@hitachivantara/uikit-react-icons',
            'dist/sprites/'
          ),
          to: 'icons/'
        }
      ]
    })
  ]
};
