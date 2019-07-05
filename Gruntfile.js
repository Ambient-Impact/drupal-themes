module.exports = function(grunt) {
  'use strict';

  // Load our Grunt task configs from external files in the 'grunt' directory.
  var configs = require('load-grunt-configs')(grunt, {
    config: {
      src: 'grunt/*'
    }
  });

  // Initialize the Grunt config with the read config plus the package and paths
  // merged in.
  grunt.initConfig(Object.assign(configs, {
    pkg:              grunt.file.readJSON('package.json'),

    themePaths:       [
      'ambientimpact_base',
      'ambientimpact_site',
    ].join(','),
    stylesheetPaths:  'stylesheets,components',
    javascriptPaths:  'javascript,components'
  }));

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-postcss');

  grunt.registerTask('all', [
    'sass',
    'postcss',
  ]);

  grunt.registerTask('css', [
    'sass',
    'postcss',
  ]);
};
