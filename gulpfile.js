const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));

// Compile SASS
function compileSass() {
  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
}

// Watch for changes
function watch() {
  browserSync.init({
    server: {
      baseDir: './src'
    }
  });

  gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], compileSass);
  gulp.watch('src/*.html').on('change', browserSync.reload);
}

// Define the default task
gulp.task('default', gulp.series(compileSass, watch));