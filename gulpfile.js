var gulp = require('gulp');
var browserSync = require('browser-sync').create();


gulp.task('bs', function() {
    browserSync.init({
        watch: true,
        server: "./app"
    })
});