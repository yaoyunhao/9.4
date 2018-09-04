var gulp = require('gulp');
var css = require('gulp-clean-css');
var scss = require('gulp-sass');
var server = require('gulp-webserver');
//编译，解压
gulp.task('css', function() {
        return gulp.src('./src/scss/index.scss')
            .pipe(scss())
            .pipe(css())
            .pipe(gulp.dest('./src/css'));
    })
    //监听
gulp.task('watch', function() {
        return gulp.watch('./src/scss/index.scss', gulp.series('css'))
    })
    // 服务
gulp.task('server', function() {
        return gulp.src('src')
            .pipe(server({
                port: 8080,
                middleware: function(req, res, next) {
                    var pathname = require('url').parse(req.url).pathname;
                    if (req.url === "/favicon.ico") {
                        res.end();
                        return
                    }

                    pathname = pathname === "/" ? "index.html" : pathname;
                    res.end(require("fs").readFileSync(require('path').join(__dirname, "src", pathname)))

                }
            }))
    })
    //整合
gulp.task('default', gulp.series('css', 'server', 'watch'));