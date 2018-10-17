(function() {
  'use strict';

  // 日付の変換
  function convertDateTime(str) {
    if (str !== '') {
      return '/Date(' + (new Date(str)).getTime + ')/';
    }
    return '';
  };

  // エスケープ処理
  function escapeHtml(str) {
    str = str.replace(/&/g, '&amp;');
    str = str.replace(/</g, '&lt;');
    str = str.replace(/>/g, '&gt;');
    str = str.replace(/"/g, '&quot;');
    str = str.replace(/'/g, '&#39;');
    return str;
};

  // レコード一覧表示時のイベント
  kintone.events.on('app.record.index.show', function(event){
    const records = event.records;
    let data = [];

    // レコードがないときは表示しない
    if (records.length === 0) {
        return;
    }
    const elSpace = kintone.app.getHeaderSpaceElement();

    // headerSpaseにスタイルをあてる
    elSpace.style.marginLeft = '15px';
    elSpace.style.marginRight = '15px';
    elSpace.style.border = 'solid 1px #ccc';

    // ガントチャートの要素を作る
    let elGantt = document.getElementById('gantt');
    if (elGantt === null) {
        elGantt = document.createElement('div');
        elGantt.id = 'gantt';
        elSpace.appendChild(elGantt);
    }

    // ログインユーザーの位置設定によって、月の表示をかえる
    let user = kintone.getLoginUser();
    let ganttMonths, ganttDow, ganttWaitmessage = '';
    switch (user['language']) {  // はじめて見た。ライブラリ独自のやつかな
        case 'ja':
            ganttMonths = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
            ganttDow = ['日', '月', '火', '水', '木', '金', '土'];
            ganttWaitmessage = '表示するまでお待ちください。';
            break;
        case 'zh':
            ganttMonths = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
            ganttDow = ['日', '一', '二', '三', '四', '五', '六'];
            ganttWaitmessage = '请等待显示屏';
            break;
        default:
            ganttMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            ganttDow = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            ganttWaitmessage = 'Please Wait...';
            break;
    }

    // レコードに値を入れるところだけど、もうちょっと詳しくどんな処理か読んでコメントに入れる
    for (var i = 0; i < records.length; i++) {

        let colorGantt = 'ganttGray';
        switch (records[i]['Priority']['value']) {
            case 'A':
                colorGantt = 'ganttRed';
                break;
            case 'B':
                colorGantt = 'ganttOrange';
                break;
            case 'C':
                colorGantt = 'ganttGreen';
                break;
            case 'D':
                colorGantt = 'ganttBlue';
                break;
            case 'E':
                colorGantt = 'ganttYellow';
                break;
            case 'F':
                colorGantt = 'ganttGray';
                break;
            default:
                colorGantt = 'ganttGray';
        }

        let descGantt = '<strong>' + escapeHtml(records[i]['To_Do']['value']) + '</strong>';
        if (records[i]['From']['value']) {
            descGantt += '<br />' + 'From: ' + escapeHtml(records[i]['From']['value']);
        }
        if (records[i]['To']['value']) {
            descGantt += '<br />' + 'To: ' + escapeHtml(records[i]['To']['value']);
        }
        if (records[i]['Priority']['value']) {
            descGantt += '<br />' + escapeHtml(records[i]['Priority']['value']);
        }

        let obj = {
            id: escapeHtml(records[i]['$id']['value']),
            name: escapeHtml(records[i]['To_Do']['value']),
            values: [{
                from: convertDateTime(records[i]['From']['value']),
                to: convertDateTime(records[i]['To']['value']),
                desc: descGantt,
                label: escapeHtml(records[i]['To_Do']['value']),
                customClass: escapeHtml(colorGantt)
            }]
        };
        data.push(obj);
    }

    // Set in Gantt object.
    $(elGantt).gantt({
        source: data,
        navigate: 'scroll',
        scale: 'days', // days,weeks,months
        maxScale: 'months',
        minScale: 'days',
        months: ganttMonths,
        dow: ganttDow,
        left: '70px',
        itemsPerPage: 100,
        waitText: ganttWaitmessage,
        scrollToToday: true
    });
  });


})();