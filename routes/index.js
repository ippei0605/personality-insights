/**
 * Personality Insights Sample: ルーティング
 * @module routes/index
 * @author Ippei SUZUKI
 */

// モジュールを読込む。
var context = require('../utils/context');

/** 画面を表示する。 */
exports.index = function (req, res) {
    res.redirect('/pi-sample.html');
};

/**
 * プロフィールを返す。
 * @see {https://www.ibm.com/watson/developercloud/personality-insights/api/v3/?node#methods}
 */
exports.piAnalyze = function (req, res) {
    var params = {
        "text": req.body.text,
        "consumption_preferences": true,
        "raw_scores": true,
        "headers": {
            "content-type": "text/plain;charset=utf-8",
            "content-language": "ja",
            "accept": "application/json",
            "accept-language": "ja"
        }
    };
    context.pi.profile(params, function (error, response) {
            if (error) {
                console.log('Error:', error);
                res.status(500).send(error);
            } else {
                res.send(response);
            }
        }
    );
};