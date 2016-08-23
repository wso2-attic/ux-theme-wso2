var path = require('path'),
    wso2banner = '/*' +
                 '~   Copyright (c) WSO2 Inc. (http://wso2.com) All Rights Reserved.'+
                 '~'+
                 '~   Licensed under the Apache License, Version 2.0 (the "License");'+
                 '~   you may not use this file except in compliance with the License.'+
                 '~   You may obtain a copy of the License at'+
                 '~'+
                 '~        http://www.apache.org/licenses/LICENSE-2.0'+
                 '~'+
                 '~   Unless required by applicable law or agreed to in writing, software'+
                 '~   distributed under the License is distributed on an "AS IS" BASIS,'+
                 '~   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.'+
                 '~   See the License for the specific language governing permissions and'+
                 '~   limitations under the License.'+
                 '*/';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            default: {
                files: [{
                    expand: true,
                    cwd: 'config/default',
                    src: ['**/*.scss'],
                    dest: 'dist/css/default',
                    ext: '.css'
                }]
            },
            all: {
                files: [{
                    expand: true,
                    cwd: 'config',
                    src: ['**/*.scss'],
                    dest: 'dist/css',
                    ext: '.css'
                }]
            },
            product: {
                files: [{
                    expand: true,
                    cwd: 'config/products/<%= grunt.option("sass.options.product") %>',
                    src: ['**/*.scss'],
                    dest: 'dist/css/products/<%= grunt.option("sass.options.product") %>',
                    ext: '.css'
                }]
            }
        },
        cssmin: {
            default: {
                files: [{
                    expand: true,
                    cwd: 'dist/css/default',
                    src: ['**/*.css', '!**/*.min.css'],
                    dest: 'dist/css/default',
                    ext: '.min.css'
                }]
            },
            all: {
                files: [{
                    expand: true,
                    cwd: 'dist/css',
                    src: ['**/*.css', '!**/*.min.css'],
                    dest: 'dist/css',
                    ext: '.min.css'
                }]
            },
            product: {
                files: [{
                    expand: true,
                    cwd: 'dist/css/products/<%= grunt.option("sass.options.product") %>',
                    src: ['**/*.css', '!**/*.min.css'],
                    dest: 'dist/css/products/<%= grunt.option("sass.options.product") %>',
                    ext: '.min.css'
                }]
            }
        },
        concat: {
            dist: {
                files: {
                    'dist/js/<%= pkg.name %>.js': [
                        'js/header.js',
                        'js/modules/loading.js',
                        'js/modules/functions.js',
                        'js/footer.js',
                        'js/modules/optional.js'
                    ],
                },
            },
        },
        uglify: {
            options: {
                mangle: false,
                banner: wso2banner  
            },
            js: {
                files: [{
                    expand: true,
                    cwd: 'dist/js',
                    src: ['**/*.js', '!**/*.min.js'],
                    dest: 'dist/js',
                    ext: '.min.js'
                }]
            }
        },
        copy: {
            main: {
                files: [
                    { expand: true, cwd: 'fonts/', src: ['**'], dest: 'dist/fonts/' },
                    { expand: true, cwd: 'images/', src: ['**'], dest: 'dist/images/' },
                    { expand: true, cwd: 'extensions/', src: ['**'], dest: 'dist/extensions/' }
                ],
            },
            docs: {
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: ['**/*', '!css', 'css/default/**'],
                    dest: 'docs/libs/<%= pkg.name %>_<%= pkg.version %>'
                }],
                files: [{
                    expand: true,
                    cwd: 'scss',
                    src: ['**/*'],
                    dest: 'docs/_scss'
                }]
            },
        },
        jekyll: {
            options: {
              src : 'docs'
            },
            dist: {
              options: {
                dest: 'docs/_site',
                config: 'docs/_config.yml'
              }
            },
        },
        sync: {
            update_scss_in_docs: {
              files: [
                { cwd: 'scss', src: '**/*.scss', dest: 'docs/_scss' },
              ]
            }
        },
        watch: {
            options: {
                dateFormat: function(time) {
                    grunt.log.writeln('');
                    grunt.log.writeln('Watching for SCSS changes');
                    grunt.log.writeln('------------------------------------------------------');
                    grunt.log.writeln('Regenerating: Changed at ' + (new Date()).toString() + ' ...done in ' + time + ' ms.');
                    grunt.log.writeln('Waiting for more changes...');
                },
            },
            css: {
                files: 'scss/**/*.scss',
                tasks: ['sync'],
                options: {
                    livereload: true,
                },
            },
        },
    });
    
    // Load the plugin that provides the “uglify” task.
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-sync');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jekyll');
    
    // Default task(s).   
    grunt.registerTask('default', ['sass:all','cssmin:all','concat','uglify','copy']);
    grunt.registerTask('watch', ['watch']);
    grunt.registerTask('css', function(arg) {
        if(!arg){
            
            grunt.log.writeln('');
            grunt.log.writeln('You have to select a product');
            grunt.log.writeln('------------------------------------------------------');
            grunt.log.writeln('To build individual products, run the command again with :<product-short-name>. e.g. "grunt css:apim"');
            grunt.log.writeln('Or to build all the product css files, run the command "grunt css:all"');

            
        } else if(arg == 'all'){
            
            grunt.log.writeln('');
            grunt.log.writeln('building css files of all products ...');
            grunt.task.run(['sass:all','cssmin:all']);
        
        } else if(arg == 'default'){
            
            grunt.log.writeln('');
            grunt.log.writeln('building the default theme css files ...');
            grunt.task.run(['sass:default','cssmin:default']);
        
        } else {
            
            grunt.log.writeln('');
            grunt.log.writeln('building css files of product-' + arg + ' ...');
            
            var filepath = 'config/products/product-' + arg;
            
            if(grunt.file.isDir(filepath)){
                grunt.option('sass.options.product', 'product-' + arg);
                grunt.task.run(['sass:product','cssmin:product']);
            }
            else {
                grunt.log.writeln('');
                grunt.log.error('Couldn\'t find product-' + arg + ' in config folder. Please check the path "config/products/" and run the command');
            }
            
        }
    }); 

};