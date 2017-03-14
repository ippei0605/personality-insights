/*
 * Personality Insights Sample: クライアント JavaScript
 */

'use strict';

$(document).ready(() => {
    const image = 'https://personality-insights-livedemo.mybluemix.net/images/service-icon.svg';
    const chart = new PersonalitySunburstChart({"selector": "#chartId", "version": "v3"});

    $('#analyzeId').on('click', () => {
        const resultId = $('#resultId');
        const statusId = $('#statusId');
        let text = $('#textId').val();
        statusId.html('<p class="text-info">分析中です・・・</p>');
        $.ajax({
            "type": "POST",
            "url": "/pi-analyze",
            "data": {
                "text": text
            }
        }).done((value) => {
            chart.show(value, image);
            statusId.append('<p class="text-info">・・・完了しました。</p>');
        }).fail((value) => {
            statusId.append('<p class="text-danger">・・・エラーが発生しました。</p>');
        }).always((value) => {
            resultId.html('<pre>' + JSON.stringify(value, undefined, 2) + '</pre>');
        });
        return false;
    });
});