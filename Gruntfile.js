module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      options: {
        livereload: true,
      },
      html: {
        files: ['index.html'],
      },
      css: {
        files: ['style.css'],
      },
      js: {
        files: ['conversor.js'],
      },
    },

    connect: {
      server: {
        options: {
          port: 8000,
          base: '.',
          livereload: true,
          open: true,
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['connect', 'watch']);
};
