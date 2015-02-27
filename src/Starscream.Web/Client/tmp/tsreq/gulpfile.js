///<reference path='typings/node/node.d.ts'/>
var gulp = require('gulp');
var tsc = require('gulp-tsc');
var config = require('./gulp.config')();
var args = require('yargs').argv;
gulp.task('build', ['compile:typescript']);
gulp.task('compile:typescript', function () {
    var maps = false;
    if (args.dev) {
        maps = true;
    }
    console.log('Ambiente Dev ' + maps);
    return gulp.src(config.allts).pipe(tsc({
        module: 'CommonJS',
        sourcemap: maps,
        emitError: false
    })).pipe(gulp.dest(config.build));
});
