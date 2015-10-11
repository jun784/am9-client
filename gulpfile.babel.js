/* jshint node: true */
// generated on 2015-06-27 using generator-gulp-webapp 1.0.2
'use strict';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import Easymock from 'easymock';
import bs from 'browser-sync';
import del from 'del';
import {stream as wiredep} from 'wiredep';
import webpack from 'webpack';
import fs from 'fs-extra';
import url from 'url';
import proxy from 'proxy-middleware';

import mockConfig from './easymock/config';
mockConfig.path = __dirname + '/easymock';

const $ = gulpLoadPlugins();
const mock = new Easymock.MockServer(mockConfig);

gulp.task('styles', () => {
  return gulp.src('app/main.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['last 1 version']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp'))
    .pipe(bs.stream());
});

gulp.task('scripts', (done) => {
  webpack(require('./webpack.conf.js'), done);
});

gulp.task('scripts:dev', (done) => {
  var compiler = webpack(require('./webpack.conf.dev.js'));

  compiler.watch(200, (err, stats) => {
    if (err) throw err;

    bs.reload();

    if (done) {
      done();
      done = null;
    }
  });
});

gulp.task('html', ['inject'], () => {
  const assets = $.useref.assets({searchPath: ['.tmp', 'app', '.']});

  return gulp.src('.tmp/*.html')
    .pipe(assets)
    .pipe($.if(['*.js', '!app/**/*.js'], $.uglify()))
    .pipe($.if('*.css', $.minifyCss({compatibility: '*'})))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe($.if($.if.isFile, $.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    }))
    .on('error', function (err) {
      console.log(err);
      this.end();
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', () => {
  return gulp.src(require('main-bower-files')({
    filter: '**/*.{eot,svg,ttf,woff,woff2}'
  }).concat('app/fonts/**/*'))
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', () => {
  return gulp.src([
    'app/*.*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('inject', () => {
  return gulp.src('app/*.html')
    .pipe($.inject(
      gulp.src(['.tmp/main.js', '.tmp/main.css'], { read: false }),
      { ignorePath: ['app', '.tmp'], addRootSlash: false }))
    .pipe(gulp.dest('.tmp'))
    .pipe(bs.stream({once: true}));
});

gulp.task('mock', () => {
  mock.start();
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', ['styles', 'scripts:dev', 'inject', 'fonts', 'mock'], () => {
  var proxyOptions = url.parse('http://localhost:3000/');
  proxyOptions.route = '/api/v1';

  bs({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp', 'app'],
      routes: {
        '/bower_components': 'bower_components'
      },
      middleware: [proxy(proxyOptions)]
    }
  });

  gulp.watch([
    'app/images/**/*',
    '.tmp/fonts/**/*'
  ]).on('change', bs.reload);

  gulp.watch('app/*.html', ['inject']);
  gulp.watch('app/fonts/**/*', ['fonts']);
  gulp.watch('bower.json', ['wiredep', 'fonts']);
});

gulp.task('serve:dist', () => {
  bs({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});

gulp.task('serve:test', () => {
  bs({
    notify: false,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'test',
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch('test/spec/**/*.js').on('change', bs.reload);
  gulp.watch('test/spec/**/*.js', ['lint:test']);
});

// inject bower components
gulp.task('wiredep', () => {
  gulp.src('app/main.scss')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest('app'));

  gulp.src('app/*.html')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('build', ['html', 'images', 'fonts', 'extras'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('publish', ['build'], (done) => {
  fs.copy('dist', '../public', done);
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});
