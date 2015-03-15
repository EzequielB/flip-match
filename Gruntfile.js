'use strict';

module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		requirejs: {
			dist: {
				// Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
				options: {
					baseUrl: "app/js",
					mainConfigFile: "app/js/init.js",
					include: ["main"],
					out: "dist/js/init.js",
					optimize: "none"
				}
			}
		},
		clean: {
			dist: ['dist/*']
		},
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: 'app',
					dest: 'dist',
					src: [
						'css/*',
						'index.html'
					]
				}, {
					expand: true,
					dot: true,
					cwd: 'app',
					dest: 'dist',
					src: [
						'bower_components/bootstrap/dist/css/bootstrap.min.css',
						'bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff',
						'bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf',
						'bower_components/requirejs/require.js'
					]
				}]
			}
		},
	});

	grunt.registerTask('build', [
		'clean',
		'requirejs',
		'copy'
	]);

};
