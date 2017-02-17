# IBM Bluemix - Personality Insights Sample (Node.js 版)

## はじめに  
Node-RED で Personality Insights による性格分析アプリを実装するハンズオンテキストを作成することになりました。折角の機会ですので、[Node-RED 版](docs/Node-RED.md)以外に Node.js 版を作成して整理することにしました。   

## 使い方  
* 次のURLにアクセスしてください。
  - https://310-o970605-personality-insights.au-syd.mybluemix.net/
* テキストエリアに任意の文章を入力して、「分析する」ボタンをクリックしてください。
  - 例) 第192回国会における安倍内閣総理大臣の所信表明演説 (全文をコピー&ペーストできます。)
    - https://www.jimin.jp/news/parliament/133177.html

## セットアップ
このアプリを IBM Bluemix にセットアップする手順を示します。

1. personality-insights アプリをダウンロード (Download ZIP) して解凍してください。ディレクトリ名は personality-insights-master から personality-insights に変更してください。

1. Bluemix コンソールから CFアプリケーション (Node.js) を作成してください。以下の ippei0605 はご自身のユーザ名などに変更してください。  
アプリケーション名: personality-insights-ippei0605 (任意、前述の URL と同じ名前にならないようにしています。)  

    > 以降、personality-insights-ippei0605 で説明します。

1. CF コマンド・ライン・インターフェースをインストールしていない場合は、インストールしてください。  

1. Personality Insights サービスを作成し、personality-insights-ippei0605 にバインドしてください。  
サービス名: 任意  
プラン: 任意 (本アプリでは tiered を選択)  

1. 解凍したディレクトリ (personality-insights アプリのホーム) に移動してください。

        > cd personality-insights

1. Bluemix に接続してください。

        > cf api https://api.au-syd.bluemix.net
    
1. Bluemix にログインしてください。

        > cf login -u ippei0605@gmail.com -o jiec_gitou -s dev

1. アプリをデプロイしてください。

        > cf push personality-insights-ippei0605

## ファイル構成  
    personality-insights
    │  .cfignore
    │  .gitignore
    │  app.js                 アプリ
    │  package.json
    │  README.md
    │
    ├─docs
    │      flow.json          Node-RED 版のフロー定義 (エクスポート)
    │      flow.png           Node-RED.md の図
    │      Node-RED.md        Node-RED 版の説明書
    │      
    ├─public
    │      favicon.ico
    │      pi-sample.html     画面
    │      
    ├─routes
    │      index.js           ルーティング
    │      
    └─utils
           context.js         コンテキスト

## ルート (URLマッピング)  
|Action|Method|処理|
|-----------|----|----------------|
|/          |GET |画面を表示する。   | 
|/pi-analyze|POST|プロフィールを返す。|

## Node.js 版 (本アプリ) と Node-RED 版の比較
|                |Node.js   |Node-RED                             |
|----------------|----------|-------------------------------------|
|アプリのメモリ     |256MBで充分|1GBに増やさないと2回目以降の分析でダウンする | 
|レスポンスタイム   |速い       |遅い (Node.js 版の約2倍)               |
|エラー制御        |できる     |できない (多分 personality insights ノードがエラー時にコールバックしない実装) *1|

    *1 Personality Insights は最低100語入力しないとエラーになります。　　
       エラー制御できないため暫定対応としてクライアント JavaScript で文字数の判定をしています。

## まとめ
* Node-RED でのハンズオンのため、テンプレート (HTML + JS) が参照するライブラリや CSS は全てホストされたものを選びました。
  - bootstrap
  - jquery
  - d3 (本家のコードより)
  - personality-sunburst-chart　(本家のコードより)
  - d3-color　(本家のコードより)
* /pi-analyze の呼出は Ajax と Web Socket で試行したところ同等だったため Ajax を選択しました。 (ボトルネックは Personality Insights サービス)  
* Node-RED はサービスではなくノードのスペック (実装コード) に依存するので自由度は低いです。加えて、各サービスのアップデートと同期が取れていない場合もあるため注意が必要です。  

## 参考資料  
* [Personality Insights Demo (本家)](https://personality-insights-livedemo.mybluemix.net/)