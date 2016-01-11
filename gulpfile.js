
// Create references
var gulp = require('gulp');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var server = require('gulp-live-server');

var angularFiles = [
    'angular/**/*.js'
];

var serverFiles = [
    'server.js'
];

var htmlFiles = [
    'angular/app/**/*.html'
];

// launches 'scripts' 'server' 'views' and 'watch' in the gulp default task
gulp.task('default', ['scripts','serve','views','watch']);

// gulp task to find all the js files in the angular folder and
// concat them and store them in public/js/app.js
gulp.task('scripts', function(){
    gulp.src(angularFiles)
        .pipe(concat('app.js'))
        .pipe(gulp.dest('public/js'));
});

// gulp task to find all the html files in the angular/app folder
// and store them in public/views
gulp.task('views', function(){
    gulp.src(htmlFiles)
        .pipe(gulp.dest('public/views'));
});

// gulp task to start the express server, also looks for changes
// to server files and live updates them.
gulp.task('serve', function(){
    var live = new server(serverFiles);
    live.start();

    gulp.watch(serverFiles, function(){
        live.start.apply(live);
    })
});

// gulp task to watch for any changes to all the
// js files and the html files in the app folder,
// if there are any changes 'scripts' and 'views' is ran
gulp.task('watch', function(){
    gulp.watch(angularFiles, ['scripts']);
    gulp.watch(htmlFiles, ['views']);
});