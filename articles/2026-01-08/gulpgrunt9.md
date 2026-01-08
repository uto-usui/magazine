---
title: "必ず使うタスクランナーGulpとGruntの基本コード9選"
source: "https://ics.media/entry/9199/"
publishedDate: "2015-10-02"
category: "frontend"
feedName: "ICS MEDIA"
author: "nohara"
---

みなさんはタスクランナーを使用していますか？ **タスクランナーとは開発作業を自動化するためのツール**で、2013年頃からWebのフロントエンド開発のトレンドとなっています。**開発の現場では主にオープンソースの[Gulp](https://gruntjs.com/)（ガルプ）と[Grunt](https://gruntjs.com/)（グラント）がよく使われています**。

本記事ではGulpとGruntの両方の導入方法とウェブ制作でよく使用するプラグインの使い方を紹介します。GulpとGruntのいずれかはすでにインストールしているとして紹介します（記事末尾で付録としてインストール方法を解説しています）。

※GruntとGulpの違いを知りたい方は記事「[絶対つまずかないGulp入門](http://ics.media/entry/3290/)」を参考ください。

この記事は2018年12月にリリースされたGulp 4に対応しています

### ファイルの複製

作業用のフォルダーからリリース用のフォルダーへファイルをコピーしたい時などに複製するタスクを登録しておくと便利です。

例として`src`フォルダーに配置されたファイルを`dist`フォルダーに複製するというタスクを作成します。

![タスクランナーでのコピーの方法](https://ics.media/entry/9199/images/151001_copy.png)

#### Grunt

ファイルの複製には「[grunt-contrib-copy](http://www.npmjs.com/package/grunt-contrib-copy)」というプラグインを使用します。

##### プラグインのインストール

```
npm install grunt-contrib-copy -D
```

##### 記述例（gruntfile.js）

```
module.exports = function(grunt) {
  grunt.initConfig({
    copy: {
      main: {
        // コピー元フォルダーの指定
        src: "src/*",
        // コピー先フォルダーの指定
        dest: "dist/"
      }
    }
  });
  grunt.loadNpmTasks("grunt-contrib-copy");

  grunt.registerTask("default", ["copy"]);
};
```

-   [サンプルを確認する](https://github.com/ics-creative/151002_taskrunner/tree/master/copy_files_grunt)

#### Gulp

Gulpの場合ファイルの複製にプラグインの追加は不要です。

##### 記述例（gulpfile.js）

```
const gulp = require("gulp");

gulp.task("copy", () =>
  // コピー元フォルダーの指定
  gulp
    .src("src/*")
    // コピー先フォルダーの指定
    .pipe(gulp.dest("dist/src"))
);

gulp.task("default", gulp.task("copy"));
```

-   [サンプルを確認する](https://github.com/ics-creative/151002_taskrunner/tree/master/copy_files_gulp)

### ファイルの削除

一時的で最終的には不要なファイルやフォルダーの削除などが必要になることがあります。そういった場合はファイルの削除タスクを登録すると便利です。

例として`dir1`フォルダーに配置している`abc.txt`の削除と`dir2`以下の`abc/code`と名前がつくファイルを削除します。`dir2`フォルダーの`abc.js`は削除対象から外すというタスクを作成します。

![タスクランナーでのファイルの削除の方法](https://ics.media/entry/9199/images/151001_delete.png)

#### Grunt

Gruntの場合、ファイルの削除には「[grunt-contrib-clean](https://www.npmjs.com/package/grunt-contrib-clean)」を使用します。

##### プラグインのインストール

```
npm install grunt-contrib-clean -D
```

##### 記述例（gruntfile.js）

```
module.exports = function(grunt) {
  grunt.initConfig({
    clean: {
      build: [
        // 削除するファイルの指定
        "dir1/abc.txt",
        "dir2/abc.*",
        // パス名の前に「!」使用することで否定の意味をもたせます。
        // ここでは削除をしないという意味になります。
        "!dir2/abc.js"
      ]
    }
  });

  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.registerTask("default", ["clean"]);
};
```

-   [サンプルを確認する](https://github.com/ics-creative/151002_taskrunner/tree/master/delete_files_grunt)

#### Gulp

Gulpの場合ファイルの削除には、「[del](https://www.npmjs.com/package/del)」というプラグインを使用します。

##### プラグインのインストール

```
npm install del -D
```

##### 記述例（gulpfile.js）

```
const gulp = require("gulp");
const del = require("del");

gulp.task("clean", () =>
  del([
    // 削除するファイルの指定
    "dir1/abc.txt",
    "dir2/abc.*",
    // パス名の前に「!」使用することで否定の意味をもたせます。
    // ここでは削除をしないという意味になります。
    "!dir2/abc.js"
  ])
);

gulp.task("default", gulp.task("clean"));
```

-   [サンプルを確認する](https://github.com/ics-creative/151002_taskrunner/tree/master/delete_files_gulp)

### ファイルの移動

さまざまなタスクを組み合わせた結果、中間ファイルを作成後にリリースファイルへ移動したいときがあります。ここではその場合のタスクについて紹介します。

例として、`cache.txt`を`dist/hello.md`へ移動させてみます。

![タスクランナーでのファイルの移動](https://ics.media/entry/9199/images/151001_taskrunner_move.png)

#### Grunt

Gruntでのファイルの移動には「[grunt-contrib-rename](https://www.npmjs.com/package/grunt-contrib-rename)」を使用します。移動先のフォルダーが作成されていない場合はエラーが発生してしまうため注意してください。

##### プラグインのインストール

```
npm install grunt-contrib-rename -D
```

##### 記述例（gruntfile.js）

```
module.exports = function(grunt) {
  grunt.initConfig({
    rename: {
      main: {
        files: [
          {
            src: ["cache.txt"],
            dest: "dist/hello.md"
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-rename");
  grunt.registerTask("default", ["rename"]);
};
```

-   [サンプルを確認する](https://github.com/ics-creative/151002_taskrunner/tree/master/move_files_grunt)

#### Gulp

Gulpでファイル名を変更して出力する場合は「[gulp-rename](https://www.npmjs.com/package/gulp-rename)」を使用します。このプラグインを使用しても元ファイルは削除されず残るため、必要があれば前述で紹介した「del」プラグインを使用して元ファイルの削除を行います。

##### プラグインのインストール

```
npm install gulp-rename del -D
```

##### 記述例（gulpfile.js）

```
const gulp = require("gulp");
const rename = require("gulp-rename");
const del = require("del");

// ファイルの移動
gulp.task("move", () =>
  // 対象のファイルを指定
  gulp
    .src("cache.txt")
    // ファイル名を変更
    .pipe(rename("hello.md"))
    // 出力先を指定
    .pipe(gulp.dest("dist"))
);

// 元のファイルを削除
gulp.task("clean", () => del(["cache.txt"]));

gulp.task("default", gulp.series("move", "clean"));
```

-   [サンプルを確認する](https://github.com/ics-creative/151002_taskrunner/tree/master/move_files_gulp)

### ファイルの結合

複数のファイル結合することで、ページ読み込み時のファイルのリクエスト数を減らすことができるため、時間短縮に効果的です。

例として`css`フォルダーに配置している`abc.css` `def.css` `ghi.css`ファイル結合し、`dist/css/style.css`として書き出します。

![タスクランナーでのファイルの結合](https://ics.media/entry/9199/images/151001_taskrunner_concat.png)

#### Grunt

Gruntでのファイルの結合には「[grunt-contrib-concat](https://www.npmjs.com/package/grunt-contrib-concat)」を使用します。

##### プラグインのインストール

```
npm install grunt-contrib-concat -D
```

##### 記述例（gruntfile.js）

```
module.exports = function(grunt) {
  grunt.initConfig({
    concat: {
      // 結合場所に使う文字列を指定
      options: {
        separator: "\n"
      },
      dist: {
        // 結合するファイルを指定
        src: ["css/abc.css", "css/def.css", "css/ghi.css"],
        // 結合先を指定
        dest: "dist/css/style.css"
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.registerTask("default", ["concat"]);
};
```

-   [サンプルを確認する](https://github.com/ics-creative/151002_taskrunner/tree/master/concat_files_grunt)

#### Gulp

Gulpでのファイルの結合には「[gulp-concat](https://www.npmjs.com/package/gulp-concat)」を使用します。

##### プラグインのインストール

```
npm install gulp-concat -D
```

##### 記述例（gulpfile.js）

```
const gulp = require("gulp");
const concat = require("gulp-concat");

// ファイル結合タスクを作成
gulp.task("concat", () =>
  // 結合元のファイルを指定
  gulp
    .src(["css/abc.css", "css/def.css", "css/ghi.css"])
    // 結合後のファイル名を指定
    .pipe(concat("style.css"))
    // 出力フォルダを指定
    .pipe(gulp.dest("./dist/css/"))
);

gulp.task("default", gulp.task("concat"));
```

-   [サンプルを確認する](https://github.com/ics-creative/151002_taskrunner/tree/master/concat_files_gulp)

### ファイルの監視

ファイルを監視して、あるファイルに変更があったときに自動でタスクを実行するといった動作が可能です。コンパイルが必要なタスクを登録することでバックグラウンドで自動でコンパイルが終わっているといった自動処理ができます。

例として、`js`フォルダー内のJSファイルが変更されたら、「`console.log("file changed");`」を呼び出すタスクを作成します。

#### Grunt

Gruntの場合、ファイルの監視をするときに「[grunt-contrib-watch](https://www.npmjs.com/package/grunt-contrib-watch)」プラグインを使用します。

##### プラグインのインストール

```
npm install grunt-contrib-watch -D
```

##### 記述例（gruntfile.js）

```
module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      scripts: {
        // 監視するファイルのパス
        files: ["js/**/*.js"],
        // ファイルに変更があった場合に実行されるタスク
        tasks: ["filechanged"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.registerTask("filechanged", function() {
    console.log("file changed");
  });
  grunt.registerTask("default", ["watch"]);
};
```

-   [サンプルを確認する](https://github.com/ics-creative/151002_taskrunner/tree/master/watch_files_grunt)

#### Gulp

Gulpの場合、ファイルの監視をするときに[watch()](https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpwatchglob--opts-tasks-or-gulpwatchglob--opts-cb)関数を使用します。

##### 記述例（gulpfile.js）

```
const gulp = require("gulp");

gulp.task("watch", () =>
  // 監視するファイルのパス
  gulp.watch("js/**/*.js", function(event) {
    // ファイルの変更後実行したい処理
    console.log("file changed");
  })
);

gulp.task("default", gulp.task("watch"));
```

-   [サンプルを確認する](https://github.com/ics-creative/151002_taskrunner/tree/master/watch_files_gulp)

GruntでもGulpでも共通ですが、監視を開始するとその時点からコマンドラインの通常のキー入力受付が行われなくなります。監視を停止するにCtrl+Cとキー入力を行う必要があります。監視を継続したまま別のコマンドを入力する場合は新しくコマンドラインのウィンドウを開く必要があります。

### JavaScriptファイルのminify

JavaScriptファイルの容量を小さくするために改行やインデントを除去する作業を「**minify**」（ミニファイ）といいます。JSライブラリで`●●●.min.js`というファイル名でminifyが適用されたJSファイルが提供されていることがありますが、ページ読み込み時の時間短縮にminifyは効果的です。minifyはタスクランナーに登録できます。

![タスクランナーでのminify](https://ics.media/entry/9199/images/151001_uglify.png)

#### Grunt

JavaScriptファイルの圧縮や整形などには「[grunt-contrib-uglify](https://www.npmjs.com/package/grunt-contrib-uglify)」を使用します。

##### プラグインのインストール

```
npm install grunt-contrib-uglify -D
```

##### 記述例（gruntfile.js）

```
module.exports = function(grunt) {
  grunt.initConfig({
    uglify: {
      target: {
        files: {
          // 書き出されるファイル名, 圧縮するファイル名
          "dist/hello.js": ["src/hello.js"],
          "dist/goodby.js": ["src/goodby.js"]
        }
      }
    }
  });
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.registerTask("default", ["uglify"]);
};
```

-   [サンプルを確認する](https://github.com/ics-creative/151002_taskrunner/tree/master/min_javascript_grunt)

#### Gulp

GulpのJavaScriptファイルの圧縮や整形などには「[gulp-uglify](https://www.npmjs.com/package/gulp-uglify)」を使用します。

##### プラグインのインストール

```
npm install gulp-uglify -D
```

##### 記述例（gulpfile.js）

```
const gulp = require("gulp");
const uglify = require("gulp-uglify");

gulp.task("compress", () =>
  // 圧縮元ファイル名
  gulp
    .src(["src/hello.js", "src/goodby.js"])
    // JavaScriptファイルの圧縮
    .pipe(uglify())
    // 圧縮後の書き出し先
    .pipe(gulp.dest("dist"))
);

gulp.task("default", gulp.task("compress"));
```

-   [サンプルを確認する](https://github.com/ics-creative/151002_taskrunner/tree/master/min_javascript_gulp/gulpfile.js)

### 画像ファイルの最適化

画像ファイルの最適化を行うことで、画像の劣化をできるだけ抑えたままファイルの容量を減らすことができます。画像の最適化はページ読み込み時の時間短縮に効果的です。

例として、imagesフォルダーに配置されたpng画像を最適化を行ってからdist/imagesフォルダーにファイルを配置するタスクを作成します。

![](https://ics.media/entry/9199/images/151001_imagemin.png)

#### Grunt

画像の圧縮には「[grunt-contrib-imagemin](https://www.npmjs.com/package/grunt-contrib-imagemin)」を使用します。

##### プラグインのインストール

```
npm install grunt-contrib-imagemin -D
```

##### 記述例（gruntfile.js）

```
module.exports = function (grunt) {
  grunt.initConfig({
    imagemin: {
      build: {
        files: [{
          expand: true,
          // 元の畫像の配置フォルダー
          cwd: "images/",
          // 画像のマッチパターン
          src: ["*.png"],
          // 最適化済みの画像を書き出すフォルダー
          dest: "dist/images/"
        }]
      }
    }
  });
  
  grunt.loadNpmTasks("grunt-contrib-imagemin");
  grunt.registerTask("default", ["imagemin"]);
};
```

-   [サンプルを確認する](https://github.com/ics-creative/151002_taskrunner/tree/master/min_images_grunt)

#### Gulp

画像の圧縮には「[gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin)」というプラグインを使用します。

##### プラグインのインストール

```
npm install -D gulp-imagemin
```

##### 記述例（gulpfile.js）

```
const gulp = require("gulp");
const imagemin = require("gulp-imagemin");

gulp.task("imagemin", () =>
  // 画像のマッチパターン
  gulp
    .src("images/*.png")
    // 画像の最適化処理
    .pipe(imagemin())
    // 最適化済みの画像を書き出すフォルダー
    .pipe(gulp.dest("dist/images"))
);

gulp.task("default", gulp.task("imagemin"));
```

-   [サンプルを確認する](https://github.com/ics-creative/151002_taskrunner/tree/master/min_images_gulp)

### TypeScriptのコンパイル

TypeScriptはクラスやアロー関数式、型注釈や型推論などの機能を搭載したプログラミング言語で、JavaScriptファイルへ変換する事ができます。JavaScriptの開発で高度な言語機能を利用したい時にTypeScriptが役立ちます。このTypeScriptのコンパイル処理もタスクランナーに登録できます。

例としてtsフォルダーに配置しているTypeScriptファイルをJavaScriptへコンパイルし、jsフォルダーへ書き出すというタスクを作成します。

![](https://ics.media/entry/9199/images/151001_typescript.png)

#### Grunt

TypeScriptのコンパイルには「[grunt-typescript](https://www.npmjs.com/package/grunt-typescript)」を使用します。

##### プラグインのインストール

```
npm install grunt-typescript -D
```

##### 記述例（gruntfile.js）

```
module.exports = function(grunt) {
  grunt.initConfig({
    typescript: {
      base: {
        // TypeScriptのファイルが配置しているフォルダー
        src: ["ts/**/*.ts"],
        // 出力先のフォルダ
        dest: "js/",
        // オプションの設定
        options: {
          // コメントの削除を行うか？
          removeComments: false,
          // es3, es5, es6から選択
          // ECMAScript 5向けに書き出し
          target: "es5"
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-typescript");
  grunt.registerTask("default", ["typescript"]);
};
```

-   [サンプルを確認する](https://github.com/ics-creative/151002_taskrunner/tree/master/compile_typescript_grunt)

#### Gulp

TypeScriptのコンパイルには「[gulp-typescript](https://www.npmjs.com/package/gulp-typescript)」を使用します。

##### プラグインのインストール

```
npm install gulp-typescript typescript -D
```

##### 記述例（gulpfile.js）

```
const gulp = require("gulp");
const ts = require("gulp-typescript");

gulp.task("default", () =>
  // TypeScriptのファイルが配置している"
  gulp
    .src("ts/**/*.ts")
    .pipe(
      ts({
        // ES3, ES5, ES6から選択
        // ECMAScript 5向けに書きだし
        target: "es5",
        // コメントを削除するか？
        removeComments: false
      })
    )
    // jsプロパティを参照
    .js // 書き出し"の指定
    .pipe(gulp.dest("js"))
);
```

-   [サンプルを確認する](https://github.com/ics-creative/151002_taskrunner/tree/master/compile_typescript_gulp)

### Sassのコンパイル

SassとはCSSのプリプロセッサーで、高機能な書式を使ってスタイルシートをCSSを使うよりも効率よく記述できます。Sassはプリプロセッサーであるためコンパイルが必要となりますが、そのコンパイル処理をタスクランナーに登録できます。

例として、sassフォルダー以下にあるscssファイルをcssフォルダーにコンパイルして書き出すタスクを作成します。

![](https://ics.media/entry/9199/images/151001_sass.png)

#### Grunt

SaaSのコンパイルには「[grunt-contrib-sass](https://www.npmjs.com/package/grunt-contrib-sass)」を使用します。

##### プラグインのインストール

```
npm install grunt-contrib-sass -D
```

##### 記述例（gruntfile.js）

```
module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      dist: {
        files: [
          {
            expand: true,
            // scssファイルの配置フォルダー
            cwd: "sass",
            // scssファイルのマッチパターンの指定
            src: ["**/*.scss"],
            // フォルダーの指定
            dest: "css",
            // 拡張子の指定
            ext: ".css"
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.registerTask("default", ["sass"]);
};
```

-   [サンプルを確認する](https://github.com/ics-creative/151002_taskrunner/tree/master/compile_sass_grunt)

※GruntでSassをコンパイルするにはプラグインのインストールの他にSass本体のインストールが必要です。

#### Gulp

Sassのコンパイルには「[gulp-sass](https://www.npmjs.com/package/gulp-sass)」を使用します。

##### プラグインのインストール

```
npm install gulp-sass -D
```

##### 記述例（gulpfile.js）

```
const gulp = require("gulp");
const sass = require("gulp-sass");

gulp.task("default", () =>
  // scssファイルの配置フォルダー及びマッチパターン
  gulp
    .src("sass/**/*.scss")
    // scssファイルの変換処理と、エラーが起こった場合のログ書き出し
    .pipe(sass().on("error", sass.logError))
    // cssを書き出すディレクトリの指定
    .pipe(gulp.dest("css"))
);
```

-   [サンプルを確認する](https://github.com/ics-creative/151002_taskrunner/tree/master/compile_sass_gulp)

### 終わりに

ウェブ開発で利用されることの多いファイル操作を中心に紹介しました。1つ一つのタスクは5分もかからず作成できますので、みなさんもぜひタスクランナーの便利さに触れてみてください。他にも記事「[ブラウザ確認が一瞬！ Grunt・Gulpと始めるBrowserSync入門](https://ics.media/entry/3405/)」でWebサイト制作時に役立つ方法を説明していますのであわせてご覧ください。

### タスクランナーを使用する準備

GruntやGulpのインストールには「[Node Package Manager(npm)](https://www.npmjs.com/)」が必要となり、**「[Node.js](https://nodejs.org/)」をインストールすることでnpmコマンドが使用可能となります**。本記事ではすでにnpmコマンドは実行可能なものとして話をすすめていきます。

実行したいフォルダーで設定ファイルを用意します。以下のコマンドを実行すると、プロジェクトの設定情報が記述されたpackage.jsonが生成されます。途中で、プロジェクト名や著作権の設定をどうするかという入力を求められますが、設定が不要ならばすべてYes(Enterキー)で構いません。

##### npmの設定ファイルを作成する（コマンドライン）

```
npm init
```

##### 「npm init」実行後に作成されるファイル（package.json）

```
{
  "name": "taskrunner-sample",
  "version": "0.0.0",
  "description": "タスクランナーのサンプルファイルです",
  "main": "gulpfile.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" &amp;amp;&amp;amp; exit 1"
  },
  "author": "",
  "license": ""
}
```

### Gruntのインストール・タスクの書き方

#### 1\. Gruntの核部分をインストール

コマンドライン（Windowsではコマンドプロンプト、macOSではターミナル。app)を立ち上げ、以下のコマンドを実行します。成功するとGruntの核となる部分をインストールできます。

```
npm install -g grunt-cli
```

※macOSで「npm ERR! message EACCES, permission denied」のエラーが発生した場合は「sudo npm install -g grunt-cli」と、sudoコマンドを使用して管理者権限で試してみてください。(OSXのログインパスワードの入力が必要です。また、パスワードはコマンドライン上に表示されませんのでご注意ください）

#### 2\. プロジェクト別にGruntをインストール

**プロジェクトフォルダー内にGruntをインストールします**。前述の「`npm init`」コマンドで作成した「package.json」ファイルがあるフォルダーで下記の「`npm instal`」コマンドを実行します。成功すると「node\_modules」フォルダーが作成され、Gruntの実行環境がインストールされます。

npm installに「save-dev」というオプションを設定することで、package.jsonにプラグインのバージョン情報が保存されます。

```
npm install grunt -D
```

#### 3\. Gruntタスクを実行するプラグインをインストールする

Gruntでタスクを実行するには、Grunt本体とは別にプラグインをインストールすると便利です。ここでは例としてファイルをコピーするタスクを作成するためのプラグインをインストールします。下記のコマンドで、「[grunt-contrib-copy](http://www.npmjs.com/package/grunt-contrib-copy)」プラグインをインストールできます。

```
npm install grunt-contrib-copy -D
```

#### 4\. gruntfile.jsの記述

Gruntのタスクはgruntfile.jsに記述を行います。gruntfile.jsの記述は下記の形となります。`initConfig()`関数内にJSON形式で記述します。個別に必要なプラグインは`loadNpmTasks()`関数で読み込みを行います。

また、`grunt.registerTask()`関数を使うと、タスクを組み合わせて登録することができます。

```
module.exports = function(grunt) {
  grunt.initConfig({
    copy: {
      // プラグインの名前
      main: {
        // 設定などの記述を行う
        // コピー元フォルダーの指定
        src: "src/*",
        // コピー先フォルダーの指定
        dest: "dist/"
      }
    }
  });
  // 必要なプラグインの読み込み
  grunt.loadNpmTasks("grunt-contrib-copy");

  // 独自タスクの登録を行います。最初の引数を"default"とすると、コマンドライン上で引数無しで実行できます。
  // 第2引数の配列にinitConfig()関数で設定したタスクを登録します。
  grunt.registerTask("default", ["copy"]);
};
```

#### 5\. 実行（コマンドライン）

```
grunt
```

### Gulpのインストール・タスクの書き方

#### 1\. プロジェクト別にGulpをインストール（コマンドライン）

**プロジェクトフォルダー内にGulpをインストールします**。前述の「`npm init`」コマンドで作成した「package.json」ファイルがあるフォルダーで下記の「`npm instal`」コマンドを実行します。成功すると「node\_modules」フォルダーが作成され、Gulpの実行環境がインストールされます。

npm installに「–save-dev」もしくは「-D」（省略名）というオプションを設定することで、package.jsonにプラグインのバージョン情報が保存されます。

```
npm install gulp -D
```

#### 3\. 記述例（gulpfile.js）

Gulpはgulpfile.jsに記述を行います。タスクは`gulp.task()`関数内に`pipe()`関数でメソッドチェーン形式で記述します。必要なプラグインは`require()`関数で読み込みを行います。

```
const gulp = require("gulp");

gulp.task("task-name", function() {
  return gulp
    .src("src/*.js") // ファイルの読み込みを行うフォルダーやファイルなどを指定します。
    .pipe(gulp.dest("dist")); // ファイルを書き出します
});

// gulpのデフォルトタスクとして"task-name"のタスクを登録する
gulp.task("default", gulp.task("task-name"));
```

#### 4\. 実行（コマンドライン）

`gulp.task()`関数で登録したタスクを実行します。

```
npx gulp
```

以上がGruntとGulpのインストール手順となります。