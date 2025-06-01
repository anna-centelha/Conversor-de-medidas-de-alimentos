module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    less: {
      development: {
        files: {
          "dist/css/style.css": "css/style.less"
        }
      }
    },

    uglify: {
      build: {
        files: {
          'dist/js/conversor.min.js': ['js/conversor.js']
        }
      }
    },

    watch: {
      styles: {
        files: ['css/*.less'],
        tasks: ['less']
      },
      scripts: {
        files: ['js/*.js'],
        tasks: ['uglify']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['less', 'uglify']);
};
