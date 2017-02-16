/**
 * Personality Insights Sample: コンテキスト
 *
 * @module utils/context
 * @author Ippei SUZUKI
 */

// モジュールを読込む。
var cfenv = require('cfenv');
var vcapServices = require('vcap_services');
var PersonalityInsights = require('watson-developer-cloud/personality-insights/v3');

/** 環境変数 */
exports.appEnv = cfenv.getAppEnv();

/** Path */
exports.path = require('path');

// Watson Personality Insights Credentials
var piCreds = vcapServices.getCredentials('personality_insights');
piCreds.version_date = '2016-10-20';

/** Watson Personality Insights */
exports.pi = new PersonalityInsights(piCreds);