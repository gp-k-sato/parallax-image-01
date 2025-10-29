import { ParallaxImage } from "./modules/ParallaxImage.js";

const parallaxImgs = document.querySelectorAll('.js-parallax-img');
parallaxImgs.forEach(parallaxImg => {
  new ParallaxImage(parallaxImg);
});