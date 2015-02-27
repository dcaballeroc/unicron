///<reference path='typings/node/node.d.ts'/>
var gulp = require('gulp');
var tsc = require('gulp-tsc');
var config = require('./gulp.config')();
gulp.task('build', ['compile:typescript']);
gulp.task('compile:typescript', function () {
    return gulp.src(config.allts).pipe(tsc({
        module: 'CommonJS',
        sourcemap: true,
        emitError: false
    })).pipe(gulp.dest(config.build));
});
