var gulp = require('gulp');
var browserSync = require('browser-sync').create();


gulp.task('bs', function() {
    browserSync.init({
        watch: true,
        server: "./app"
    })
});

gulp.task('bs-js', function() {
    browserSync.init({
        watch: true,
        server: "./app/.jstutorial"
    })
});