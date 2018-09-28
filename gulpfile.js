const gulp  = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

//Compile css
gulp.task('sass',function(){
    return gulp.src(['src/sass/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
});

//Watch and Serve
gulp.task('serve',['sass'],function(){
    browserSync.init({
        server: './src'
    });
    gulp.watch(['src/sass/*.scss'],['sass']);
    gulp.watch(['src/*.html']).on('change',browserSync.reload);
});

//Default task
gulp.task('default',['serve']);