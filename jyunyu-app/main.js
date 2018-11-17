(function main() {
  'use strict';

  kintone.events.on('mobile.app.record.index.show', (event) => {
    // 画面の空白部分を取得
    const headerSpace = kintone.mobile.app.getHeaderSpaceElement();

    // 時刻表示コンテナを作成
    const hourContainer = document.createElement('div');
    // 時計・タイトルを作成
    // ボタンコンテナを作成
    const buttonContainer = document.createElement('div');
    // 新規登録ボタン・追加ボタン２つを作成
    // 当日のレコードが無いとき、新規登録ボタンを表示
    // 当日のレコードがある場合、テーブル追加（授乳開始・授乳終了）ボタンを表示

    // 入力欄コンテナを作成
    // 授乳量入力欄を作成
    // memo入力欄を作成

    // 全部をheaderSpaceにappendする
  });
}());
