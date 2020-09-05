const gulp = require('gulp'); // to import gulp from gulp modules
const concat = require('gulp-concat');
const prefix = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const livereload = require('gulp-livereload');

// html task 
gulp.task('html-task', async function(){
    return gulp.src('project/index.pug')
            .pipe(pug({pretty: true}))
            .pipe(gulp.dest('dist'))
            .pipe(livereload());
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
            .pipe(livereload());
});

// watch task
gulp.task('watch-task', async function(){
    require('./server.js');
    livereload.listen();
    gulp.watch(['project/index.pug','project/pug/*'], gulp.series('html-task'));
    gulp.watch(['project/public/sass/*','project/public/sass/components/*'], gulp.series('css-task'));
});