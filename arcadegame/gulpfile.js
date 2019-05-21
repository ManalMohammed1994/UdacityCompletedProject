const gulp = require('gulp');
gulp.task('default',function(){
    console.log("test");
 
})
gulp.task('copyHTML',function(){
    return  gulp.src('src/index.html') .pipe(gulp.dest('dist'));
})
gulp.task('copyCSS',function(){
    return gulp.src('src/css/*.css').pipe(gulp.dest('dist/css'));
})
gulp.task('image',function(){
    return gulp.src('src/images/*.png').pipe(imagemin()).pipe(gulp.dest('dist/images'));
})
