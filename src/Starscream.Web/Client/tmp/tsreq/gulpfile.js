///<reference path='typings/node/node.d.ts'/>
'use strict';
var gulp = require('gulp');
var del = require('del');
var tsc = require('gulp-typescript');
var config = require('./gulp.config')();
var args = require('yargs').argv;
var plugins = require('gulp-load-plugins')({ lazy: true });
var browserSync = require('browser-sync');
var port = config.defaultPort;
gulp.task('build-dev', ['vet', 'clean-code', 'copingTs', 'copingHtmls'], function () {
    console.log('Compiling Typescript files for Dev');
    var tsResults = gulp.src(config.buildTs).pipe(plugins.sourcemaps.init()).pipe(tsc(config.tsc));
    return tsResults.pipe(plugins.sourcemaps.write(config.sourceMaps.pathToWrite, config.sourceMaps.configMaps)).pipe(gulp.dest(config.build));
});
gulp.task('build-release', ['vet', 'clean-code'], function () {
    console.log('Compiling Typescript files for Release');
    return gulp.src(config.sourceTs).pipe(tsc(config.tsc)).pipe(gulp.dest(config.build));
});
gulp.task('serve-dev', [], function () {
});
gulp.task('copingTs', function () {
    console.log('Copying typescript files');
    return gulp.src(config.sourceTs).pipe(gulp.dest(config.build));
});
gulp.task('copingHtmls', function () {
    console.log('Copying Html files');
    return gulp.src(config.sourceHtmls).pipe(gulp.dest(config.build));
});
gulp.task('vet', function () {
    console.log('Analyzing sources with TSLint, JSHint and JSCS');
    var allTs = config.sourceTs;
    return gulp.src(allTs).pipe(plugins.if(args.verbose, plugins.print())).pipe(plugins.tslint()).pipe(plugins.tslint.report('verbose'));
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
gulp.task('inject', ['wiredep', 'styles'], function () {
    console.log('Wire up the app css into the html, and call wiredep ');
    return gulp.src(config.buildIndex).pipe(plugins.inject(gulp.src(config.css))).pipe(gulp.dest(config.build));
});
gulp.task('clean-code', function (done) {
    var files = [].concat(config.buildTs, config.buildJs, config.buildMaps, config.buildHtmls);
    clean(files, done);
});
gulp.task('clean-styles', function (done) {
    var css = [].concat(config.temp + '**/*.css');
    clean(css, done);
});
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
    if (isDev) {
        gulp.watch([config.less], ['styles']).on('change', changeEvent);
    }
    var options = {
        proxy: 'localhost:' + port,
        port: 3000,
        files: isDev ? [
            config.build + '**/*.*',
            '!' + config.less,
            config.temp + '**/*.css'
        ] : [],
        ghostMode: {
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: 0 // 1000
    };
    browserSync(options);
}
