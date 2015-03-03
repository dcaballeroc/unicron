///<reference path='typings/node/node.d.ts'/>
'use strict';
var gulp = require('gulp');
var del = require('del');
var tsc = require('gulp-typescript');
var config = require('./gulp.config')();
var args = require('yargs').argv;
var plugins = require('gulp-load-plugins')({ lazy: true });
gulp.task('build-dev', ['vet', 'clean-code', 'copingTs'], function () {
    console.log('Compiling Typescript files for Dev');
    var maps = false;
    if (args.dev) {
        maps = true;
    }
    console.log('Ambiente Dev ' + maps);
    var tsResults = gulp.src(config.buildTs).pipe(plugins.sourcemaps.init()).pipe(tsc(config.tsc));
    return tsResults.pipe(plugins.sourcemaps.write(config.sourceMaps.pathToWrite, config.sourceMaps.configMaps)).pipe(gulp.dest(config.build));
});
gulp.task('build-release', ['vet', 'clean-code'], function () {
    console.log('Compiling Typescript files for Release');
    return gulp.src(config.sourceTs).pipe(tsc(config.tsc)).pipe(gulp.dest(config.build));
});
gulp.task('copingTs', function () {
    console.log('Copying typescript files');
    return gulp.src(config.sourceTs).pipe(gulp.dest(config.build));
});
gulp.task('vet', function () {
    console.log('Analyzing sources with TSLint, JSHint and JSCS');
    var allTs = config.sourceTs;
    return gulp.src(allTs).pipe(plugins.if(args.verbose, plugins.print())).pipe(plugins.tslint()).pipe(plugins.tslint.report('verbose'));
});
gulp.task('clean-code', function (done) {
    var files = [].concat(config.buildTs, config.buildJs, config.buildMaps);
    clean(files, done);
});
function clean(path, done) {
    'use strict';
    console.log('Cleaning: ' + plugins.util.colors.blue(path));
    del(path, done);
}
