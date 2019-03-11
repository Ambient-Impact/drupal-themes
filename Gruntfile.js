module.exports = function(grunt) {

	grunt.initConfig({
		pkg:				grunt.file.readJSON('package.json'),

		themePaths:			'ambientimpact_base,' +
							'ambientimpact_site',
		stylesheetPaths:	'stylesheets,components',
		javascriptPaths:	'javascript,components',

		librariesPath:		'assets/vendor',

		sass: {
			module: {
				options: {
					outputStyle:	'compressed',
					sourceMap:		true
				},
				files: [{
					src:
						'{<%= themePaths %>}/{<%= stylesheetPaths %>}/**/' +
						'*.scss',
					ext:	'.css',
					extDot:	'last',
					expand:	true,
				}]
			}
		},
		autoprefixer: {
			module: {
				options: {
					map: true
				},
				files: [{
					src:
						'{<%= themePaths %>}/{<%= stylesheetPaths %>}/**/' +
						'*.css',
					ext:	'.css',
					extDot:	'last',
					expand:	true,
				}]
			}
		},
		uglify: {
			module: {
				options: {
					compress: {
						// Note that this removes all console.* calls, not just
						// console.log():
						// https://github.com/gruntjs/grunt-contrib-uglify#turn-off-console-warnings
						drop_console: true
					}
				},
				src:	[
					'{<%= themePaths %>}/{<%= javascriptPaths %>}/**/*.js',
					'!**/*.min.js'
				],
				ext:	'.min.js',
				extDot:	'last',
				expand:	true,
			}
		}
	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('all', [
		'sass',
		'autoprefixer',
		'uglify',
	]);

	grunt.registerTask('css', [
		'sass',
		'autoprefixer',
	]);
};
