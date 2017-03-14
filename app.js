/**
 * @file Personality Insights Sample: アプリ
 * @author Ippei SUZUKI
 */

'use strict';

// モジュールを読込む。
const context = require('./utils/context');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const routes = require('./routes');

// アプリケーションを作成する。
const app = express();

// ミドルウェアを設定する。
app.use('/', express.static(__dirname + '/public'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(favicon(__dirname + '/public/favicon.ico'));

// ルートを設定する。
app.get('/', routes.index);
app.post('/pi-analyze', routes.piAnalyze);

// リクエトを受付ける。
app.listen(context.appEnv.port, '0.0.0.0', () => {
    console.log('server starting on ' + context.appEnv.url);
});