module.exports = function (grunt) {
    grunt.initConfig({
        less: {
            development: {
                files: {
                    "resources/css/site.css": "src/less/site.less"
                }
            }
        },
        cmq: {
            options: {
                log: false
            },
            your_target: {
                files: {
                    'resources/css': ['resources/css/site.css']
                }
            }
        },
        cssmin: {
            css: {
                src: 'resources/css/site.css',
                dest: 'resources/css/site.min.css'
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
                    cwd: 'src/images/',
                    src: ['**/*.{png,jpg,gif,svg}'],
                    dest: 'resources/images/'
                }]
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/js/plugins.js', 'src/js/api.js'],
                dest: 'resources/js/site.js'
            }
        },
        uglify: {
            my_target: {
                options: {
                    sourceMap: false
                },
                files: {
                    'resources/js/site.min.js': ['resources/js/site.js']
                }
            }
        },
        bake: {
            build: {
                files: {
                    // files go here, like so:
                    'index.html': 'src/html/index.html',
                    'homepage.html': 'src/html/homepage.html'
                }
            }
        },
        browserSync: {
            bsFiles: {
                src :[
                    "resources/css/*.css",
                    "resources/js/*.js",
                    "*.html"
                ]
            },
            options: {
                watchTask: true,
                server: {
                    baseDir: "./"
                }
            }
        },
        watch: {
            css: {
                files: ['src/less/*.less', 'src/bootstrap/*.less', 'resources/css/*.css'],
                tasks: ['less', 'cmq', 'cssmin'],
                options: {
                    nospawn: true
                }
            },
            js: {
                files: ['src/js/*.js', 'resources/js/site.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    nospawn: true
                }
            },
            images: {
                files: ['src/images/**/*.{png,jpg,gif,svg}'],
                tasks: ['newer:imagemin:dynamic'],
                options: {
                    nospawn: true
                }
            },
            html: {
                files: ['src/html/**/*.html'],
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