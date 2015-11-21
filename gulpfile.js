var gulp = require('gulp');

var $ = require('gulp-load-plugins')();
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');

gulp.task('scripts', function () {
  var b = browserify({
    entries: './scripts/app.js',
    debug: true
  });

  return b.bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe($.sourcemaps.init({loadMaps: true}))
      .pipe($.uglify())
      .on('error', $.util.log)
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('./static/'));
});

gulp.task('watch', function () {
  gulp.watch(['./scripts/**/*.js'], ['scripts']);
});
