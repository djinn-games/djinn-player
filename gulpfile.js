/* jslint node:true */

'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');

var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');

var connect = require('gulp-connect');
var del = require('del');

//
// web server
//

gulp.task('connect', function () {
    return connect.server({
        root: ['app', '.tmp']
    });
});
