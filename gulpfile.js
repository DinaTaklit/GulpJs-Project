const gulp = require('gulp'); // to import gulp from gulp modules
const concat = require('gulp-concat');
const prefix = require('gulp-autoprefixer');
// html task 
gulp.task('html-task', async function(){
    return gulp.src(['project/index.html','project/about.html'])
            .pipe(gulp.dest('dist'))
});

// css task 

gulp.task('css-task',async function(){
    return gulp.src('project/public/css/*')
            .pipe(prefix('last 2 versions'))
            .pipe(concat('main.css'))
            .pipe(gulp.dest('dist/public/css'))
});
