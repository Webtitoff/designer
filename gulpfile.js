var gulp 			= require('gulp'),
	wiredep 		= require('wiredep').stream,
    useref 			= require('gulp-useref'),
    gulpif 			= require('gulp-if'),
    uglify 			= require('gulp-uglify'),
    minifyCss 	    = require('gulp-minify-css'),
    clean           = require('gulp-clean'),
    sass            = require('gulp-sass'),
    uncss           = require('gulp-uncss'),
    concat          = require('gulp-concat'),
    notify          = require('gulp-notify'),
    connect         = require('gulp-connect'),
    plumber         = require('gulp-plumber'),
    autoprefixer    = require('gulp-autoprefixer'),
    sourcemaps      = require('gulp-sourcemaps'),
    imagemin        = require('gulp-imagemin'),
    cache           = require('gulp-cache'),
    browserSync     = require('browser-sync').create(),
    pngquant        = require('imagemin-pngquant'),
    sftp 			= require('gulp-sftp');

//====================== DEPLOY======================
// deploy
gulp.task('deploy', function() {
     // SFTP
     var deploySFTP = gulp.src('dist/**/*')
        .pipe(sftp({
            host: '92.53.96.120',
            user: 'cx59402',
            pass: 'MgxcZr8ezqiR',
            remotePath: '/home/c/cx59402/html_site/public_html/'
        }));
});

//build
gulp.task('build', ['clean'], function() {
    // imagemin
    var buildImg = gulp.src('app/img/**/*')
        .pipe(imagemin({
        interLaced: true,
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        une: [pngquant()]
        }))
        .pipe(gulp.dest('dist/img'));
    // useref
    var buildUseref = gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulpif('*.css', uncss({
            html: ['app/*.html']
         })))
        .pipe(gulpif('*.css', autoprefixer({
            browsers: ['last 2 versions']
        })))
        .pipe(gulp.dest('dist'));
    // assets
    var buildAssets = gulp.src('./app/assets/**/*.*')
        .pipe(gulp.dest('./dist/assets'));
});

 // clean
gulp.task('clean', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

 
// ================ DEVELOPMENT ================

// browserSync
gulp.task('browserSync', function() {
    return browserSync.init({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

// wiredep
gulp.task('wiredep', function () {
  return gulp.src('app/*.html')
    .pipe(wiredep({
      directory : "app/bower/"
    }))
    .pipe(gulp.dest('app/'));
});

// scss
gulp.task('styles', function() {
    return gulp.src('./app/scss/main.scss')
        .pipe(plumber({ 
            errorHandler: notify.onError(function(err) { 
                return {
                    title: 'Styles',
                    message: err.message
                }
            })
        }))
        .pipe(sourcemaps.init()) 
        .pipe(sass()) 
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./app/css'))
        .pipe(browserSync.reload({stream: true}));
});



// watch
gulp.task('watch', function() {
    gulp.watch('bower.json', ['wiredep']);
    gulp.watch('app/scss/**/*.scss', ['styles']);
    gulp.watch('src/js/**/*.js');
    gulp.watch('app/**/*.*').on('change', browserSync.reload);
});

// default
gulp.task('default', ['wiredep', 'styles', 'watch', 'browserSync']);

// clear
gulp.task('clear', function() {return cache.clearAll();});
