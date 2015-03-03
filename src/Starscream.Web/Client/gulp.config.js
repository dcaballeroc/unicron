module.exports = function() {
    var ts = '**/*.ts';
    var js = '**/*.js';
    var root = './';
    var config = {
        sourceTs:[
            root + 'src/' + ts,
        ],
        build: './build/',
        buildTs: root + 'build/' + ts,
        buildJs: root + 'build/' + js,
        buildMaps: root + 'build/' + js + '.map',
        configTs:[
           './*.ts'
        ],
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
            sourceRoot: '/app'
            }
        }
    };
    return config;
};
