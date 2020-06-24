const gulp = require("gulp");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const postcssPresetEnv = require("postcss-preset-env");
const cssImport = require("postcss-import");
const nested = require("postcss-nested");
const cssnano = require("cssnano");
const notify = require("gulp-notify");

function css() {
  return gulp
    .src("./src/less/*.less")
    .pipe(less())
    .pipe(
      postcss([
        cssImport(),
        nested(),
        postcssPresetEnv({
          // autoprefixer: { grid: true },
          stage: 1,
        }),
      ])
    )
    .pipe(postcss([cssnano()]))
    .pipe(gulp.dest("./css/"))
    .pipe(
      notify({
        message: "Your CSS is ready ♡",
      })
    );
}

function neptune() {
  return gulp
    .src("./src/neptune.less")
    .pipe(less())
    .pipe(postcss([cssImport()]))
    .pipe(postcss([cssnano()]))
    .pipe(gulp.dest("./css/"))
    .pipe(
      notify({
        message: "Your Neptune CSS is ready ♡",
      })
    );
}

function watch() {
  gulp.watch("./src/less/*.less", css);
}

const build = gulp.series(css, neptune);

exports.css = css;
exports.neptune = neptune;
exports.watch = watch;
exports.default = build;
