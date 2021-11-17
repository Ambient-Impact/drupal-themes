module.exports = function(grunt, options) {
  'use strict';

  // grunt-sass requires that we pass the Sass implementation in the options,
  // which we cannot do via a YAML file. See:
  // https://github.com/sindresorhus/grunt-sass/issues/288
  const sass = require('sass');

  const moduleImporter = require('sass-module-importer');

  // Make a copy of the component paths via Array.prototype.slice().
  let includePaths = options.componentPaths.slice();

  // Add the modules path as an include path so the theme Sass can reference
  // files from modules without the full relative path.
  includePaths.push(options.modulesPath);

  return {
    theme: {
      options: {
        implementation: sass,
        // Pass the modules path to the importer so it can find any referenced
        // Node modules that the modules Sass requires.
        importer:       moduleImporter({basedir: options.modulesPath}),
        includePaths:   includePaths,
        outputStyle:    'compressed',
        sourceMap:      true
      },
      files: [{
        src:
          '<%= extensionPaths %>/<%= stylesheetPaths %>/**/*.scss',
        ext:    '.css',
        extDot: 'last',
        expand: true,
      }]
    }
  };
};
