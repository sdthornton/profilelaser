var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserify = require('browserify');
var babelify = require('babelify');
var fs = require('fs');
var sourcemaps = require('gulp-sourcemaps');
var rev = require('gulp-rev');
var del = require('del');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var file = require('gulp-file');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var notify = require('gulp-notify');

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: "Compile Error",
    message: "<%= error %>",
  }).apply(this, args);
  this.emit('end');
}

gulp.task('sass', function() {
  return gulp.src('app/assets/css/application.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', handleErrors)
    .pipe(sourcemaps.write())
    .pipe(autoprefixer({ browsers: ['last 3 versions'] }))
    .pipe(gulp.dest('public/assets'));
});

function bundleJS(bundler) {
  return bundler.bundle()
    .on('error', handleErrors)
    .pipe(source('application.js'))
    .pipe(buffer())
    .pipe(gulp.dest('public/assets'))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/assets'));
}

gulp.task('js', function() {
  var bundler = browserify('app/assets/js/application.js', { debug: true })
    .transform(babelify)

  return bundleJS(bundler);
});

gulp.task('images', function() {
  return gulp.src('app/assets/images/**/*.{jpg,png,bmp,jpeg,svg,gif}')
    .pipe(changed('public/assets'))
    .pipe(imagemin())
    .on('error', handleErrors)
    .pipe(gulp.dest('public/assets'));
});

gulp.task('vendor', function() {
  return gulp.src(['vendor/assets/*.js', 'vendor/assets/*.css'])
    .pipe(gulp.dest('public/assets/vendor'));
});

gulp.task('clean', function() {
  del('build/rev-manifest.json');
  del('public/assets');
  return file('rev-manifest.json', "{}")
    .pipe(gulp.dest('build'));
});

gulp.task('build', ['clean', 'sass', 'js', 'vendor', 'images']);

gulp.task('watch', function() {
  gulp.watch('app/assets/css/**/*.scss', ['sass']);
  gulp.watch('app/assets/js/**/*.js', ['js']);
  gulp.watch('app/assets/images/**/*', ['images']);
});

gulp.task('uglify', function() {
  return gulp.src('public/assets/application.js')
    .pipe(uglify())
    .pipe(gulp.dest('public/assets'));
});

gulp.task('minify', function() {
  return gulp.src('public/assets/application.css')
  .pipe(minify())
  .pipe(gulp.dest('public/assets'));
});

gulp.task('rev', function() {
  return gulp.src(['public/assets/application.css', 'public/assets/application.js'])
    .pipe(rev())
    .pipe(gulp.dest('public/assets'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('build'));
});
