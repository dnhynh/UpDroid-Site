module.exports = function (grunt) {
    grunt.initConfig({
        less: {
            development: {
                files: {
                    "dist/resources/css/site.css": "src/resources/less/site.less"
                }
            }
        },
        cmq: {
            options: {
                log: false
            },
            your_target: {
                files: {
                    'dist/resources/css': ['dist/resources/css/site.css']
                }
            }
        },
        cssmin: {
            css: {
                src: 'dist/resources/css/site.css',
                dest: 'dist/resources/css/site.min.css'
            }
        },
        imagemin: {
            dynamic: {
                options: {
                    cache: false,
                    optimizationLevel: 7
                },
                files: [{
                    expand: true,
                    cwd: 'src/resources/images/',
                    src: ['**/*.{png,jpg,gif,svg}'],
                    dest: 'dist/resources/images/'
                }]
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/resources/js/plugins.js', 'src/resources/js/api.js'],
                dest: 'dist/resources/js/site.js'
            }
        },
        uglify: {
            my_target: {
                options: {
                    sourceMap: false
                },
                files: {
                    'dist/resources/js/site.min.js': ['dist/resources/js/site.js']
                }
            }
        },
        bake: {
            build: {
                files: {
                    // files go here, like so:
                    'dist/index.html': 'src/index.html',
                    'dist/about-us/index.html': 'src/about-us.html',
                    'dist/contact-us/index.html': 'src/contact-us.html'
                }
            }
        },
        browserSync: {
            bsFiles: {
                src :[
                    "dist/resources/css/*.css",
                    "dist/resources/js/*.js",
                    "dist/*.html"
                ]
            },
            options: {
                watchTask: true,
                server: {
                    baseDir: "./dist/"
                }
            }
        },
        watch: {
            css: {
                files: ['src/resources/less/*.less', 'src/resources/bootstrap/*.less', 'dist/resources/css/*.css'],
                tasks: ['less', 'cmq', 'cssmin'],
                options: {
                    nospawn: true
                }
            },
            js: {
                files: ['src/resources/js/*.js', 'dist/resources/js/site.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    nospawn: true
                }
            },
            images: {
                files: ['src/resources/images/**/*.{png,jpg,gif,svg}'],
                tasks: ['newer:imagemin:dynamic'],
                options: {
                    nospawn: true
                }
            },
            html: {
                files: ['src/**/*.html'],
                tasks: ['bake:build'],
                options: {
                    nospawn: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-combine-media-queries');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-bake');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');

    grunt.registerTask('default', ['browserSync','watch']);
};