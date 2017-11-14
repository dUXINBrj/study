var gulp = require('gulp'),
    concat = require('gulp-concat'),//将多个文件合并为一个文件
    minifyCss = require('gulp-minify-css'),
    minify = require('gulp-minify'),
    del = require('del'),//删除文件
    runSequence = require('run-sequence'),
    spriter = require('gulp-css-spriter');//雪碧图
uglify = require('gulp-uglify');
var path = {
    input: {
        js: ['js/*.js'],
        //按一定的顺序打包压缩js 
        jsSort: ['js/mainpagecommon.js', 'js/index.js'],
        css: ['css/*.css']
    },
    output: {
        dist: 'dist',
        plugins: 'dist/plugins'
    }
}

gulp.task('js', function(done) {
    return gulp.src(path.input.jsSort)
        .pipe(uglify())
        .pipe(concat('index.min.js'))
        .pipe(gulp.dest(path.output.dist))
});

gulp.task('css', function() {
    return gulp.src(path.input.css)
        .pipe(spriter({
            'spriteSheet': './images/spritesheet.png', //这是雪碧图自动合成的图。 很重要
            'pathToSpriteSheetFromCSS': '../images/spritesheet.png' //这是在css引用的图片路径，很重要
        }))
        .pipe(minifyCss())
        .pipe(concat('index.min.css'))
        .pipe(gulp.dest(path.output.dist));
});

gulp.task('clean', function() {
    return del(path.output.dist);
});

gulp.task('build', function(callback) {
    runSequence('clean', ['js', 'css'], callback);
});

//cmd 执行 gulp build