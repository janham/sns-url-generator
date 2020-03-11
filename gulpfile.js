const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass');                            // sass, scssのコンパイル
const cssnext = require('postcss-cssnext');                   // 新しい標準仕様のCSSにする
const postcss = require('gulp-postcss');                      // 生成されたCSSに対して後処理をできるようにする
const processors = [cssnext({browsers: ['last 2 version']})]; // ベンダープレフィックスをCSSに付与
const browserSync = require('browser-sync').create();         // auto reload機能
const pug = require('gulp-pug');                              // pugのコンパイル
const plumber = require('gulp-plumber');                      // task実行中にエラーが出たらerrorHandlerを指定する
const notify = require('gulp-notify');                        // task実行中にエラーが出たら出力する
const imagemin = require('gulp-imagemin');                    // 画像圧縮
const mozjpeg = require('imagemin-mozjpeg');                  // jpegを圧縮 MDN製
const pngquant = require('imagemin-pngquant');                // pngを圧縮
const imageminGif = require('imagemin-gifsicle');             // gifを圧縮
const changed = require('gulp-changed');                      // 画像圧縮したものとしていないものを判別
const uglify = require('gulp-uglify-es').default;             // jsのminify
const rename = require('gulp-rename');                        // file名を変更
const sourcemaps = require('gulp-sourcemaps');                // ソースマップの作成

// 出力用path
const filePaths = {
    'html': './dist/',
    'css': './dist/css/',
    'js': './dist/js/',
    'image': './dist/images/',
    'resources': './dist/resources/'
}

// watchTask用path
const files = {
    'pugPath': './src/pug/*.pug',
    'pugNestPath': './src/pug/**/*.pug',
    'sassPath': './src/sass/*.scss',
    'sassNestPath': './src/sass/**/*.scss',
    'jsPath': './src/js/*.js',
    'jsNestPath': './src/js/**/*.js',
    'imgPath': './src/images/*',
    'imgNestPath': './src/images/**/*',
    'htmlPath': './src/html/*.html',
    'htmlNestPath': './src/html/**/*.html',
    'cssPath': './src/css/*.css',
    'cssNestPath': './src/css/**/*.css',
    'resourcesPath': './src/resources/*',
    'resourcesNestPath': './src/resources/**/*',
}

const pugOptions = {
    pretty: true
}

// Task: Watcher
function watchTask(done) {
    browserSync.init({
        server: {
            baseDir: filePaths.html
        }
    });
    watch(
        [
            files.pugPath,
            files.pugNestPath,
            files.sassPath,
            files.sassNestPath,
            files.jsPath,
            files.jsNestPath,
            files.imgPath,
            files.imgNestPath,
            files.htmlPath,
            files.htmlNestPath,
            files.cssPath,
            files.cssNestPath,
            files.resourcesPath,
            files.resourcesNestPath
        ],
        parallel(
            // 案件に合わせてjsMinTask, copyJsTaskを入れ替える
            pugTask,
            sassTask,
            jsMinTask,
            imgMinTask,
            copyHtmlTask,
            copyCssTask,
            copyImgTask,
            copyResources,
            browserReload
        )
    )
    done();
}

function browserReload(done) {
    browserSync.reload();
    done();
}

// Task: Convert Pug to HTML
function pugTask() {
    return src(['./src/pug/*.pug', './src/pug/**/*.pug', '!./src/pug/**/_*.pug'])
        .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
        .pipe(pug(pugOptions))
        .pipe(dest(filePaths.html));
}

// Task: Convert scss to css & minify
function sassTask() {
    return src(['./src/sass/*.scss', './src/sass/**/*.scss', '!./src/sass/**/_*.scss'])
        .pipe(sourcemaps.init())
            .pipe(sass({ outputStyle: 'compressed' })) // expanded → 通常のCSS compressed → minify 
            .pipe(postcss(processors))
        .pipe(sourcemaps.write())
        .pipe(dest(filePaths.css));
}

// Task: Minify JavaScript
function jsMinTask() {
    return src([ './src/js/*.js', './src/js/**/*.js'])
        .pipe(sourcemaps.init())
            .pipe(plumber())
            .pipe(uglify())
            .pipe(rename({ extname: '.min.js' }))
        .pipe(sourcemaps.write())
        .pipe(dest(filePaths.js));
}

// Task: Minify images
function imgMinTask() {
    return src(['./src/images/min/*', './src/images/min/**'])
        .pipe(changed('dist'))
        .pipe(
            imagemin([
                pngquant({
                    quality: [.85, .95], // 画質
                    speed: 1 // スピード
                }),
                mozjpeg({
                    quality: 85, // 画質
                    progressive: true
                }),
                imageminGif({
                    interlaced: false,
                    optimizationLevel: 3,
                    colors: 180
                })
            ])
        )
        .pipe(dest(filePaths.image + '/min/')); // 出力
}

/*---------------------------------------------------
    コンパイル・圧縮をしないファイルのTask ここから
---------------------------------------------------*/

// Task: copy HTML 要件に合わせてexampleDirを変更する。
function copyHtmlTask() {
    return src(['./src/html/*', './src/html/**'])
        .pipe(dest(filePaths.html));
}

// Task: copy CSS common/配下にはreset.cssやpluginなど共通のcssを入れる。
function copyCssTask() {
    return src(['./src/css/*', './src/css/**'])
        .pipe(dest(filePaths.css));
}

// Task: copy JavaScript 運用案件に合わせてjs-minifyと使い分ける。
function copyJsTask() {
    return src(['./src/js/*.', './src/js/**'])
        .pipe(dest(filePaths.js));
}

// Task: copy images 圧縮したくない・する必要のない画像はこのtaskで出力する
function copyImgTask() {
    return src(['./src/images/*'])
        .pipe(dest(filePaths.image));
}

function copyResources() {
    return src(['./src/resources/*', './src/resources/**'])
        .pipe(dest(filePaths.resources));
}

/*----------------------------------------------------
    ここまで
----------------------------------------------------*/

/*----------------------------------------------------
・npx gulpコマンドで実行する。
・taskは案件に合わせて適宜カスタマイズして使用。
・運用案件などMinifyすると成果物に影響が出る場合はjsMinTaskをcopyJsTaskに変更。
----------------------------------------------------*/
exports.default = series(parallel(pugTask, sassTask, jsMinTask, imgMinTask, copyHtmlTask, copyCssTask, copyImgTask, copyResources), watchTask);
