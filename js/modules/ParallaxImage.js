// import gsap from 'gsap';
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// gsap.registerPlugin(ScrollTrigger);

export class ParallaxImage {
  constructor(element) {
    this.DOM = {};
    this.DOM.element = element;
    this.DOM.image = this.DOM.element.children[0];

    // this.speed = parseFloat(this.DOM.element.dataset.parallaxSpeed) || 1.2;
    const speedValue = this.DOM.element.dataset.parallaxSpeed;
    this.speed = speedValue !== undefined && speedValue !== null && speedValue !== ''
      ? parseFloat(speedValue)
      : 1.2;


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
    
    let startY, endY, heightPercentage;

    if (this.speed >= 1.0) {
      // 1.0以上：通常のパララックス
      this.DOM.image.classList.add('is-normal-parallax');
      heightPercentage = this.speed * 100;
      this.DOM.image.style.height = `${heightPercentage}%`;
      
      const imageHeight = this.DOM.image.offsetHeight;
      const moveY = imageHeight - wrapperHeight;
      
      if (moveY <= 0) return;
      
      startY = 0;
      endY = -moveY;
      
    } else {
      // 1.0未満：逆パララックス
      this.DOM.image.classList.add('is-reverse-parallax');
      
      const mirrorSpeed = 2.0 - this.speed;
      
      const heightPercentage = mirrorSpeed * 100;
      this.DOM.image.style.height = `${heightPercentage}%`;
      
      const imageHeight = this.DOM.image.offsetHeight;
      const maxMove = imageHeight - wrapperHeight;
      
      if (maxMove <= 0) return;
      
      startY = 0;
      endY = maxMove;
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