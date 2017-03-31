module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: {
          src: "client/scripts/client.js",
          dest: "server/public/scripts/client.min.js"
         }
    },
    copy: {
      main: {
        expand: true,
        cwd: "node_modules/",
        src: ["jquery/dist/jquery.js","bootstrap/dist/*/*"],
        dest: "server/public/vendors/"
      },
      html: {
        expand: true,
        cwd: "client/views/",
        src: ["index.html"],
        dest: "server/public/views/"
      },
      css: {
        expand: true,
        cwd: "client/styles/",
        src: ["style.css"],
        dest: "server/public/views/"
      }
    },
    watch: {
      configFiles: {
        files: [ 'Gruntfile.js', 'config/*.js' ],
        options: {
          reload: true
        }
      },
      clientFiles: {
        files: ["client/scripts/*.js", "client/views/*.html", "client/styles/style.css"],
        tasks: ['uglify', 'copy']
      }
    }

  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['uglify', 'copy', 'watch']);
};
