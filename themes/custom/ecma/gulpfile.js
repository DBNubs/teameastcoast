/* eslint-env node, es6 */
/* global require */
'use strict';

/**
 * Configuration
 */
// Load dependencies
const {
  parallel,
  series,
  src,
  dest,
  task,
  watch,
} = require('gulp'),
  gulpIf = require('gulp-if'),
  sourceMaps = require('gulp-sourcemaps'),
  sass = require('gulp-sass'),
  postCss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  cssNano = require('cssnano'),
  pxToRem = require('postcss-pxtorem');

// File locations
const cssSource = './scss/**/*.scss',
  cssOutput = './css/';

// Create easier to read errors
// Currently unused, but might be useful in the future
// const logError = (error) => console.log(
// `\n- Begin error ----------\n
// ${error}
// \n- End error ------------\n`
// );

const isDev = process.env.NODE_ENV === 'dev';

if (isDev) {
  console.log('/************************\n * Compiling in DEV mode!\n */\n');
} else {
  console.log('/*************************\n * Compiling in PROD mode.\n */\n');
}

/**
 * CSS Compilation
 */
const processScss = () =>
  src(cssSource)
  // Omitting linting because of the amount of errors
  // .pipe(sassLint())
  // .pipe(sassLint.format())
  // .pipe(gulpIf(!isDev, sassLint.failOnError()))
  // Start compiling
  .pipe(gulpIf(isDev, sourceMaps.init())) // Sourcemaps haven't been reliable
  .pipe(sass())
  .pipe(
    postCss([
      pxToRem({
        'propList': ['*', ],
      }),
      autoprefixer(),
    ])
  )
  // Minify if production build
  .pipe(gulpIf(!isDev, postCss([cssNano(), ])))
  .pipe(gulpIf(isDev, sourceMaps.write())) // Sourcemaps haven't been reliable
  .pipe(dest(cssOutput));

const compileCSS = series(processScss);

/**
 * Watch Files
 */
const watchFiles = (done) => {
  // Do what we came here to do
  watch(cssSource, compileCSS);
  done();
};

/**
 * Gulp tasks
 */
task('default',
  compileCSS
);

task('watch',
  // Run globScss first so we can avoid watching globbed files
  watchFiles
);
