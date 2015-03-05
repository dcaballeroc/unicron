module.exports = function() {
    var ts = '**/*.ts';
    var js = '**/*.js';
    var htmls = '**/*.html';
    var root = './';
    var src = root + 'src/';
    var build = root + 'build/';
    var temp = root + '.tmp/';
    var index = src + 'index.html';
    var config = {
        /**
         * Files paths
         */
        sourceTs:[
            src + ts,
        ],
        sourceHtmls: [
                        src + htmls,
                        '!' + index
                     ],
        build: './build/',
        buildTs: build + ts,
        buildJs: build + js,
        buildHtmls: build + htmls,
        root: root,
        fonts: './bower_components/font-awesome/fonts/**/*.*',
        images: src + 'images/**/*.*',
        compiledJs: [
            build +  '**/*.module.js',
            build + js
        ],
        css: temp + 'styles.css',
        buildMaps: build + js + '.map',
        configTs:[
           './*.ts'
        ],
        temp: temp,
        less: src + 'styles/styles.less',
        index: index,
        buildIndex: build + 'index.html',
        /**
        + TSC options
        */
        tsc: {
             module: 'commonjs',
             declarationFiles: true,
             emitError: false
        },
        /**
        * SourceMaps Options
        **/
        sourceMaps: {
           pathToWrite: '../build',
           configMaps:  {
            includeContent: false,
            sourceRoot: '/build/app'
            }
        },
        /**
         * Bower and NPM locations
         */
        bower: {
            json: require('./bower.json'),
            directory: './bower_components/',
            ignorePath: '../..'
        },
         /**
         * optimized files
         */
        optimized: {
            app: 'app.js',
            lib: 'lib.js'
        },
         /**
         * template cache
         */
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'appCommon',
                standAlone: false
                
            }
        },
       /**
         * Nancy Settings
         */
        defaultPort: 5966
    };
    config.getWiredepDefaultOptions = function() {
        var options = {
                bowerJson: config.bower.json,
                directory: config.bower.directory,
                ignorePath: config.bower.ignorePath
        };
        return options;
    };
    return config;
};
