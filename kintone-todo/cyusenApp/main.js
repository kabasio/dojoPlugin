(function main() {
  kintone.events.on('app.record.index.show', (event) => {
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
    i.setAttribute('aria-hidden', 'true');
    lotteryButton.appendChild(i);

    // ボタンクリック時の操作
    lotteryButton.addEventListener('click', () => {
      // レコードを全件取得
      const fetchRecords = ((appId, optOffset, optLimit, optRecords) => {
        const offset = optOffset || 0;
        const limit = optLimit || 100;
        let allRecords = optRecords || [];

        const params = {
          app: appId,
          query: `order by レコード番号 asc limit ${limit} offset ${offset}`,
        };
        return kintone.api('/k/v1/records', 'GET', params).then((resp) => {
          allRecords = allRecords.concat(resp.records);

          if (resp.records.length === limit) {
            return fetchRecords(appId, offset + limit, limit, allRecords);
          }
          return allRecords;
        });
      });
      // 抽選実行
      return fetchRecords(kintone.app.getId()).then((allRecords) => {
        // 抽選ロジック
        const num = allRecords.length;
        const rand = Math.floor(Math.random() * num);
        const name = allRecords[rand].name.value;

        // SweetAlertで当選者表示
        return swal({
          title: `${name} さん当選です！`,
          text: 'おめでとうございます☆*:.｡. o(≧▽≦)o .｡.:*☆',
          timer: 3000,
          showConfirmButton: false,
        });
      });
    });
    menu.appendChild(lotteryButton);
  });
}());
