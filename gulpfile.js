const gulp  = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

//Compile css
gulp.task('sass',function(){
    return gulp.src(['src/sass/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('production/css'))
    .pipe(browserSync.stream())
});


// Minify
gulp.task('min-sass',function(){
    return gulp.src(['src/sass/*.scss'])
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest('production/css'))
      .pipe(browserSync.stream())
});

gulp.task('copyHtml',function(){
    return gulp.src(['src/*.html'])
        .pipe(gulp.dest('production'))
})

gulp.task('minify',function(){
    return gulp.src(['src/js/*.js'])
    .pipe(rename({
        suffix: '.min'
      }))
      .pipe(uglify().on('error', function(e){
        console.log(e);
     }))
      .pipe(gulp.dest('production/js'))
      .pipe(browserSync.stream())
})

//Watch and Serve
gulp.task('serve',['sass','min-sass','minify','copyHtml'],function(){
    browserSync.init({
        server: './production'
    });
    gulp.watch(['src/sass/*.scss'],['sass','min-sass']);
    gulp.watch(['src/js/*.js'],['minify']);
    gulp.watch(['src/*.html']).on('change',browserSync.reload);
});

//Default task
gulp.task('default',['serve']);