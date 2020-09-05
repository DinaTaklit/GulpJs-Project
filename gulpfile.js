const gulp = require('gulp'); // to import gulp from gulp modules
const concat = require('gulp-concat');
const prefix = require('gulp-autoprefixer');
const sass = require('gulp-sass');
// html task 
gulp.task('html-task', async function(){
    return gulp.src(['project/index.html','project/about.html'])
            .pipe(gulp.dest('dist'))
});

// css task 

gulp.task('css-task',async function(){
    return gulp.src('project/public/sass/main.scss')
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(prefix('last 2 versions'))
            // We do not need it at this stage but we can use it 
            //later if we have other css libraries that we want to add
            .pipe(concat('main.css')) 
            .pipe(gulp.dest('dist/public/css'))
});
