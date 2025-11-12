// import gsap from 'gsap';
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// gsap.registerPlugin(ScrollTrigger);

export class ParallaxImage {
  constructor(element) {
    this.DOM = {};
    this.DOM.element = element;
    this.DOM.image = this.DOM.element.children[0];

    // 速度設定
    const speedValue = this.DOM.element.dataset.parallaxSpeed;
    this.speed = speedValue !== undefined && speedValue !== null && speedValue !== ''
      ? parseFloat(speedValue)
      : 1.2;

    // 視差効果の方向と大きさを事前計算
    if (this.speed >= 1.0) {
      this.heightPercentage = this.speed * 100;
      this.isReverse = false;
    } else {
      this.mirrorSpeed = 2.0 - this.speed;
      this.heightPercentage = this.mirrorSpeed * 100;
      this.isReverse = true;
    }

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

    this.DOM.image.classList.remove('is-reverse-parallax', 'is-normal-parallax');
    
    let startY, endY;

    this.DOM.image.style.height = `${this.heightPercentage}%`;

    if (this.isReverse) {
      // 1.0未満：逆パララックス
      this.DOM.image.classList.add('is-reverse-parallax');
      
      const imageHeight = this.DOM.image.offsetHeight;
      const moveY = imageHeight - wrapperHeight;
      
      if (moveY <= 0) return;
      
      startY = 0;
      endY = moveY;
      
    } else {
      // 1.0以上：通常のパララックス
      this.DOM.image.classList.add('is-normal-parallax');
      
      const imageHeight = this.DOM.image.offsetHeight;
      const moveY = imageHeight - wrapperHeight;
      
      if (moveY <= 0) return;
      
      startY = 0;
      endY = -moveY;
    }

    const isMobile = window.innerWidth <= 767 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

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
          scrub: isMobile ? 0.3 : true,
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