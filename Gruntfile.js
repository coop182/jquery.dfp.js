module.exports = function(grunt) {

// Project configuration.
grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	jshint: {
		all: ['Gruntfile.js', 'jquery.dfp.js', 'tests/spec/*.js']
	},
	uglify: {
		options: {
			banner: '/**\n * jQuery DFP v<%= pkg.version %>\n * http://github.com/coop182/jquery.dfp.js\n *\n * Copyright <%= grunt.template.today("yyyy") %> Matt Cooper\n * Released under the MIT license\n */\n'
		},
		build: {
			src: 'jquery.dfp.js',
			dest: 'jquery.dfp.min.js'
		}
	},
	jasmine: {
		components: {
			src: ['jquery.dfp.js'],
			options: {
				vendor: ['http://code.jquery.com/jquery-1.7.2.js'],
				specs: 'tests/spec/*Spec.js'
			}
		}
	}
});

// Load the plugin that provides the "jshint" task.
grunt.loadNpmTasks('grunt-contrib-jshint');

// Load the plugin that provides the "uglify" task.
grunt.loadNpmTasks('grunt-contrib-uglify');

// Load the plugin that provides the "jasmine" task.
grunt.loadNpmTasks('grunt-contrib-jasmine');

// Default task(s).
grunt.registerTask('default', ['jshint', 'jasmine', 'uglify']);

// Travis task(s).
grunt.registerTask('travis', ['jshint', 'jasmine']);

};