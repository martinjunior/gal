module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'web/assets/css/screen.css': 'src/assets/scss/screen.scss'
                }
            }
        },

        watch: {
            files: [
                'src/**'
            ],
            tasks: ['default']
        },

        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: [
                            'assets/**',
                            '!assets/scss/**',
                            '!assets/scripts/*'
                        ],
                        dest: 'web/'
                    }
                ]
            },
            critical: {
                files: [
                    {
                        expand: true,
                        cwd: 'web/assets/css/',
                        src: ['screen.css'],
                        dest: 'src/partials/',
                        filter: 'isFile',
                        rename: function(dest, src) {
                            return dest + '_critical-css.hbs';
                        }
                    }
                ],
                options: {
                    process: function (content, srcpath) {
                        return content.replace(/url\(\.\./g, 'url(assets');
                    }
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 9']
            },
            no_dest: {
                src: 'web/assets/css/*.css'
            }
        },

        assemble: {
            options: {},
            site: {
                options: {
                    helpers: ['src/helpers/*.js'],
                    partials: ['src/partials/**/*.hbs'],
                    layout: ['src/layouts/default.hbs'],
                    assets: 'web/assets'
                },
                expand: true,
                cwd: 'src/',
                src: [
                    '*.hbs',
                    '**/*.hbs',
                    '!partials/**/*.hbs',
                    '!layouts/**/*.hbs'
                ],
                dest: 'web/'
            }
        },

        compressor:{
            html:{
                options:{
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'web/hardscaping-services.html': ['web/hardscaping-services.html'],
                    'web/index.html': ['web/index.html'],
                    'web/landscaping-services.html': ['web/landscaping-services.html'],
                    'web/snow-removal.html': ['web/snow-removal.html'],
                    'web/lawn-maintenance-services.html': ['web/lawn-maintenance-services.html'],
                    'web/planting-services.html': ['web/planting-services.html'],
                    'web/spring-and-fall-cleanups.html': ['web/spring-and-fall-cleanups.html'],
                    'web/tree-services.html': ['web/tree-services.html']

                }
            }
        },

        requirejs: {
            options: {
                baseUrl: 'src/assets/scripts',
                mainConfigFile: 'src/assets/scripts/config.js',
                generateSourceMaps: grunt.option('maps'),
                preserveLicenseComments: grunt.option('no-maps'),
                useStrict: true,
                pragmas: {
                    isProd: grunt.option('prod'),
                    isStage: grunt.option('stage'),
                    isDev: grunt.option('dev')
                },
                optimize: 'uglify2',
                uglify2: {
                    output: {
                        beautify: false,
                        comments: false
                    },
                    compress: {
                        sequences: false,
                        global_defs: {
                            DEBUG: false
                        }
                    },
                    warnings: false,
                    mangle: true
                }
            },
            buildScripts: {
                options: {
                    name: 'main',
                    out: 'web/assets/scripts/main.js'
                }
            }
        },

        uglify: {
            options: {
                compress: true
            },
            my_target: {
                files: {
                    'web/assets/vendor/requirejs/require.js': ['src/assets/vendor/requirejs/require.js'],
                    'web/assets/scripts/config.js': ['src/assets/scripts/config.js']
                }
            }
        }

    });
  
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-compressor');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('assemble');

    grunt.registerTask(
        'default',
        [
            'sass',
            'autoprefixer',
            'copy:critical',
            'assemble',
            'copy:main',
            'requirejs',
            'uglify',
            'compressor'
        ]
    );

};