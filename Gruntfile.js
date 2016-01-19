module.exports = function(grunt) {

    "use strict";

    grunt.loadNpmTasks("grunt-sass");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-autoprefixer");

    grunt.initConfig({

        sass: {

            dev: {
                options: {
                    style: "compressed"
                },

                files : {
                    "styles.min.css": "scss/style.scss"
                }
            }
        },

        uglify: {

            dev: {
                options: {
                    compress: true,
                    mangle: true,
                    preserveComments: false
                },

                files: {
                    "app.min.js" : [
                    "js/hammer.js",
                    "js/app.js"
                    ]
                }
            }
        },

        connect: {

            server : {
                options: {
                    open: true
                }
            }
        },

        autoprefixer: {
          options: {
            browsers: ["last 8 versions"]
          },
          dist: { // Target
            files: {
              "styles.min.css": "scss/style.scss"
            }
          }
        },

        watch: {

            options: {
                livereload: true,
            },

            html: {
                files: ["index.html"],
            },

            js: {
                files: ["js/*.js"],
                tasks: ["uglify:dev"]
            },

            scss: {
                files: ["scss/*.scss"],
                tasks: ["sass:dev", "autoprefixer"]
            }
        }
    });

    grunt.registerTask("run", ["sass:dev", "uglify:dev", "connect:server", "autoprefixer", "watch"]);
    grunt.registerTask("default", "run");
};