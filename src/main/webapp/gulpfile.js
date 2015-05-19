'use strict';

var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    gulpFilter = require('gulp-filter'),
    print = require('gulp-print'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    template = require('gulp-template'),
    rename = require("gulp-rename"),
    karma = require('karma').server,
    del = require('del');

/*
 * Use the EXAMPLE_ENV environment var to select the corresponding gulp.json config
 * object.
 */

var environment = process.env.EXAMPLE_ENV ? process.env.EXAMPLE_ENV : 'local';
var config = require('./config/gulp.json')[environment];

var paths = {
        css: ['assets/css/main.css'],
        js: ['app/app.js', 'app/app-routes.js', 'app/components/**/*.js'],
        config: ['app/config.js_'],
        img: ['assets/img/**/*'],
        html: ['app/**/*.html', 'app/components/**/*.html'],
        lib: ['assets/libs/**/*'],
        dist: {
            css: 'dist/assets/css',
            js: 'dist/assets/js',
            img: 'dist/assets/img',
            lib: 'dist/assets/libs',
            html: 'dist',
            webInf: 'dist/WEB-INF'
        }
}
/*
 * File patterns are explicitly included from the node_modules into the path.dist.lib folder
 * because NPM downloads tend to contain the entire project source, readme's, source maps, etc.
 */
var libIncludes = gulpFilter([
    '**/bootstrap/dist/fonts/*', 
    '**/dist/css/bootstrap{.min,}.css', 
    '**/angular{.min,}.js', 
    '**/angular-route{.min,}.js',
    '**/angular-mocks.js',
    '**/ui-bootstrap-tpls{.min,}.js',
    ]); 

gulp.task('styles', function() {
    return gulp.src(paths.css)
        .pipe(gulp.dest(paths.dist.css))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest(paths.dist.css));
});

gulp.task('scripts', function() {
    return gulp.src(paths.js)
        .pipe(jshint('config/.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'))
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.dist.js))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(paths.dist.js));
});

gulp.task('html',function() {
    return gulp.src(paths.html)
        .pipe(gulp.dest(paths.dist.html));
});

/*
 * Replaces the templated config.js using the config selected based on environment.
 */
gulp.task('config',function() {
    return gulp.src(paths.config)
         .pipe(rename(function (path) {
            path.extname = ".js"
         }))
        .pipe(template(config))
        .pipe(gulp.dest(paths.dist.js));
});

gulp.task('images',function() {
    return gulp.src(paths.img)
        .pipe(gulp.dest(paths.dist.img));
});

gulp.task('libs',function() {
    return gulp.src('node_modules/**/*')
        .pipe(libIncludes)
        .pipe(gulp.dest(paths.dist.lib));
});

gulp.task('webInf',function() {
    return gulp.src('WEB-INF/**/*')
        .pipe(gulp.dest(paths.dist.webInf));
});

gulp.task('test', function(cb) {
    return karma.start({
        configFile: __dirname + '/config/karma.js',
        singleRun: true,
        reporters: ['junit', 'coverage'],
        browsers: ['PhantomJS']
      }, cb);
});

gulp.task('clean', function(cb) {
    return del(['dist/'], cb)
});

gulp.task('build', ['test', 'scripts', 'config', 'html', 'styles', 'images', 'libs', 'webInf']);

gulp.task('default', ['build']);

/*
 * The 'watch' task keeps a watch on the CSS, JS, image and HTML files in the
 * project and when they change, runs the corresponding tasks. This way when you
 * change one of the JS files for example, it automatically creates the new main.js
 * file from the source. 
 * 
 * Start with ./bin/gulp watch
 */

gulp.task('watch', function() {
    gulp.watch(paths.css, ['styles']);

    gulp.watch(paths.js, ['scripts', 'config']);

    gulp.watch(paths.img, ['images']);

    gulp.watch(paths.html, ['html']);

  });
