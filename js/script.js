import { ParallaxImage } from "./modules/ParallaxImage.js";

const parallaxImages = document.querySelectorAll('.js-parallax-image');
parallaxImages.forEach(parallaxImage => {
  new ParallaxImage(parallaxImage);
});