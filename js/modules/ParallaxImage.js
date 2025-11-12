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
    this.prevHeight = window.innerHeight;

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

  // User Agent モバイル判定
  _isMobileUserAgent() {
    return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  // モバイル判定
  _isMobileDevice() {
    return window.innerWidth <= 767 || this._isMobileUserAgent();
  }

  // モバイル・タブレット判定
  _isMobileOrTablet() {
    return window.innerWidth <= 1024 || this._isMobileUserAgent();
  }

  _setParallax() {
    const wrapperHeight = this.DOM.element.offsetHeight;
    
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
      const imageHeight = this.DOM.image.offsetHeight;
      const moveY = imageHeight - wrapperHeight;
      
      if (moveY <= 0) return;
      
      startY = 0;
      endY = -moveY;
    }

    const isMobile = this._isMobileDevice();

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
    
    if (this.prevWidth === currentWidth) {
      if (this._isMobileOrTablet()) {
        return;
      }
    }
    
    const currentHeight = window.innerHeight;
    const isMobileOrTablet = this._isMobileOrTablet();
    
    let shouldResize = false;
    
    if (isMobileOrTablet) {
      // SP・タブレット：横幅の変更のみに対応
      if (this.prevWidth !== currentWidth) {
        shouldResize = true;
      }
    } else {
      // PC：横幅・縦幅両方の変更に対応
      if (this.prevWidth !== currentWidth || this.prevHeight !== currentHeight) {
        shouldResize = true;
      }
    }
    
    if (shouldResize) {
      this.prevWidth = currentWidth;
      this.prevHeight = currentHeight;
      
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