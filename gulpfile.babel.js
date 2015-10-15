/* jshint node: true */
// generated on 2015-06-27 using generator-gulp-webapp 1.0.2
'use strict';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import Easymock from 'easymock';
import bs from 'browser-sync';
import del from 'del';
import webpack from 'webpack';
import fs from 'fs-extra';
import url from 'url';
import proxy from 'proxy-middleware';
import mainBowerFiles from 'main-bower-files';
import historyApiFallback from 'connect-history-api-fallback';

import mockConfig from './easymock/config';
mockConfig.path = __dirname + '/easymock';

const $ = gulpLoadPlugins();
const mock = new Easymock.MockServer(mockConfig);

gulp.task('webpack', (done) => {
  webpack(require('./webpack.conf.js'), done);
});

gulp.task('webpack:dev', (done) => {
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

gulp.task('html', () => {
  const assets = $.useref.assets({searchPath: ['.tmp', 'app', '.']});

  return gulp.src('app/*.html')
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
  return gulp.src(mainBowerFiles({
    filter: '**/*.{eot,svg,ttf,woff,woff2}'
  }).concat('app/fonts/**/*'))
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('mock', () => {
  mock.start();
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', ['webpack:dev', 'fonts', 'mock'], () => {
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
      middleware: [proxy(proxyOptions), historyApiFallback()]
    }
  });

  gulp.watch([
    'app/images/**/*',
    '.tmp/fonts/**/*'
  ]).on('change', bs.reload);

  gulp.watch('app/*.html', bs.reload);
  gulp.watch('app/fonts/**/*', ['fonts']);
  gulp.watch('bower.json', ['fonts']);
});

gulp.task('build', ['webpack', 'html', 'images', 'fonts'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('publish', ['build'], (done) => {
  fs.copy('dist', '../public', done);
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});
