/*
 * Personality Insights Sample: クライアント JavaScript
 */
$(document).ready(function () {
    var image = 'https://personality-insights-livedemo.mybluemix.net/images/service-icon.svg';
    var chart = new PersonalitySunburstChart({"selector": "#chartId", "version": "v3"});

    $('#analyzeId').on('click', function () {
        var resultId = $('#resultId');
        var statusId = $('#statusId');
        var text = $('#textId').val();
        statusId.html('<p class="text-info">分析中です・・・</p>');
        $.ajax({
            "type": "POST",
            "url": "/pi-analyze",
            "data": {
                "text": text
            }
        }).done(function (value) {
            chart.show(value, image);
            statusId.append('<p class="text-info">・・・完了しました。</p>');
        }).fail(function (value) {
            statusId.append('<p class="text-danger">・・・エラーが発生しました。</p>');
        }).always(function (value) {
            resultId.html('<pre>' + JSON.stringify(value, undefined, 2) + '</pre>');
        });
        return false;
    });
});