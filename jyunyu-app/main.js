let EVENT;
let RESP;
(function main() {
  'use strict';
  moment.locale('ja');
  kintone.events.on('mobile.app.record.index.show', (event) => {
    EVENT = event;
    // 画面の空白部分を取得
    const headerSpace = kintone.mobile.app.getHeaderSpaceElement();

    // 時刻表示コンテナを作成
    const hourContainer = document.createElement('div');
    // 時計・タイトルを作成
    const appTitle = document.createElement('h1');
    appTitle.textContent = '前回の授乳は';
    const clock = document.createElement('p');
    clock.id = 'clock';
    // 時計・タイトルをhourContainer,headerSpaceにappendする
    hourContainer.appendChild(appTitle);
    hourContainer.appendChild(clock);
    headerSpace.appendChild(hourContainer);
    // 前回の授乳からの時間を取得する関数
    const getParam = {
      app: event.appId,
      totalCount: true,
    };
    const showDate = () => {
      kintone.api(kintone.api.url('/k/v1/records', true), 'GET', getParam, (resp) => {
        RESP = resp;
        let lastTime = moment(RESP.records[0].Table.value[RESP.records[0].Table.value.length - 1].value.授乳終了.value).startOf('hour').fromNow();
        console.log(moment(RESP.records[0].Table.value[RESP.records[0].Table.value.length - 1].value.授乳終了.value).format('MMMM Do YYYY, h:mm'));
        console.log(moment().format('MMMM Do YYYY, h:mm'));
        // alert(`前回の授乳時間は ${lastTime} です`);
        document.getElementById('clock').textContent = `${lastTime} だよ`;
      });
    };
    // 時刻表示の関数を実行
    showDate();
    // 時刻表示にCSSを適用
    hourContainer.style.textAlign = 'center';
    appTitle.style.fontFamily = 'sans-serif';
    appTitle.style.fontSize = '25px';
    appTitle.style.color = '#666';

    clock.style.fontFamily = 'monaco';
    clock.style.fontSize = '35px';
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

    startButton.style.backgroundColor = '#f16f6f';
    finishButton.style.backgroundColor = '#94d2e6';

    // 入力欄コンテナを作成
    const formContainer = document.createElement('div');
    // 授乳量入力欄を作成
    const milkForm = document.createElement('form');
    milkForm.id = 'milkForm';
    const milkFormImput = document.createElement('input');
    milkFormImput.type = 'text';
    milkFormImput.id = 'milkFormImput';
    // memo入力欄を作成
    const memoForm = document.createElement('form');
    memoForm.id = 'memoForm';
    // 入力欄をformContainer,headerSpaceにappendする
    formContainer.appendChild(milkForm);
    formContainer.appendChild(memoForm);
    headerSpace.appendChild(formContainer);
    // 授乳開始ボタンが押されたときの処理
    const clilkStartButton = () => {
      if (!confirm('授乳をはじめます')) {
        return; // エラーがでます
        // その後の処理
      }
    };
    // 授乳終了ボタンが押されたときの処理
    startButton.addEventListener('click', clilkStartButton);
  });
}());
