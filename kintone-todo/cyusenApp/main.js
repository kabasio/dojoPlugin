(function() {
  'use strict';
  kintone.events.on('app.record.index.show', function(event) {
    
    // ボタン増殖防止
    if (document.getElementById('lottery-button') !== null) {
      return;
    }

    // ボタン作成
    const menu = kintone.app.getHeaderMenuSpaceElement();
    const lotteryButton = document.createElement('button');
    lotteryButton.id = 'lottery-button';
    lotteryButton.class = 'lottery-button';
    lotteryButton.title = '抽選';

    const i = document.createElement('i');
    i.class = 'fa fa-gift';
    i.setAttribute(("aria-hidden", "true"));
    lotteryButton.appendChild(i);

    // ボタンクリック時の操作
    lotteryButton.addEventListener(click, function() {
      // レコードを全件取得
      const fetchRecords = (function(appId, opt_offset, opt_limit, opt_records) {
        const offset = opt_offset || 0;
        const limit = opt_limit || 100;
        let allRecords = opt_records || [];

      const params = {
        app: appId,
        query: 'order by レコード番号 asc limit ' + limit + ' offset ' + offset
    　};

      return kintone.api('/k/v1/records', 'GET', params).then(function() {
        allRecords = allRecords.concat(resp.records);

          if (resp.records.length === limit) {
            return fetchRecords(appId, offset + limit, limit, allRecords);
          }
          return allRecords;
      });
      });

    });
  });
})();