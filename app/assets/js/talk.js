module.exports = class Talk {
  constructor() {
    this.talkBoxHeight();

    $(window).on('resize', () => {
      this.talkBoxHeight();
    });

  	setInterval(this.nextTalk, 5000);
  }

  talkBoxHeight() {
    const talkHeights = [];
    $('.talk-box').each(function() {
      talkHeights.push($(this).outerHeight());
    });

    const talkHeight = Math.max.apply(null, talkHeights);
    document.getElementById('talk_box_container').style.height = talkHeight + 'px';
  }

  nextTalk() {
    let next = $('.active-talk').next();
    if ($('.talk-box').last().hasClass('active-talk')) {
      next = $('.talk-box').first();
    }

    $('.active-talk').removeClass('active-talk')
    next.addClass('active-talk');
  }
}
