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
    const wrapperHeight = this.DOM.element.offsetHeight;
    
    // クラスをリセット
    this.DOM.image.classList.remove('is-reverse-parallax', 'is-normal-parallax');
    
    let startY, endY, heightPercentage;

    if (this.speed >= 1.0) {
      // 1.0以上：通常のパララックス（上から下へ）
      this.DOM.image.classList.add('is-normal-parallax');
      heightPercentage = this.speed * 100;
      this.DOM.image.style.height = `${heightPercentage}%`;
      
      const imageHeight = this.DOM.image.offsetHeight;
      const moveY = imageHeight - wrapperHeight;
      
      if (moveY <= 0) return;
      
      startY = 0;
      endY = -moveY;
      
    } else {
      // 1.0未満：逆パララックス（下から上へ）
      this.DOM.image.classList.add('is-reverse-parallax');
      
      // 0に近づくほど視差効果が強くなるように計算
      // 1未満でも1以上と同程度の効果になるよう調整
      const reverseSpeed = 1.0 - this.speed; // 1.0からの差分
      
      // 1以上の場合と同様の強度になるよう基準を調整
      const effectiveSpeed = 1.0 + reverseSpeed; // 実効的なスピード
      const maxMove = wrapperHeight * (effectiveSpeed - 1.0); // 1以上と同様の計算
      
      // 移動距離を考慮して画像の高さを設定
      const requiredHeight = wrapperHeight + maxMove;
      const heightPercentage = (requiredHeight / wrapperHeight) * 100;
      this.DOM.image.style.height = `${heightPercentage}%`;
      
      startY = 0;
      endY = maxMove; // 正の値で下方向
    }

    gsap.fromTo(
      this.DOM.image,
      { y: startY },
      {
        y: endY,
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