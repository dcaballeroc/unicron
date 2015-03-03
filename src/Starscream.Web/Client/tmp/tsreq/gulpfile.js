///<reference path='typings/node/node.d.ts'/>
var gulp = require('gulp');
var tsc = require('gulp-typescript');
var config = require('./gulp.config')();
var args = require('yargs').argv;
var plugins = require('gulp-load-plugins')({ lazy: true });
gulp.task('build', ['compile:typescript']);
gulp.task('compile:typescript', ['copingTs'], function () {
    console.log('Compiling Typescript files');
    var maps = false;
    if (args.dev) {
        maps = true;
    }
    console.log('Ambiente Dev ' + maps);
    var tsResults = gulp.src(config.buildTs).pipe(plugins.sourcemaps.init()).pipe(tsc({
        module: 'commonjs',
        declarationFiles: true,
        emitError: false
    }));
    return tsResults.pipe(plugins.sourcemaps.write('../build', { includeContent: false, sourceRoot: '/app' })).pipe(gulp.dest(config.build));
});
gulp.task('copingTs', function () {
    console.log('copying typescript files');
    return gulp.src(config.sourceTs).pipe(gulp.dest(config.build));
});
gulp.task('vet', function () {
    console.log('Analyzing sources with TSLint, JSHint and JSCS');
    var allTs = config.sourceTs;
    return gulp.src(allTs).pipe(plugins.if(args.verbose, plugins.print())).pipe(plugins.tslint()).pipe(plugins.tslint.report('verbose'));
});
