(function() {
  'use strict';
  kintone.events.on('app.record.index.show', function(event) {
    
    // ボタン増殖防止
    if (document.getElementById('lottery-button') !== null) {
      return;
    }

    // ボタン作成
    const $lotteryButton = $('<button class="lottery-button" id="lottery-button" title="抽選"><i class="fa fa-gift" aria-hidden="true"></i></button>');

    const menu = kintone.app.getHeaderMenuSpaceElement();
    const lotteryButton = document.createElement('button');
    lotteryButton.id = 'lottery-button';
    lotteryButton.class = 'lottery-button';
    lotteryButton.title = '抽選';

    const i = document.createElement('i');
    i.class = 'fa fa-gift';
    i.ariaHidden = 'true';
    lotteryButton.appendChild(i);

  });


})();