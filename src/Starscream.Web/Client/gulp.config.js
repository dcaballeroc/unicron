module.exports = function() {
    var ts = '**/*.ts';
    var js = '**/*.js';
    var root = './';
    var src = root + 'src/';
    var build = root + 'build/';
    var temp = root + '.tmp/';
    var config = {
        /**
         * Files paths
         */
        sourceTs:[
            src + ts,
        ],
        build: './build/',
        buildTs: build + ts,
        buildJs: build + js,
        compiledJs: [
            build +  '**/*.module.js',
            build + js
        ],
        buildMaps: build + js + '.map',
        configTs:[
           './*.ts'
        ],
        temp: temp,
        less: src + 'styles/styles.less',
        index: src + 'index.html',
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
        }
        
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
