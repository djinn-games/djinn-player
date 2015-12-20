/* jslint node:true */

'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');

var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');

var connect = require('gulp-connect');
var del = require('del');
var path = require('path');

//
// browserify and js
//

var bundler = browserify([
    './app/js/main.js'
]);

var bundle = function () {
    return bundler
        .bundle()
        .on('error', gutil.log)
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(path.join('.', '.tmp', 'js')));
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

gulp.task('watch', ['run'], function () {
    bundler = watchify(bundler, watchify.args);
    bundler.on('update', bundle);
});

//
// default task
//

gulp.task('default', ['run']);
