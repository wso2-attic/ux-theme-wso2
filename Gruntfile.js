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
                    cwd: 'scss/config/default',
                    src: ['**/*.scss'],
                    dest: 'dist/css/',
                    ext: '.css'
                }]
            },
            product: {
                files: [{
                    expand: true,
                    cwd: 'scss/config/products/<%= grunt.option("sass.options.product") %>',
                    src: ['**/*.scss'],
                    dest: 'dist/products-css/<%= grunt.option("sass.options.product") %>',
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
                    cwd: 'dist/products-css/<%= grunt.option("sass.options.product") %>',
                    src: ['**/*.css', '!**/*.min.css'],
                    dest: 'dist/products-css/<%= grunt.option("sass.options.product") %>',
                    ext: '.min.css'
                }]
            }
        },
        concat: {
            dist: {
                options: {
                    banner: grunt.file.read('js/header.js'),
                    footer: grunt.file.read('js/footer.js'),
                },
                files: {
                    'dist/js/<%= pkg.name %>.js': JSON.parse(grunt.file.read('js/base.js')),
                },
            }
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
                    { expand: true, cwd: 'extensions/', src: ['**'], dest: 'dist/extensions/' },
                    { expand: true, cwd: 'js/vendor/bootstrap', src: ['bootstrap.js','bootstrap.min.js'], dest: 'dist/js/' }
                ],
            },
            docs: {
                files: [
                    {
                        expand: true,
                        cwd: 'dist',
                        src: ['**/*', '!css', 'css/default/**'],
                        dest: 'docs/libs/<%= pkg.name %>_<%= pkg.version %>'
                    },
                    {
                        expand: true,
                        cwd: 'scss',
                        src: ['**/*'],
                        dest: 'docs/_scss'
                    }
                ],
            },
            product: {
                files: [{
                    expand: true,
                    cwd: 'dist/products-css/<%= grunt.option("sass.options.product") %>',
                    src: ['**/*.css', '!**/*.min.css'],
                    dest: 'docs/libs/<%= pkg.name %>_<%= pkg.version %>/products-css/<%= grunt.option("sass.options.product") %>'
                }]
            }
        },
        zip: {
            'using-cwd': {
                cwd: 'dist/',
                src: [
                    'dist/css/**',
                    'dist/js/**',
                    'dist/fonts/**',
                    'dist/images/**',
                    'dist/extensions/**'
                ],
                dest: 'docs/downloads/<%= pkg.name %>_<%= pkg.version %>.zip'
            }
        },
        jekyll: {
            options: {
                src : 'docs',
                baseurl: '/'
            },
            dist: {
                options: {
                    dest: 'docs/_site',
                    config: 'docs/_config.yml'
                }
            },
            serve: {
                options: {
                    serve: true,
                    dest: 'docs/_site',
                    config: 'docs/_config.yml',
                    drafts: true,
                    future: true
                }
            }
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
                    grunt.log.writeln('      Sync SCSS: changed at ' + (new Date()).toString() + ' ...done in ' + (time / 1000.0) + ' seconds.');
                },
            },
            scss: {
                files: 'scss/**/*.scss',
                tasks: ['sync'],
                options: {
                    livereload: true,
                },
            }
        },
        concurrent: {
            target: {
                tasks: ['shell:jekyll_serve', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        shell: {
            jekyll_build: {
                command: 'jekyll build',
                stdout: true,
                options: {
                    stderr: false,
                    execOptions: {
                        cwd: 'docs'
                    }
                }
            },
            jekyll_serve: {
                command: function(){
                    var flags = grunt.option.flags();
                    flags = flags.toString();
                    flags = flags.replace(/([=,])|(--color)/g, ' ');
                    return 'jekyll serve --baseurl "" <%= grunt.option("jekyll.options.product") %> ' + flags;
                },
                stdout: true,
                options: {
                    stderr: false,
                    execOptions: {
                        cwd: 'docs'
                    }
                }
            }
        },
        sasslint: {
            options: {
                configFile: '.sass-lint.yml',
                formatter: 'json',
                outputFile: 'report.json'
            },
            target: [
                'scss/\modules/\**.scss',
                'scss/\config/\**.scss',
                'scss/\base.scss'
            ]
        },
        "json-format": {
            test: {
                options: {
                    indent: 4,
                    remove: ['_comment']
                },
                files: [
                    {
                        expand: true,
                        src:  ['report.json'],
                        dest: './'
                    },
                ]
            }
        }
    });
    
    // Load the plugin that provides the “uglify” task.
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sync');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-zip');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-sass-lint');
    grunt.loadNpmTasks('grunt-json-format');
    
    // Default task(s).   
    grunt.registerTask('default', ['sass:default','cssmin:all','concat','uglify','copy','zip']);
    grunt.registerTask('docs', ['shell:jekyll_build']);
    grunt.registerTask('serve', ['concurrent:target']);
    grunt.registerTask('test-scss', ['sasslint','json-format']);
    
//    grunt.registerTask('serve', function(arg) {
//        if(!arg){
//            grunt.task.run(['concurrent:target']);
//        }
//        else{
//            grunt.log.writeln('');
//            grunt.log.writeln('Jekyll server is running with custom configuration of product-' + arg + ' ...');
//            
//            var filepath = 'scss/config/products/product-' + arg;
//            
//            if(grunt.file.isDir(filepath)){
//                grunt.option('jekyll.options.product', '--css "product-' + arg + '"');
//                grunt.task.run(['concurrent:target']);
//            }
//            else {
//                grunt.log.writeln('');
//                grunt.log.error('Couldn\'t find product-' + arg + ' in scss config folder. Please check the path "scss/config/products/" and run the command');
//            }
//        }
//    }); 
    
    grunt.registerTask('product', function(arg) {
        if(!arg){
            
            grunt.log.writeln('');
            grunt.log.writeln('You have to select a product');
            grunt.log.writeln('------------------------------------------------------');
            grunt.log.writeln('To build individual products, run the command again with :<product-short-name>. e.g. "grunt product:apim"');
            grunt.log.writeln('Or to build all the product css files, run the command "grunt product:all"');

            
        } else if(arg == 'all'){
            
            grunt.log.writeln('');
            grunt.log.writeln('building css files of all products ...');
            grunt.task.run(['sass:all','cssmin:all','copy:all']);
        
        } else if(arg == 'default'){
            
            grunt.log.writeln('');
            grunt.log.writeln('building the default theme css files ...');
            grunt.task.run(['sass:default','cssmin:default', 'copy:default']);
        
        } else {
            
            grunt.log.writeln('');
            grunt.log.writeln('building css files of product-' + arg + ' ...');
            
            var filepath = 'config/products/product-' + arg;
            
            if(grunt.file.isDir(filepath)){
                grunt.option('sass.options.product', 'product-' + arg);
                grunt.task.run(['sass:product','cssmin:product', 'copy:product']);
            }
            else {
                grunt.log.writeln('');
                grunt.log.error('Couldn\'t find product-' + arg + ' in scss config folder. Please check the path "scss/config/products/" and run the command');
            }
            
        }
    }); 

};