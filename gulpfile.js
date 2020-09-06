const gulp = require('gulp'); // to import gulp from gulp modules
const concat = require('gulp-concat'); // to concat files
const prefix = require('gulp-autoprefixer'); // to add css prefixes
const sass = require('gulp-sass'); // to manipulate sass file
const pug = require('gulp-pug'); // for html pug
const livereload = require('gulp-livereload'); // to make live reload
const sourcemaps = require('gulp-sourcemaps'); // to create a map
const uglify = require('gulp-uglify'); // to minify js scripts
const notify = require("gulp-notify"); // to show notifications
const zip = require('gulp-zip'); // to compress files
const ftp = require('vinyl-ftp'); // to upload the files to the host using ftp


// html task 
gulp.task('html-task', async function(){
    return gulp.src('project/index.pug')
            .pipe(pug({pretty: true}))
            .pipe(gulp.dest('dist'))
            .pipe(notify('HTML task ended'))
            .pipe(livereload());
});

// css task 
gulp.task('css-task',async function(){
    return gulp.src('project/public/sass/main.scss')
            .pipe(sourcemaps.init({loadMaps: true})) // init the source map
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(prefix('last 2 versions'))
            // We do not need it at this stage but we can use it 
            //later if we have other css libraries that we want to add
            .pipe(concat('main.css')) 
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('dist/public/css'))
            .pipe(livereload());
});

// js task
gulp.task('js-task', async function(){
    return gulp.src('project/public/js/*.js')
           .pipe(concat('main.js'))
           .pipe(uglify())
           .pipe(gulp.dest('dist/public/js')) 
           .pipe(livereload());
});


// Comporess the final result 
gulp.task('compress', async function(){
    return gulp.src('dist/**/*.*')
           .pipe(zip('website.zip'))
           .pipe(gulp.dest('.'))
           .pipe(notify('Files are compressed'))
});


// deploy the app in my case I do not have a host but this is how the code will look like
// gulp.task( 'deploy', function () {
//     var conn = ftp.create( {
//         host:     'mywebsite.tld', // enter your host here
//         user:     'me', // the user 
//         password: 'mypass', // the password
//         parallel: 10
//     } );
 
//     var globs = ['dist/**/*.*'];
 
//     // using base = '.' will transfer everything to /public_html correctly
//     // turn off buffering in gulp.src for best performance
 
//     return gulp.src( globs, { base: '.', buffer: false })
//         .pipe( conn.newer( '/public_html' ) ) // only upload newer files
//         .pipe( conn.dest( '/public_html' ) )
//         .pipe(livereload()); // reload the after finishing the upload
// });




// watch task
gulp.task('watch', async function(){
    require('./server.js');
    livereload.listen();
    gulp.watch(['project/index.pug','project/pug/*'], gulp.series('html-task'));
    gulp.watch(['project/public/sass/*','project/public/sass/components/*'], gulp.series('css-task'));
    gulp.watch('project/public/js/*.js', gulp.series('js-task'));
    gulp.watch('dist/**/*.*', gulp.series('compress'));
    //gulp.watch('dist/**/*.*', gulp.series('deploy'));
});