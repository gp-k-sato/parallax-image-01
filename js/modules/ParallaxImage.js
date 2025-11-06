// import gsap from 'gsap';
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// gsap.registerPlugin(ScrollTrigger);

export class ParallaxImage {
  constructor(element) {
    this.DOM = {};
    this.DOM.element = element;
    this.DOM.image = this.DOM.element.children[0];

    this.speed = parseFloat(this.DOM.element.dataset.parallaxSpeed) || 1.2;

    this.resizeTimer = null;
    this.prevWidth = window.innerWidth;

    // 要素の読み込み完了後に処理
    // if (this.img.complete) {
    //	 this._setParallax();
    // } else {
    //	 this.img.addEventListener('load', () => {
    //		 this._setParallax();
    //	 });
    // }

    this._setParallax();
    this._addEvent();
  }

  _setParallax() {
    // 画像の高さを設定
    const heightPercentage = this.speed * 100;
    this.DOM.image.style.height = `${heightPercentage}%`;

    const wrapperHeight = this.DOM.element.offsetHeight;
    const imageHeight = this.DOM.image.offsetHeight;

    // 親と画像の高さ差分で移動距離を設定
    const moveY = imageHeight - wrapperHeight;

    if (moveY <= 0) return;

    gsap.fromTo(
      this.DOM.image,
      {
        y: 0
      },
      {
        y: -moveY,
        ease: 'none',
        scrollTrigger: {
          trigger: this.DOM.element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );
  }

  _handleResize() {
    const currentWidth = window.innerWidth;
    if (this.prevWidth !== currentWidth) {
      this.prevWidth = currentWidth;
      
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === this.DOM.element) {
          trigger.kill();
        }
      });

      this._setParallax();
    }
  }

  _addEvent() {
    window.addEventListener('resize', () => {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => {
        this._handleResize();
      }, 100);
    });
  }
}