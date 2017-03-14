/**
 * Personality Insights Sample: コンテキスト
 *
 * @module utils/context
 * @author Ippei SUZUKI
 */

'use strict';

// モジュールを読込む。
const cfenv = require('cfenv');
const vcapServices = require('vcap_services');
const PersonalityInsights = require('watson-developer-cloud/personality-insights/v3');

/** 環境変数 */
exports.appEnv = cfenv.getAppEnv();

/** Path */
exports.path = require('path');

// Watson Personality Insights Credentials
const piCreds = vcapServices.getCredentials('personality_insights');
piCreds.version_date = '2016-10-20';

/** Watson Personality Insights */
exports.pi = new PersonalityInsights(piCreds);