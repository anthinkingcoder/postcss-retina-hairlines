var gulp = require('gulp')
var postcss = require('gulp-postcss')
var retinaHairlines = require('./index')

var options = {
  base64: true,
  blackList: ['.example1']
}

gulp.task('css', function () {
  return gulp.src('test/source.css')
      .pipe(postcss([retinaHairlines(options)]))
      .pipe(gulp.dest('example'))
})