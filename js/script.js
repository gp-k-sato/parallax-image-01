import { ParallaxImage } from "./modules/ParallaxImage.js";

const parallaxImgs = document.querySelectorAll('.js-parallax-img');
parallaxImgs.forEach(parallaxImg => {
  new ParallaxImage(parallaxImg);
});

// 慣性スクロールとの併用を推奨
// Lenisの初期化 
const lenis = new Lenis();
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);