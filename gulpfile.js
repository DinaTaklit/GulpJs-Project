const gulp = require('gulp'); // to import gulp from gulp modules

// My first task 

gulp.task('first-task', async function(){
    return gulp.src(['project/index.html','project/about.html'])
            .pipe(gulp.dest('dist'))
});