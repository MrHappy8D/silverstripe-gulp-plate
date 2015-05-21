'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

// Run this to compress all the things!
gulp.task('production', ['karma'], function(){
  // This runs only if the karma tests pass
  runSequence('default', ['markup', 'images', 'minifyCss', 'uglifyJs']);
});