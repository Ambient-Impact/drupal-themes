module.exports = function(grunt) {
  'use strict';

  // Load our Grunt task configs from external files in the 'grunt' directory.
  require('load-grunt-config')(grunt, {
    init: true,
    data: {
      themePaths:       [
        'ambientimpact_base',
        'ambientimpact_site',
      ].join(','),
      stylesheetPaths:  'stylesheets,components',
      javascriptPaths:  'javascript,components'
    }
  });

  grunt.registerTask('all', [
    'sass',
    'postcss',
  ]);

  grunt.registerTask('css', [
    'sass',
    'postcss',
  ]);
};
