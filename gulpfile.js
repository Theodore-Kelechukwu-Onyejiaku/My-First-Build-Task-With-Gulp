//importing our gulp and other dependencies
const gulp = require('gulp');
const jshint = require('gulp-jshint');
const babel = require('gulp-babel');//Remember that for this babel to work, I had to use npm install --save-dev run-sequence
const uglify = require('gulp-uglify');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync').create();


//Moving our HTML files to the dist folder
gulp.task('processHTML', () => {
    gulp.src('*.html')
      .pipe(gulp.dest('dist'));
  });

//Moving our image folder to dist folder
gulp.task("processImage", () =>{
    gulp.src("images/*")
        .pipe(gulp.dest("dist"));
})

//Moving, linting, transpiling and minimizing our javaScript file
gulp.task('processJS', () => {
    gulp.src('*.js') 
    .pipe(jshint({
        esversion: 6
      }))
      .pipe(jshint.reporter('default'))//This tells us errors and some es 6, but just for code quality
      .pipe(babel({   //Remember that for this babel to work, I had to use npm install --save-dev run-sequence
        presets: ['env']
      }))
      .pipe(uglify())//This minimizes all our js files
      .pipe(gulp.dest('dist'));//After all the processes above, this moves all files to dist folder
  });

  //Adding our polyfill
  gulp.task('babelPolyfill', () => {
    gulp.src('node_modules/babel-polyfill/browser.js')
      .pipe(gulp.dest('dist/node_modules/babel-polyfill'));
  });

  //Adding our browserSync task to refresh and reload anytime changes are made
  gulp.task('browserSync', () => {
    browserSync.init({
      server: './dist',//This will serve from dist folder
      port: 8080,//We are using port 8080
      ui: {
        port: 8081//The UI for browsersync is 8081
      }
    });
  });

  //We add a watch task that will listen to any of the tasks above or changes in files below
  gulp.task('watch', ["browserSync"], () => {
    gulp.watch('*.js', ['processJS']);
    gulp.watch('*.html', ['processHTML']);
    gulp.watch("images/*", ['processImage']);

    gulp.watch('dist/*.js', browserSync.reload);
    gulp.watch('dist/*.html',browserSync.reload);
  });

  //Adding our default task that will enable us to just run "gulp" and see all our tasks running together
  gulp.task('default', (callback) => {
    runSequence(['processHTML', 'processJS', 'babelPolyfill'], 'watch', callback);
  });