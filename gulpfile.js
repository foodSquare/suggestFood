var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var shell = require('shelljs');
var watchs = require('gulp-watch');

var files = require('./files.json');

shell.exec('rm -r www/');

var paths = {
 sass: ['./source/scss/sass/**/*.scss']
};
//gulp.task('default', ['sass']);
gulp.task('default', ["copy-index", "js", "sass","copy-views", "copy-fonts-ionic", "jsLibs", "cssLibs", "copy-img"], function(){

});

//Watchers
// watch for HTML changes
watchs('source/index.html', ['copy-index']);
watchs('./source/controllers/**/*.html', function() {
  gulp.run('copy-views');
});
// watch files.json
watchs('./files.json', function() {
  gulp.run('default');
});
watchs('./gulpfile.js', function() {
  gulp.run('default');
});
// watch for JS changes
watchs('./source/**/*.js', function() {
  //gulp.run('jshint', 'scripts');
  gulp.run('js');
});
// watch for CSS changes
watchs('./source/**/*.scss', function() {
  shell.exec('compass compile source/scss/');
  gulp.run('concat-css');
});

//Tasks
gulp.task('concat-css', function() {
  return gulp.src(files.css)
    .pipe(concat('foodSquare.css'))
    .pipe(gulp.dest('./www/'));
});
gulp.task('sass', function(done) {
  shell.exec('compass compile source/scss/');
  gulp.run('concat-css');
});
gulp.task('copy-index', function() {
    gulp.src('./source/index.html')
    .pipe(gulp.dest('./www/'));
});
gulp.task('copy-views', function() {
   gulp.src('./source/controllers/**/*.html')
   .pipe(gulp.dest('./www/views/'));
});
gulp.task('copy-img', function() {
   gulp.src(files.img)
   .pipe(gulp.dest('./www/img/'));
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
  watchs(paths.sass, ['sass']);
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
