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
                            '!assets/scss/**'
                        ],
                        dest: 'web/'
                    }
                ]
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
        }

    });
  
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('assemble');

    grunt.registerTask('default', ['assemble', 'sass', 'copy', 'autoprefixer']);

};