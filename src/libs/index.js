import * as Three from "three";
import Stats from "stats.js";

export const createThreeJSDefaults = () => {
  const { innerWidth, innerHeight, devicePixelRatio } = window;
  const scene = new Three.Scene();
  const renderer = window.WebGLRenderingContext ? new Three.WebGLRenderer() : new Three.CanvasRenderer();
  const camera = new Three.PerspectiveCamera(35, innerWidth / innerHeight, 1, 1000);
  const ambientLight = new Three.AmbientLight(0xffffff);
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
  }
};
