///<reference path='typings/node/node.d.ts'/>
'use strict';
var gulp = require('gulp');
var del = require('del');
var tsc = require('gulp-typescript');
var config = require('./gulp.config')();
var args = require('yargs').argv;
var plugins = require('gulp-load-plugins')({ lazy: true });
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var port = config.defaultPort;
gulp.task('help', plugins.taskListing);
gulp.task('default', ['help']);
gulp.task('build-dev', ['clean-code', 'vet', 'copyingTs', 'copyingHtmls'], function (done) {
    console.log('Compiling Typescript files for Dev');
    var tsResults = gulp.src(config.buildTs).pipe(plugins.sourcemaps.init()).pipe(tsc(config.tsc));
    var stream = tsResults.pipe(plugins.sourcemaps.write(config.sourceMaps.pathToWrite, config.sourceMaps.configMaps)).pipe(gulp.dest(config.build));
    return stream;
});
gulp.task('build-release', ['vet', 'clean-code'], function () {
    console.log('Compiling Typescript files for Release');
    return gulp.src(config.sourceTs).pipe(tsc(config.tsc)).pipe(gulp.dest(config.build));
});
gulp.task('fonts', ['clean-fonts'], function () {
    console.log('Copying fonts');
    return gulp.src(config.fonts).pipe(gulp.dest(config.build + 'fonts'));
});
gulp.task('images', ['clean-images'], function () {
    console.log('Copying and compressing the images');
    return gulp.src(config.images).pipe(plugins.imagemin({ optimizationLevel: 4 })).pipe(gulp.dest(config.build + 'images'));
});
gulp.task('serve-dev', function (callback) {
    var stream = runSequence('build-dev', 'inject', callback);
    return stream;
});
gulp.task('serve-release', function (callback) {
    var stream = runSequence('build-release', 'inject', callback);
    return stream;
});
gulp.task('dev', ['serve-dev'], function () {
    serve(true);
});
gulp.task('copyingTs', function () {
    console.log('Copying typescript files');
    return gulp.src(config.sourceTs).pipe(gulp.dest(config.build));
});
gulp.task('copyingHtmls', function () {
    console.log('Copying Html files');
    return gulp.src(config.sourceHtmls).pipe(gulp.dest(config.build));
});
gulp.task('templatecache', function () {
    console.log('Creating AngularJS $templateCache');
    return gulp.src(config.sourceHtmls).pipe(plugins.minifyHtml({ empty: true })).pipe(plugins.angularTemplatecache(config.templateCache.file, config.templateCache.options)).pipe(gulp.dest(config.temp));
});
gulp.task('vet', function () {
    console.log('Analyzing sources with TSLint, JSHint and JSCS');
    var allTs = config.sourceTs;
    var stream = gulp.src(allTs).pipe(plugins.if(args.verbose, plugins.print())).pipe(plugins.tslint()).pipe(plugins.tslint.report('verbose'));
    return stream;
});
gulp.task('styles', ['clean-styles'], function () {
    console.log('Compiling Less --> CSS');
    return gulp.src(config.less).pipe(plugins.plumber()).pipe(plugins.less()).pipe(plugins.autoprefixer({ browsers: ['last 2 version', '> 5%'] })).pipe(gulp.dest(config.temp));
});
gulp.task('less-watcher', function () {
    gulp.watch([config.less], ['styles']);
});
gulp.task('wiredep', function () {
    console.log('Wire up the bower css js and our app js into the html');
    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;
    return gulp.src(config.index).pipe(wiredep(options)).pipe(plugins.inject(gulp.src(config.compiledJs))).pipe(gulp.dest(config.build));
});
gulp.task('inject', ['wiredep', 'styles', 'templatecache'], function () {
    console.log('Wire up the app css into the html, and call wiredep ');
    var stream = gulp.src(config.buildIndex).pipe(plugins.inject(gulp.src(config.css))).pipe(gulp.dest(config.build));
    return stream;
});
gulp.task('clean-code', function (done) {
    console.log('***Begining to Clean Code***');
    var files = [].concat(config.buildTs, config.buildJs, config.buildMaps, config.buildHtmls);
    clean(files, done);
    console.log('***Finishing to Clean Code***');
});
gulp.task('optimize', ['serve-release'], function () {
    console.log('Optimizing the javascript, css, html');
    var assets = plugins.useref.assets({ searchPath: '{' + config.root + ',' + config.bower.directory + '}' });
    var templateCache = config.temp + config.templateCache.file;
    var cssFilter = plugins.filter('**/*.css');
    var jsLibFilter = plugins.filter('**/' + config.optimized.lib);
    var jsAppFilter = plugins.filter('**/' + config.optimized.app);
    return gulp.src(config.buildIndex).pipe(plugins.plumber()).pipe(plugins.inject(gulp.src(templateCache, { read: false }), {
        starttag: '<!-- inject:templates:js -->'
    })).pipe(assets).pipe(cssFilter).pipe(plugins.csso()).pipe(cssFilter.restore()).pipe(jsLibFilter).pipe(plugins.uglify()).pipe(jsLibFilter.restore()).pipe(jsAppFilter).pipe(plugins.ngAnnotate()).pipe(plugins.uglify()).pipe(jsAppFilter.restore()).pipe(assets.restore()).pipe(plugins.useref()).pipe(gulp.dest(config.build)).on('end', function () {
        del(config.build + '/app');
    });
});
gulp.task('clean-styles', function (done) {
    console.log('***Begining to Clean Styles***');
    var css = [].concat(config.temp + '**/*.css');
    clean(css, done);
    console.log('***Finishing to Clean Styles***');
});
gulp.task('clean-fonts', function (done) {
    var fonts = [].concat(config.build + 'fonts/**/*.*');
    clean(fonts, done);
});
gulp.task('clean-images', function (done) {
    var images = [].concat(config.build + 'images/**/*.*');
    clean(images, done);
});
function serve(isDev) {
    'use strict';
    startBrowserSync(isDev);
}
function clean(path, done) {
    'use strict';
    console.log('Cleaning: ' + plugins.util.colors.blue(path));
    del(path, done);
}
function changeEvent(event) {
    'use strict';
    var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
    console.log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}
function startBrowserSync(isDev) {
    'use strict';
    if (args.nosync || browserSync.active) {
        return;
    }
    ;
    console.log('Starting browser-sync on port ' + port);
    if (isDev) {
        gulp.watch([config.less, config.sourceTs, config.sourceHtmls], ['serve-dev', browserSync.reload]).on('change', changeEvent);
    }
    var options = {
        proxy: 'localhost:' + port,
        port: 3000,
        files: isDev ? [
            config.build + '**/*.*',
            config.temp + '**/*.css'
        ] : [],
        ghostMode: true,
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'Acklen Avenue',
        notify: true,
        reloadDelay: 5000
    };
    browserSync(options);
}
