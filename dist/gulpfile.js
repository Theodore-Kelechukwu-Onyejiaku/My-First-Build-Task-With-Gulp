"use strict";var gulp=require("gulp"),jshint=require("gulp-jshint"),babel=require("gulp-babel"),uglify=require("gulp-uglify"),runSequence=require("run-sequence"),browserSync=require("browser-sync").create();gulp.task("processHTML",function(){gulp.src("*.html").pipe(gulp.dest("dist"))}),gulp.task("processImage",function(){gulp.src("images/*").pipe(gulp.dest("dist"))}),gulp.task("processJS",function(){gulp.src("*.js").pipe(jshint({esversion:6})).pipe(jshint.reporter("default")).pipe(babel({presets:["env"]})).pipe(uglify()).pipe(gulp.dest("dist"))}),gulp.task("babelPolyfill",function(){gulp.src("node_modules/babel-polyfill/browser.js").pipe(gulp.dest("dist/node_modules/babel-polyfill"))}),gulp.task("browserSync",function(){browserSync.init({server:"./dist",port:8080,ui:{port:8081}})}),gulp.task("watch",["browserSync"],function(){gulp.watch("*.js",["processJS"]),gulp.watch("*.html",["processHTML"]),gulp.watch("images/*",["processImage"]),gulp.watch("dist/*.js",browserSync.reload),gulp.watch("dist/*.html",browserSync.reload)}),gulp.task("default",function(e){runSequence(["processHTML","processJS","babelPolyfill"],"watch",e)});