import * as Three from "three";

export const createThreeJSDefaults = () => {
  const { innerWidth, innerHeight, devicePixelRatio } = window;
  const scene = new Three.Scene();
  const renderer = window.WebGLRenderingContext ? new Three.WebGLRenderer() : new Three.CanvasRenderer();
  const camera = new Three.PerspectiveCamera(35, innerWidth / innerHeight, 1, 1000);
  const light = new Three.AmbientLight(0xffffff);

  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(devicePixelRatio);
  renderer.setClearColor(0xc5c5c3);

  scene.add(light);
  scene.add(camera);

  return {
    scene,
    renderer,
    camera,
    light,
  }
};
