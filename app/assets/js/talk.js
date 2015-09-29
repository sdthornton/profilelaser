module.exports = class Talk {
  constructor() {
    this.talkContainer = document.getElementById('talk_box_container');
    this.talkBoxes = this.talkContainer.querySelectorAll('.talk-box');
    this.prevArrow = document.querySelector('.talk-arrow');
    this.nextArrow = document.querySelector('.talk-arrow--right');
    this.talkBoxHeight();
    window.addEventListener('resize', () => this.talkBoxHeight(), false)
    this.bindTalkArrows();
  	this.setTalkTimeout();
  }

  talkBoxHeight() {
    const talkHeights = [];
    for (let talkBox of this.talkBoxes) {
      talkHeights.push(talkBox.offsetHeight)
    }

    const talkHeight = Math.max.apply(null, talkHeights);
    this.talkContainer.style.height = `${talkHeight}px`;
  }

  setTalkTimeout() {
    clearTimeout(this.talkTimeout);
    this.talkTimeout = setTimeout(() => this.nextTalk(), 5000);
  }

  bindTalkArrows() {
    this.prevArrow.addEventListener('click', () => this.prevTalk(), false);
    this.nextArrow.addEventListener('click', () => this.nextTalk(), false);
  }

  nextTalk() {
    let currentActive = this.talkContainer.querySelector('.active-talk');
    let next = currentActive.nextElementSibling;
    if (next == null) {
      next = this.talkContainer.firstElementChild;
    }

    this.talkContainer.querySelector('.active-talk').classList.remove('active-talk');
    next.classList.add('active-talk');
    this.setTalkTimeout();
  }

  prevTalk() {
    let currentActive = this.talkContainer.querySelector('.active-talk');
    let prev = currentActive.prevElementSibling;
    if (prev == null) {
      prev = this.talkContainer.lastElementChild;
    }

    currentActive.classList.remove('active-talk');
    prev.classList.add('active-talk');
    this.setTalkTimeout();
  }
}
