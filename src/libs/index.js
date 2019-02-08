import * as Three from "three";
import Stats from "stats.js";

export const createThreeJSDefaults = () => {
  const { innerWidth, innerHeight, devicePixelRatio } = window;
  const scene = new Three.Scene();
  const renderer = window.WebGLRenderingContext ? new Three.WebGLRenderer() : new Three.CanvasRenderer();
  const camera = new Three.PerspectiveCamera(35, innerWidth / innerHeight, 1, 1000);
  const ambientLight = new Three.AmbientLight(0xffffff);
  const textureLoader = new Three.TextureLoader();
  const stats = new Stats();

  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(devicePixelRatio);
  renderer.setClearColor(0xc5c5c3);

  return {
    scene,
    renderer,
    camera,
    ambientLight,
    stats,
    textureLoader,
  }
};

export const createRenderFunction = (renderer, scene, camera, callback = () => {}) => () => {
  renderer.render(scene, camera);
  callback();
};

export const createAnimateFunction = (render) => {
  const animate = () => {
    render();
    return requestAnimationFrame(animate);
  };

  return animate;
};
