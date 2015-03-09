module.exports = function() {
    var ts = '**/*.ts';
    var js = '**/*.js';
    var specs = '**/*.specs.ts';
    var htmls = '**/*.html';
    var root = './';
    var src = root + 'src/';
    var build = root + 'build/';
    var temp = root + '.tmp/';
    var index = src + 'index.html';
    var wiredep = require('wiredep');
    var report = './report/';
    var bowerFiles = wiredep({devDependencies: true})['js'];
    var buildSpecs =  src + 'specs/';
    var config = {
        /**
         * Files paths
         */
        sourceTs:[
            src + ts,
            '!' + src + specs
        ],
        sourceHtmls: [
                        src + htmls,
                        '!' + index
                     ],
        sourceSpecs: [
            src + 'specs/' + specs
        ],
        build: './build/',
        buildTs: build + ts,
        buildJs: build + js,
        buildHtmls: build + htmls,
        buildSpecs: buildSpecs,
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
        packages : [
            './package.json',
            './bower.json'
        ],
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
         * Karma and testing settings
         */
        specHelpers: [src + 'test-helpers/*.*'],
        serverIntegrationSpecs: [src + 'specsIntegration/**/*.spec.*'],
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
    config.karma = getKarmaOptions();
    
    return config;
    
    function getKarmaOptions() {
        var options = {
            files: [].concat(
                bowerFiles,
                config.specHelpers,
                build + '**/*.module.js',
                build + '**/*.js',
                buildSpecs + '**/*.js',
                temp + config.templateCache.file,
                config.serverIntegrationSpecs
              
            ),
            exclude: [],
            coverage: {
                dir: report + 'coverage',
                reporters: [
                    {type: 'html', subdir: 'report-html'},
                    {type: 'lcov', subdir: 'report-lcov'},
                    {type: 'text-summary'}
                ]
            },
            preprocessors: {}
        };
        options.preprocessors['!' + buildSpecs + '**/*.js'] = ['coverage'];
        return options;
    }
};
