# IBM Bluemix - Personality Insights Sample (Node.js 版)

## はじめに  
Node-RED で Personality Insights による性格分析アプリを実装するハンズオンテキストを作成することになりました。折角の機会ですので、Node-RED 版以外に Node.js 版を作成して整理することにしました。   
Node-RED 版 のハンズオンテキストは [こちら](docs/Node-RED.md) をクリックしてください。  

## 使い方  
* 次のURLにアクセスしてください。
  - https://b20-o970605-personality-insights.eu-gb.mybluemix.net/
* テキストエリアに任意の文章を入力して、「分析する」ボタンをクリックしてください。
  - 例) 第192回国会における安倍内閣総理大臣の所信表明演説 (全文をコピー&ペーストできます。)
    - https://www.jimin.jp/news/parliament/133177.html

## セットアップ
このアプリを IBM Bluemix にセットアップする手順を示します。

1. personality-insights アプリを PC にダウンロード (Download ZIP) して解凍してください。ディレクトリ名は personality-insights-master から personality-insights に変更してください。

1. Bluemix コンソールにログインしてください。ここでは次の条件で説明をします。ご自身のアカウント情報に読替えて手順を進めてください。  
    - Region: United Kingdom
    - Organization: jiec_rd
    - Space: dev
  
1. Bluemix コンソールで CFアプリケーション (Node.js) を作成してください。以下の ippei0605 はご自身のユーザ名などに変更してください。  
アプリケーション名: personality-insights-ippei0605 (任意、前述の URL と同じ名前にならないようにしています。)  

    > 以降、personality-insights-ippei0605 で説明します。

1. PC に CF コマンド・ライン・インターフェースをインストールしていない場合は、インストールしてください。  
(Bluemix コンソール、アプリケーション内の開始 (Getting Started) メニューにダウンロードボタンがあります。)  

1. Bluemix コンソールで Personality Insights サービスを作成し、personality-insights-ippei0605 にバインドしてください。  
サービス名: 任意  
プラン: 任意 (本アプリでは tiered を選択)  

1. PC のターミナルソフトを起動してください。
(私は IntelliJ IDEA や Eclipse のターミナルを使っていますが、Windows の cmd 、Mac の　ターミナルなどで操作できます。)  

1. ターミナルで、解凍したディレクトリ (personality-insights アプリのホーム) に移動してください。(コマンドは以下、$はコマンドプロンプトです。)  
  ```
  $ cd personality-insights
  ```

1. ターミナルで、Bluemix に接続してください。前述の条件の通り、Region が Sydney になっていることに注意してください。  
  ```
  $ cf api https://api.eu-gb.bluemix.net
  ```

1. ターミナルで、Bluemix にログインしてください。-u にはご自身の ID を指定してください。また、前述の条件の通り、Organization が jiec_rd、Space が dev になっていることに注意してください。  
  ```
  $ cf login -u ippei0605@gmail.com -o jiec_rd -s dev
  ```

1. ターミナルで、アプリをデプロイしてください。  
  ```
  $ cf push personality-insights-ippei0605
  ```

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
    │      mybootstrap.css    サンプル画面の CSS
    │      pi-sample.html     サンプル画面の HTML
    │      pi-sample.js       サンプル画面の Javascript
    │      
    ├─routes
    │      index.js           ルーティング
    │      
    └─utils
           context.js         コンテキスト

> * EJS は使用しておりません。

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

## まとめ
* Node-RED でのハンズオンのため、テンプレート (HTML + JS) が参照するライブラリや CSS は全てホストされたものを選びました。
  - bootstrap
  - jquery
  - d3 (本家のコードより)
  - personality-sunburst-chart　(本家のコードより)
  - d3-color　(本家のコードより)
* /pi-analyze の呼出は HTTP (Ajax) と WebSocket で試行したところ同等だったため HTTP を選択しました。 (ボトルネックは Personality Insights サービス)  
* Node-RED では REST や WebSocket の受口を簡単に用意できますが、サービスのスペック以上にノードのスペック (実装コード) に依存するので自由度は低いです。加えて、各サービスのアップデートと同期が取れていない場合もあるため注意が必要です。  
* 継続的なアプリ開発においては、当初から Node.js で開発することをお勧めします。

## 参考資料  
* [Personality Insights Demo (本家)](https://personality-insights-livedemo.mybluemix.net/)
