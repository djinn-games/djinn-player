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

var mochaPhantomJS = require('gulp-mocha-phantomjs');

var connect = require('gulp-connect');
var del = require('del');
var path = require('path');

//
// browserify and js
//

var bundlerApp = browserify([
    path.join(__dirname, 'app', 'js', 'main.js')
]);

var bundlerTest = browserify([
    path.join(__dirname, 'test', 'index.js')
]);

var bundleApp = function () {
    return bundlerApp
        .bundle()
        .on('error', gutil.log)
        .pipe(exorcist(path.join(__dirname, '.tmp', 'js', 'bundle.js.map')))
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(gulp.dest(path.join(__dirname, '.tmp', 'js')))
        .pipe(browserSync.stream({once: true}));
};

var bundleTest = function () {
    return bundlerTest
        .bundle()
        .on('error', gutil.log)
        .pipe(exorcist(path.join(__dirname, '.tmp', 'js', 'test.js.map')))
        .pipe(source('test.js'))
        .pipe(buffer())
        .pipe(gulp.dest(path.join(__dirname, '.tmp', 'js')))
        .pipe(browserSync.stream({once: true}));
};

gulp.task('js:app', bundleApp);
gulp.task('js:test', bundleTest);


//
// web server
//

gulp.task('connect', function () {
    return connect.server({
        root: ['app', '.tmp']
    });
});

gulp.task('connect:test', function () {
    return connect.server({
        root: ['app', '.tmp', 'test', 'node_modules'],
        port: 3001
    });
});

//
// build and dist
//

gulp.task('clean', function () {
    return del(['.tmp']);
});

gulp.task('build', ['js:app']);

gulp.task('run', ['build', 'connect']);


//
// dev mode: watch, test, etc.
//

gulp.task('watch:app', function () {
    watchify.args.debug = true;
    bundlerApp = watchify(browserify([
        path.join('.', 'app', 'js', 'main.js')
    ], watchify.args), watchify.args);
    bundlerApp.on('update', bundleApp);
});

gulp.task('watch:test', function () {
    watchify.args.debug = true;
    bundlerTest = watchify(browserify([
        path.join(__dirname, 'test', 'index.js')
    ], watchify.args), watchify.args);
    bundlerTest.on('update', bundleTest);
});

gulp.task('dev', ['watch:app', 'build'], function () {
    return browserSync.init({
        server: ['app', '.tmp']
    });
});

gulp.task('test:console', ['js:test', 'connect:test'], function () {
    // NOTE: Disabled since phantomJS doesn't support ES6.
    //       Also babel generates invalid syntax code for the grammar.
    // See https://gist.github.com/belen-albeza/11d1dad3a6930345b61a
    // for how the code should look like once phantom supports ES6
    console.error('Disabled task – phantomJS doesn\'t support ES6');
    connect.serverClose();
});

gulp.task('test', ['watch:test', 'watch:app', 'build', 'js:test'],
function () {
    return browserSync.init({
        server: ['app', '.tmp', 'test', 'node_modules'],
        index: 'runner.html'
    });
});


//
// default task
//

gulp.task('default', ['run']);
