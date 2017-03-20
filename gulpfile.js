var gulp = require('gulp');
var less = require('gulp-less');//引入less插件
var babel = require("gulp-babel");//引入es6编译插件
var clean = require('gulp-clean'); // 文件清理
var plumber = require('gulp-plumber');//异常处理插件，不会中断打包 
var changed =require('gulp-changed'); 
var path = require('path');

//文件路径命名 后期文件名称太多可以在这里命名变量，后面可直接使用变量
// var dCss=''
//或者对象字面量
//var gulp.paths={
//     dist:'dist',
//     distStyle:'dist/style',
// }
//歪门邪道，为解决删除文件时无法在打包文件处删除的问题，先将style下面所有文件删除，再重新打包一次，不推荐使用，只是用来玩一下
gulp.task('clean', function() {
  return gulp.src(['dist/style/*','dist/static/*','dist/scripts/*','!dist/scripts/lib'], {read: false})
    // .pipe(changed('dist'))s
    .pipe(clean());
});

//将less打包放入Vbook/style/文件下 
gulp.task("less", function () {
    return gulp.src(["./Vbook/style/**/*"])
            .pipe(plumber())
            .pipe(less())
            .pipe(gulp.dest("./dist/style/"))
});

//将js文件打包放入dist/scripts/文件下 
gulp.task("js", function () {
  return gulp.src(["./Vbook/scripts/**/*.js", "!./Vbook/scripts/lib/**/*.js"])//排除lib文件夹
    .pipe(plumber())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest("./dist/scripts/"))
});

//将jquery、vue.js2文件打包放入dist/scripts/文件下，没必要情况不需要改变 
gulp.task("libjs", function () {
  return gulp.src(["./Vbook/scripts/lib/**/*.js"])
    .pipe(plumber())
    .pipe(gulp.dest("./dist/lib/"))
});


//将图片文字打包放入Vbook/style/文件下 
gulp.task("imgs", function () {
    return gulp.src(["./Vbook/imgs/**/*"])
            .pipe(plumber())
            .pipe(gulp.dest("./dist/imgs/"))
});
//无损优化图片，未用
gulp.task('smushit', function () {
    return gulp.src('./Vbook/imgs/**/*')
        .pipe(debug({title: 'unicorn:'}))
        .pipe(smushit({
            verbose: true
        }))
        .pipe(gulp.dest('./dist/imgs'));
});
//将boostrap文件打包放入Vbook/style/文件下
gulp.task("bootstrap", function () {
  return gulp.src(["./Vbook/bootstrap/**/*"])
    .pipe(plumber())
    .pipe(gulp.dest("./dist/Vbook/bootstrap/"))
});

//合并文件
// gulp.task('testConcat', function () {
//     gulp.src('src/js/*.js')
//         .pipe(concat('all.js'))//合并后的文件名
//         .pipe(gulp.dest('dist/js'));
// });

gulp.task("watch", function () {
  //watch less
   gulp.watch(["Vbook/style/**/*"], ["less"]);
  //watch js
   gulp.watch(["Vbook/scripts/**/*"], ["js"]);
   gulp.watch(["Vbook/imgs/**/*"],["imgs"]);

});

gulp.task("default", ["less", "js", "libjs", 'imgs', 'bootstrap', "watch" ]);
gulp.task("build", ["less", "js", "libjs", 'imgs', 'bootstrap','webserver']);