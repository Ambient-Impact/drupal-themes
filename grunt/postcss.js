module.exports = function(grunt, options) {
  'use strict';

  return {
    theme: {
      options: {
        map: {
          inline: false
        },
        processors: [
          require('autoprefixer')
        ]
      },
      files: [{
        src:
          '{<%= themePaths %>}/{<%= stylesheetPaths %>}/**/*.css',
        ext:  '.css',
        extDot: 'last',
        expand: true,
      }]
    }
  };
};