var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var pathmodify = require('pathmodify');
var browserify = require('browserify');
var babelify = require('babelify');
var fs = require('fs');
var through = require('through2');
var path = require('path');
var sourcemaps = require('gulp-sourcemaps');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var del = require('del');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var file = require('gulp-file');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var cloudinary = require('cloudinary');
var notify = require('gulp-notify');
var imageminWebp = require('imagemin-webp');

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

gulp.task('js', function() {
  var pathOpts = {
    mods: [pathmodify.mod.dir('vendor', '../../../vendor/assets/js')]
  };

  var bundler =
    browserify('app/assets/js/application.js', { debug: true })
      .plugin(pathmodify(), pathOpts)
      .transform(babelify)

  return bundler.bundle()
    .pipe(source('application.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .on('error', handleErrors)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/assets'));
});

gulp.task('base-images', function() {
  return gulp.src('app/assets/images/**/*.{jpg,jpeg,png,svg,gif}')
    .pipe(changed('public/assets'))
    .pipe(imagemin({
      progressive: true
    }))
    .on('error', handleErrors)
    .pipe(gulp.dest('public/assets'));
});

gulp.task('images', ['base-images'], function() {
  return gulp.src('public/assets/**/*.{jpg,jpeg}')
    .pipe(imageminWebp({ quality: 80 })())
    .on('error', handleErrors)
    .pipe(gulp.dest('public/assets'));
});

gulp.task('vendor', function() {
  return gulp.src(['vendor/assets/*.js', 'vendor/assets/*.css'])
    .pipe(gulp.dest('public/assets/vendor'));
});

gulp.task('clean', function() {
  del('config/rev-manifest.json');
  del('public/assets');
  return file('rev-manifest.json', "{}")
    .pipe(gulp.dest('config'));
});

gulp.task('build', ['sass', 'js', 'vendor', 'images']);

gulp.task('watch', function() {
  gulp.watch('app/assets/css/**/*.scss', ['sass']);
  gulp.watch('app/assets/js/**/*.js', ['js']);
  gulp.watch('app/assets/images/**/*', ['images']);
});

gulp.task('uglify', ['js'], function() {
  return gulp.src('public/assets/application.js')
    .pipe(uglify())
    .pipe(gulp.dest('public/assets'));
});

gulp.task('minify', ['sass'], function() {
  return gulp.src('public/assets/application.css')
  .pipe(minify())
  .pipe(gulp.dest('public/assets'));
});

cloudinary.config({
  cloud_name: 'profile-laser',
  api_key: '458595478511397',
  api_secret: 'woP1YwFLpaSqcy_9ozwJths6Dx8'
});

function CloudinaryUpload(tags) {
  this.tags = tags;
  this.content = {};
};

CloudinaryUpload.prototype.deleteOldByTag = function() {
  var self = this;
  cloudinary.api.delete_resources_by_tag(self.tags);
};

CloudinaryUpload.prototype.uploader = function() {
  var self = this;
  var count = 0;

  return through.obj(function(file, enc, cb) {
    file.name = file.path.replace(file.base, '');
    cloudinary.uploader.upload(file.path, function(data) {
      count++
      if (!!data.url) {
        self.content[file.name] = data.url;
      }
      return cb();
    },{ tags: self.tags });
  }, function(cb) {
    file('cloudinary-manifest.json', JSON.stringify(self.content), { src: true })
      .pipe(gulp.dest('config'));
    return cb();
  });
};

function cloudinaryCollector() {
  var manifest = {};
  var mutables = [];

  return through.obj(function(file, enc, cb) {
    var ext = path.extname(file.path);
    if (ext === '.json') {
      var content = file.contents.toString();
      manifest = JSON.parse(content);
    } else {
      mutables.push(file);
    }
    return cb();
  }, function(cb) {
    var changes = [];
    for (var key in manifest) {
      var pattern = key.replace(/[\-\[\]\{\}\(\)\*\+\?\.\^\$\|\/\\]/g, "\\$&");
      changes.push({
        regexp: new RegExp(pattern, 'g'),
        patternLength: pattern.length,
        replacement: manifest[key]
      });
    }

    changes.sort(function(a, b) {
      return b.patternLength - a.patternLength;
    });

    mutables.forEach(function(file) {
      if (!file.isNull()) {
        var src = file.contents.toString();
        changes.forEach(function(r) {
          src = src.replace(r.regexp, r.replacement);
        });
        file.contents = new Buffer(src);
      }
      this.push(file);
    }, this);

    return cb();
  });
}


// Deploy tasks

gulp.task('deploy-build', ['uglify', 'minify', 'vendor', 'images']);

gulp.task('cloudinary-upload', ['deploy-build'], function() {
  var cloudinaryUpload = new CloudinaryUpload(['profileLaser']);
  cloudinaryUpload.deleteOldByTag();

  return gulp.src('public/assets/*.{jpg,png,bmp,jpeg,svg,gif,webp}')
    .pipe(cloudinaryUpload.uploader());
});

gulp.task('rev', ['deploy-build'], function() {
  return gulp.src(['public/assets/**/*'])
    .pipe(rev())
    .pipe(gulp.dest('public/assets'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('config'));
});

gulp.task('deploy-cache', ['cloudinary-upload', 'rev']);

gulp.task('cloudinary-collector', ['deploy-cache'], function() {
  return gulp.src(['config/cloudinary-manifest.json', 'public/assets/*.{css,js}'])
    .pipe(cloudinaryCollector())
    .pipe(gulp.dest('public/assets'));
});

gulp.task('rev-collector', ['cloudinary-collector'], function() {
  return gulp.src(['config/rev-manifest.json', 'public/assets/*.{css,js}'])
    .pipe(revCollector())
    .pipe(gulp.dest('public/assets'));
});

gulp.task('deploy', ['rev-collector']);
