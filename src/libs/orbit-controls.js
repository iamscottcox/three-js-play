import OrbitControlsLoader from "three-orbit-controls";

export const createOrbitControls = (Three) => OrbitControlsLoader(Three);
export const activateOrbitControls = (Three, camera, renderer) => {
  const OrbitControls = createOrbitControls(Three);
  new OrbitControls(camera, renderer.domElement);
};