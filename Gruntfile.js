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
                    outputStyle : "nested",
                    precision : 10,
                    sourceMap : true
                },

                files : {
                    "styles.min.css": "scss/styles.scss"
                }
            }
        },

        uglify: {

            dev: {
                options: {
                    compress: true,
                    mangle: true,
                    preserveComments: false,
                    sourceMap: true
                },

                files: {
                    "app.min.js" : ["js/hammer.js", "js/app.js"]
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
              "styles.min.css": "styles.min.css"
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

    grunt.registerTask("run", ["sass:dev", "uglify:dev", "connect:server", "watch"]);
    grunt.registerTask("default", "run");
};