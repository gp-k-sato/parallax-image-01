// import gsap from 'gsap';
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// gsap.registerPlugin(ScrollTrigger);

export class ParallaxImage {
  constructor(element) {
    this.DOM = {};
    this.DOM.element = element;
    this.DOM.img = this.DOM.element.querySelector('img');

    // 要素の読み込み完了後に処理
    // if (this.img.complete) {
    //	 this._setParallax();
    // } else {
    //	 this.img.addEventListener('load', () => {
    //		 this._setParallax();
    //	 });
    // }

    this._setParallax();

  }

  _setParallax() {
    const wrapperHeight = this.DOM.element.offsetHeight;
    const imgHeight = this.DOM.img.offsetHeight;

    // 親と画像の高さ差分で移動距離を設定
    const moveY = imgHeight - wrapperHeight;

    if (moveY <= 0) return;

    gsap.fromTo(
      this.DOM.img,
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
}