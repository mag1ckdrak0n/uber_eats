//Plugin modules
const gulp = require('gulp');
      concat = require('gulp-concat');
      autoprefixer = require('gulp-autoprefixer');
      cleanCss = require('gulp-clean-css');
      uglify = require('gulp-uglify');
      del = require('del');
      browserSync = require('browser-sync').create();

function styles() {
    return gulp.src('src/css/*.css')
                .pipe(concat('styles.css'))
                .pipe(autoprefixer({
                    browsers: ['last 3 versions'],
                    cascade: false
                }))
                .pipe(cleanCss({
                    level: 2
                }))
                .pipe(gulp.dest('./build/css/'));              
}

function scripts() {
    return gulp.src('src/js/*.js')
                .pipe(concat('main.js'))
                // .pipe(uglify({
                //     toplevel: false
                // })) 
                .pipe(gulp.dest('./build/js/'));              
}

function img() {
    return gulp.src('src/img/*.*')
                .pipe(gulp.dest('./build/img/'));
}

function html() {
    return gulp.src('src/*.html')
                .pipe(gulp.dest('./build/'));               
}
//watcher
function watch() {
    browserSync.init({
        server: {
            baseDir: "src/"
        }
    });

    gulp.watch('src/css/**/*.css').on('all', gulp.series(styles, browserSync.reload));
    gulp.watch('src/js/**/*.js').on('all', gulp.series(scripts, browserSync.reload));
    gulp.watch('src/*.html').on('all', gulp.series(html, browserSync.reload));
}

function clean() {
    return del(['build/css/*.css', 'build/js/**/*.js', 'build/*.html']);
}

//Tasks
gulp.task('styles', styles);
gulp.task('script', scripts); 
gulp.task('watch', watch);
gulp.task('clean', clean);

gulp.task('build', gulp.series(clean, 
                        gulp.parallel(styles, scripts, img, html)
                        ));