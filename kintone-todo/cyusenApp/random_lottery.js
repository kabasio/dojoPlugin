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
  });


})();