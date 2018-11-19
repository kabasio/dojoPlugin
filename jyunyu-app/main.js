let indexEvent;
(function main() {
  'use strict';
  kintone.events.on('mobile.app.record.index.show', (event) => {
    indexEvent = event;
    // 画面の空白部分を取得
    const headerSpace = kintone.mobile.app.getHeaderSpaceElement();

    // 時刻表示コンテナを作成
    const hourContainer = document.createElement('div');
    // 時計・タイトルを作成
    const appTitle = document.createElement('h1');
    appTitle.textContent = '前回の授乳時間から';
    const clock = document.createElement('p');
    clock.id = 'clock';
    // 時計・タイトルをhourContainer,headerSpaceにappendする
    hourContainer.appendChild(appTitle);
    hourContainer.appendChild(clock);
    headerSpace.appendChild(hourContainer);
    // 前回の授乳からの時間を取得する関数
    const showDate = () => {
      const nowTime = moment().format('HH:mm:ss');
      // テーブルの情報を取得
      const tableRecords = event.record;
      console.log(tableRecords);
      document.getElementById('clock').textContent = nowTime;
    };
    // 時刻表示の関数を実行
    showDate();
    // 時刻表示にCSSを適用
    hourContainer.style.textAlign = 'center';
    appTitle.style.fontFamily = 'sans-serif';
    appTitle.style.fontSize = '25px';
    appTitle.style.color = '#666';

    clock.style.fontFamily = 'monaco';
    clock.style.fontSize = '25px';
    // ボタンコンテナを作成
    const buttonContainer = document.createElement('div');
    // 授乳開始ボタン・終了ボタンを作成するための関数を定義
    const createButton = (id, txt) => {
      const button = document.createElement('button');
      button.id = id;
      button.textContent = txt;
      button.style.display = 'flex';
      button.style.margin = '0px 20px 20px 20px';
      button.style.padding = '15px 15px';
      button.style.color = '#ffffff';
      button.style.border = '0 none';
      button.style.borderRadius = '4px';
      button.style.fontSize = '55px';
      button.style.fontWeight = 'bold';
      return button;
    };
    // ボタン作成の関数を実行,コンテナと画面空白にappendする
    const startButton = createButton('start', '授乳開始！');
    const finishButton = createButton('finish', '授乳おわり！');
    buttonContainer.appendChild(startButton);
    buttonContainer.appendChild(finishButton);
    headerSpace.appendChild(buttonContainer);
    // ボタンコンテナ・各ボタンにCSSを適用
    buttonContainer.style.display = 'flex';
    buttonContainer.style.margin = '40px auto';
    buttonContainer.style.flexWrap = 'wrap';
    buttonContainer.style.justifyContent = 'center';

    startButton.style.backgroundColor = '#3dd28d';
    finishButton.style.backgroundColor = '#353866';

    // 入力欄コンテナを作成
    const formContainer = document.createElement('div');
    // 授乳量入力欄を作成
    const milkForm = document.createElement('form');
    milkForm.id = 'milkForm';
    // memo入力欄を作成
    const memoForm = document.createElement('form');
    memoForm.id = 'memoForm';
    // 入力欄をformContainer,headerSpaceにappendする
    formContainer.appendChild(milkForm);
    formContainer.appendChild(memoForm);
    headerSpace.appendChild(formContainer);
  });
  // 当日のレコードが無いとき、新規登録ボタンを表示
  // 当日のレコードがある場合、テーブル追加
}());
