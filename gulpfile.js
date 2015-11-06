var gulp = require('gulp');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var clean = require('gulp-clean');
var concat = require('gulp-concat');

gulp.task('build-clean', function() {
    return gulp.src(['public/*.js','public/*.css']).pipe(clean());
});


gulp.task('css', function(){
  gulp.src(['assets/css/lego.css',
            'assets/css/canvas.css',
            'assets/css/main.css'])
    .pipe(minifyCSS())
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest('public/'))
});

gulp.task('js', function() {
  gulp.src(['assets/js/lego.js',
          'assets/js/optimizely.js',
          'assets/js/main.js'])
      .pipe(uglify())
      .pipe(concat('main.min.js'))
      .pipe(gulp.dest('public/'))
});

gulp.task('css-dev', function(){
  gulp.src(['assets/css/lego.css',
            'assets/css/canvas.css',
            'assets/css/main.css'])
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest('public/'))
});

gulp.task('js-dev', function() {
  gulp.src(['assets/js/lego.js',
          'assets/js/optimizely.js',
          'assets/js/main.js'])
      .pipe(concat('main.min.js'))
      .pipe(gulp.dest('public/'))
});

gulp.task('build', function(callback) {
  runSequence('build-clean',
          'css',
          'js',
          callback);
});

gulp.task('debug-build', function(callback) {
  runSequence('build-clean',
          'css-dev',
          'js-dev',
          callback);
});

gulp.task('watch', function () {
   gulp.watch(['assets/css/*.css','assets/js/*.js'], ['debug-build']);
});

gulp.task('default', ['build']);