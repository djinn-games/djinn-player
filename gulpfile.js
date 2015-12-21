/* jslint node:true */

'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');

var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserSync = require('browser-sync');
var exorcist = require('exorcist');

var connect = require('gulp-connect');
var del = require('del');
var path = require('path');

//
// browserify and js
//

var bundler = browserify([
    path.join('.', 'app', 'js', 'main.js')
]);

var bundle = function () {
    return bundler
        .bundle()
        .on('error', gutil.log)
        .pipe(exorcist(path.join('.', '.tmp', 'js', 'bundle.js.map')))
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(gulp.dest(path.join('.', '.tmp', 'js')))
        .pipe(browserSync.stream({once: true}));
};

gulp.task('js', bundle);

//
// web server
//

gulp.task('connect', function () {
    return connect.server({
        root: ['app', '.tmp']
    });
});

//
// build and dist
//

gulp.task('clean', function () {
    return del(['.tmp']);
});

gulp.task('build', ['js']);

gulp.task('run', ['build', 'connect']);

gulp.task('watch', function () {
    watchify.args.debug = true;
    bundler = watchify(browserify([
        path.join('.', 'app', 'js', 'main.js')
    ], watchify.args), watchify.args);
    bundler.on('update', bundle);

    return browserSync.init({
        server: ['app', '.tmp']
    });
});

gulp.task('dev', ['watch', 'build']);

//
// default task
//

gulp.task('default', ['run']);
