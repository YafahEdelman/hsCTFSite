var path = require('path');
module.exports = function(grunt) {

  // Project configuration.
	grunt.initConfig({
	    dogescript: {
		amaze: {
		    options: {
		        // optional beautify
		        // - default: true
		        beauty: true,

		        // optional enable true-doge mode
		        // - default: false
		        trueDoge: true,

		        // optional override compiler (handy for bleeding-edge/local editing)
		        // - string path, included via require() 
		        compiler: path.resolve('./node_modules/dogescript/index.js')
		    },
		    src: ['app.djs']
		}
	    }
	});
  	grunt.loadNpmTasks('grunt-dogescript');
       grunt.registerTask('default', ['dogescript']);


}
