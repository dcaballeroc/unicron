///<reference path='typings/node/node.d.ts'/>

var gulp = require('gulp');
var tsc  = require('gulp-typescript');
var config = require('./gulp.config')();
var args = require('yargs').argv;
var plugins = require('gulp-load-plugins')({lazy: true});

gulp.task('build', ['compile:typescript']);

gulp.task('compile:typescript', function() {
    
    console.log('Compiling Typescript files');
      var maps: boolean = false;
       if (args.dev) {
           maps = true;
       }
        console.log('Ambiente Dev ' + maps);
        return gulp
            .src(config.sourceTs)
            .pipe( tsc({
                module: 'CommonJS',
                sourcemap: maps,
                emitError: false
            })) .pipe(
            gulp.dest(config.build)
            );
    }
);

gulp.task('vet', function() {
    console.log('Analyzing sources with TSLint, JSHint and JSCS');
    var allTs: string[] = config.sourceTs;
    return gulp
            .src(allTs)
            .pipe(plugins.if(args.verbose, plugins.print()))
            .pipe(plugins.tslint())
            .pipe(plugins.tslint.report('verbose'));
    
    }
);

