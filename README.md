# Gulp Js Project

This project aim to learn Gulp js

## Create A Professional Structure And Your First Task

- Import gulp from gulp modules
  
    ```js
    const gulp = require('gulp');
    ```

- declare task using
  
    ```js
    gulp.task("taskname",funtion(){
        // Your task here
    });
    ```

- To run a task you run this command

    ```bash
        gulp task-name
    ```

> fix The following error => tasks did not complete: first-task
> https://stackoverflow.com/questions/36897877/gulp-error-the-following-tasks-did-not-complete-did-you-forget-to-signal-async

## Copy Files From Source To Destination

to transforme files from source to destination we choose the source then transform it to destination after applying some functions by `pip`

- Src can be a file using the name of the specific file or diff files using `*` ex: `gulp.src('index.html')`, `gulp.src('*.html')`, `gulp.src('*.*')`, or an array `gulp.src(['name1','name2'])`

- Specify the dstination that can be an existing folder or create a folder inside the destination ...etc : `gulp.dest('dist')`, `gulp.dest('dist/css')` ...etc.
  
    ```js
    return gulp.src(['project/index.html','project/about.html'])
                .pipe(gulp.dest('dist'))
    ```

## Concatenate CSS and JS Files In One File

- Install `gulp-concat` package

    ```bash
    npm install --save-dev gulp-concat
    ```

- Import the package and concate multiple files from source to destination ex:
  
    ```js
    gulp.task('css-task',async function(){
        return gulp.src('project/public/css/*')
                .pipe(concat('main.css'))
                .pipe(gulp.dest('dist/public/css'))
    });
    ```

## AutoPrefixer For CSS3 Properties

- Install `gulp-autoprefixer` package
  
    ```bash
    npm install --save-dev gulp-autoprefixer
    ```

- Import the package to prefix css properties
    `pipe(prefix())` or specifyes the versions to suport like `pipe(prefix('last 2 versions'))`

## Manage And Compile Sass Files

- Install `gulp-sass` package

    ```bash
    npm install node-sass gulp-sass --save-dev
    ```

- Import it and use it :D ex: `.pipe(sass())`, `.pipe(sass({outputStyle: 'compressed'}))`, `.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))`

## Compile Pugjs Files With Gulp Task

- Install `pugjs` package

    ```bash
    npm i gulp-pug --save-dev
    ```

- Import it and use it :p ex: `pipe(pug())`, this will compress the html file. or if you want to keep the code pretty `.pipe(pug({pretty: true}))`

> pugjs is quite like sass but for html :v. You can use it to import header html file etc ...

## Setting Up A Local Server To Test Files

- Install `static-server`

    ```bash
    npm i static-server --save
    ```

- Create `server.js`

    ```js
    var StaticServer = require('static-server');
    var server = new StaticServer({
    rootPath: './dist/',            // required, the root of the server file tree
    port: 8000,               // required, the port to listen
    });


    server.start(function () {
        console.log('Server listening to', server.port);
    });
    ```

- Run it with the command `node server.js` or by puting this line on any task `require('./server.js');`

## Use Gulp Watch Task

- To watch files u can use `gulp.watchè` function and write the thing that we want to watch and the task we want to apply.

    ```js
    gulp.task('watch-task', async function(){
        gulp.watch('thing-to-watch', gulp.series('task-name'));
    });
    ```

ex:

```js
gulp.task('watch-task', async function(){
    require('./server.js');
    gulp.watch(['project/index.pug','project/pug/*'], gulp.series('html-task'));
    gulp.watch(['project/public/sass/*','project/public/sass/components/*'], gulp.series('css-task'));
});
```

## Live Reload Browser

- Install the package

    ```bash
    npm install --save-dev gulp-livereload
    ```

- Import the package and add this line in every task except the watch task `.pipe(livereload());`
- Add the listen command in watch task `livereload.listen();`
- The package will not work alone unless we use a chrom extention or call the script that this package depned on. Add this script on the `index.pug`

  ```pug
  script(src="http://localhost:35729/livereload.js")
  ```

> if you use other server packages they do live reload by themselves

## Add Source Maps To Files

- Install the package

    ```bash
    npm i gulp-sourcemaps --save-dev
    ```

- Import the plugin then initialize it on the place you wanna use the map `.pipe(sourcemaps.init())`
- Write the map inside the folder you want by specifying the destination to prevent add it in the end of the main css file: `.pipe(sourcemaps.write('.'))`

> In my case the source map was created but does not work on the browser so I added `loadMaps: true` to `sourcemaps.init()`: `.pipe(sourcemaps.init({loadMaps: true}))` and the map worked :D.

## Minifying JS Files With Uglify

- Install the package `npm install --save-dev gulp-uglify`
- Import it then use it

    ```js
    gulp.task('js-task', async function(){
    return gulp.src('project/public/js/*.js')
            .pipe(concat('main.js'))
            .pipe(uglify())
            .pipe(gulp.dest('dist/public/js'))
            .pipe(livereload());
    });
    ```

## Show Notification With Notify

- Install the package `npm install --save-dev gulp-notify`
- Import and use the package ex: `.pipe(notify('HTML task ended'))`

> Do not forget to watch all tasks in watch task

## Compress Files With Gulp Zip

- Install the package `npm install --save-dev gulp-zip`
- Import it and use it:

```js
gulp.task('compress', async function(){
    return gulp.src('dist/**/*.*')
           .pipe(zip('website.zip'))
           .pipe(gulp.dest('.'))
           .pipe(notify('Files are compressed'))
});
```


## Credits

All credits goes for Learn Gulpjs course in Elzero Web School
