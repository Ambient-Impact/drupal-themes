'use strict';

const autoprefixer = require('autoprefixer');
const fs = require('fs');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

const isDev = (process.env.NODE_ENV !== 'production');

const distPath = '.webpack-dist';

/**
 * Whether to output to the paths where the source files are found.
 *
 * If this is true, compiled Sass files, source maps, etc. will be placed
 * alongside their source files. If this is false, built files will be placed in
 * the dist directory defined by distPath.
 *
 * @type {Boolean}
 */
const outputToSourcePaths = true;

/**
 * Get globbed entry points.
 *
 * This uses the 'glob' package to automagically build the array of entry
 * points, as there are a lot of them spread out over many components.
 *
 * @return {Array}
 *
 * @see https://www.npmjs.com/package/glob
 */
function getGlobbedEntries() {

  return glob.sync(
    // This specifically only searches for SCSS files that aren't partials, i.e.
    // do not start with '_'.
    `./!(${distPath})/**/!(_)*.scss`
  ).reduce(function(entries, currentPath) {

      const parsed = path.parse(currentPath);

      entries[`${parsed.dir}/${parsed.name}`] = currentPath;

      return entries;

  }, {});

};

/**
 * Array of plug-in instances to pass to Webpack.
 *
 * @type {Array}
 */
let plugins = [
  new RemoveEmptyScriptsPlugin(),
  new MiniCssExtractPlugin(),
];

/** @type {String} The base theme prefix. */
const baseThemePrefix = 'base:';

/**
 * Sass importer to resolve base theme stylesheet paths.
 *
 * @param {String} url
 *   The path to import or use.
 *
 * @param {String} prev
 *   The previously resolved path.
 *
 * @param {Function} done
 *   Callback to invoke on async completion.
 *
 * @return {Promise|null}
 *
 * @see https://github.com/sass/node-sass#importer--v200---experimental
 *   Importer callback documentation.
 */
function baseThemeImporter(url, prev, done) {

  if (url.indexOf(baseThemePrefix) === 0) {
    return done({
      file: path.normalize(
        './ambientimpact_base/stylesheets/' + url.substring(
          baseThemePrefix.length
        )
      )
    });
  }

  // If we didn't match, return null so that this is passed on
  return null;

};

const componentsJsonPath = require.resolve(
  'ambientimpact-drupal-modules/components.json'
);

const componentPaths = JSON.parse(
  fs.readFileSync(componentsJsonPath).toString()
);

module.exports = {

  mode:     'development',
  devtool:  isDev ? 'eval':  false,

  entry: getGlobbedEntries,

  plugins: plugins,

  output: {

    path: path.resolve(__dirname, (outputToSourcePaths ? '.' : distPath)),

    // Be very careful with this - if outputting to the source paths, this must
    // not be true or it'll delete everything contained in the directory without
    // warning.
    clean: !outputToSourcePaths,

    // Since Webpack started out primarily for building JavaScript applications,
    // it always outputs a JS files, even if empty. We place these in a
    // temporary directory by default.
    filename: 'temp/[name].js',

    // Asset bundling/copying disabled for now.
    //
    // @see https://stackoverflow.com/questions/68737296/disable-asset-bundling-in-webpack-5#68768905
    assetModuleFilename: '[file]',

  },

  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev,
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: isDev,
              postcssOptions: {
                plugins: [
                  autoprefixer(),
                ],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev,
              sassOptions: {
                importer: [
                  baseThemeImporter,
                ],
                includePaths: componentPaths.map(function(relativePath) {
                  return path.resolve(
                    path.dirname(componentsJsonPath), relativePath
                  );
                }),
              }
            },
          },
        ],
      },
     {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        type: 'asset/resource',
        // Asset bundling/copying disabled for now.
        //
        // @see https://stackoverflow.com/questions/68737296/disable-asset-bundling-in-webpack-5#68768905
        generator: {
          emit: false,
        },
      },
    ],
  }
};
