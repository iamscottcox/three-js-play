import * as Three from "three";
import Stats from "stats.js";
import GLTFLoader from "three-gltf-loader";

export const createThreeJSDefaults = () => {
  const { innerWidth, innerHeight, devicePixelRatio } = window;
  const scene = new Three.Scene();
  const renderer = window.WebGLRenderingContext ? new Three.WebGLRenderer() : new Three.CanvasRenderer();
  const camera = new Three.PerspectiveCamera(35, innerWidth / innerHeight, 1, 1000);
  const ambientLight = new Three.AmbientLight(0xffffff);
  const textureLoader = new Three.TextureLoader();
  const gltfLoader = new GLTFLoader();
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
    gltfLoader,
  }
};

export const createRenderFunction = (renderer, scene, camera, callback = () => {}) => () => {
  callback();
  renderer.render(scene, camera);
};

export const createAnimateFunction = (render) => {
  const animate = () => {
    render();
    return requestAnimationFrame(animate);
  };

  return animate;
};
