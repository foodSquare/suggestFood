var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var files = require('./files.json');


var paths = {
 sass: ['./scss/**/*.scss']
};

//gulp.task('default', ['sass']);
gulp.task('default', ["copy-index", "js", "copy-views", "copy-fonts-ionic", "jsLibs", "cssLibs"], function(){
  // watch for HTML changes
  
  gulp.watch('./source/index.html', ['copy-index']);
  gulp.watch('./source/**/*.html', function() {
    gulp.run('copy-index');
  });

  gulp.watch('./source/controllers/**/*.html', function() {
    gulp.run('copy-views');
  });
 
  // watch for JS changes
  gulp.watch('./source/**/*.js', function() {
    //gulp.run('jshint', 'scripts');
    gulp.run('js');
  });

  // watch for CSS changes
  gulp.watch('./src/styles/*.css', function() {
    gulp.run('styles');
  });

  // watch files.json
  gulp.watch('./files.json', function() {
    gulp.run('default');
  });
});



gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('copy-index', function() {
    gulp.src('./source/index.html')
    .pipe(gulp.dest('./www/'));
});
gulp.task('copy-views', function() {
   gulp.src('./source/controllers/**/*.html')
   .pipe(gulp.dest('./www/views/'));
});
gulp.task('copy-fonts-ionic', function() {
   gulp.src('./source/vendor/ionic/fonts/*.*')
   .pipe(gulp.dest('./www/fonts/'));

   gulp.src('./source/vendor/robotodraft/fonts/**/*')
   .pipe(gulp.dest('./www/libs/fonts/'));
});

gulp.task('js', function() {
  return gulp.src(files.js)
    .pipe(concat('foodSquare.js'))
    .pipe(gulp.dest('./www/'));
});
gulp.task('jsLibs', function(){
  return gulp.src(files.jsLibs)
    .pipe(concat('libs.js'))
    .pipe(gulp.dest('./www/libs/'));
});
gulp.task('cssLibs', function(){
  return gulp.src(files.cssLibs)
    .pipe(concat('libs.css'))
    .pipe(gulp.dest('./www/libs/'));
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});


gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
