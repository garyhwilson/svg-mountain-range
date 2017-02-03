const babel = require("gulp-babel");
const gulp = require('gulp');
const rename = require("gulp-rename");
const rollup = require('rollup-stream');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const eslint = require('gulp-eslint');

gulp.task('lint', () => {
	return gulp.src(['src/**/*.js'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('build-js', function () {
	rollup({
			entry: './src/SVGMountainRange.js',
			sourceMap: true,
			format: 'iife',
			moduleName: 'SVGMountainRange'
		})
		.on('error', e => {
			console.error(`${e.stack}`);
		})
		.pipe(source('SVGMountainRange.js', './src'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(babel({presets: ['es2015']}))
		.pipe(rename('svg-mountain-range.min.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('lib'));
});

gulp.task('watch-js', function(){
	gulp.watch('src/**/*.js', ['build-js']);
});

gulp.task('default', ['build-js', 'watch-js']);