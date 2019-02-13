import React from "react";
import * as Three from "three";

// GLTF
import TyrannosaurusRexGLTF from "../GLTF/tyrannosaurus_rex/tyrannosaurus_rex.glb";
// libs
import {
  createAnimateFunction,
  createRenderFunction,
  createThreeJSDefaults
} from "../libs";
import { activateOrbitControls } from "../libs/orbit-controls";

const createAimSphere = () => {
  const aimSphereGeometry = new Three.SphereGeometry(25);
  const aimSphereMaterial = new Three.MeshPhongMaterial({
    color: 0xbbbbbb,
    side: Three.BackSide,
    dithering: true
  });
  const aimSphere = new Three.Mesh(aimSphereGeometry, aimSphereMaterial);
  aimSphere.name = "aimSphere";
  aimSphere.receiveShadow = true;

  return aimSphere;
};

const createSpotlight = () => {
  const spotlight = new Three.SpotLight(0xff0000, 1.5, 65, 0.075, 1.5);
  spotlight.position.z = 15;
  spotlight.position.y = -0.5;

  spotlight.castShadow = true;
  spotlight.shadow.mapSize.width = 1024;
  spotlight.shadow.mapSize.height = 1024;
  spotlight.shadow.camera.near = 10;
  spotlight.shadow.camera.far = 200;

  return spotlight;
};

const createBox = () => {
  const geometry = new Three.BoxGeometry(1, 1, 1);
  const material = new Three.MeshPhongMaterial({ color: 'blue', dithering: true });
  const mesh = new Three.Mesh(geometry, material);

  mesh.castShadow = true;
  mesh.position.z = -2;

  return mesh;
}

export default class TyrannosaurusRex extends React.Component {
  constructor(props) {
    super(props);

    this.mouseVectorHasChanged = false;
  }

  componentDidMount() {
    const { scene, camera, renderer, gltfLoader } = createThreeJSDefaults();
    // ORBIT CONTROLS
    activateOrbitControls(Three, camera, renderer);
    // CAMERA
    camera.position.z = 15;
    camera.position.y = 0;
    // RENDERER
    renderer.setClearColor(0xffffff);
    renderer.shadowMap.enabled = true;
    renderer.shadowMapSize = 1024;
    renderer.shadowMap.type = Three.PCFSoftShadowMap;
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    // APP
    const app = document.getElementById("three-js-tyrannosaurus-rex");
    app.appendChild(renderer.domElement);

    // AIM SPHERE
    const aimSphere = createAimSphere();

    const box = createBox();

    // RAYCASTER
    const flashlightRaycaster = new Three.Raycaster();

    // SPOTLIGHT
    const spotlight = createSpotlight();
    // MOUSE VECTOR
    const mouseVector = new Three.Vector2();

    // // MODEL LOADING
    gltfLoader.load(TyrannosaurusRexGLTF, gltf => {
      gltf.scene.traverse((node) => {
        if (node instanceof Three.Mesh) {
          node.castShadow = true;
          node.receiveShadow = true;
        }
      });
      gltf.scene.scale.set(0.5, 0.5, 0.5);
      gltf.scene.position.x = 0; //Position (x = right+ left-)
      gltf.scene.position.y = -3; //Position (y = up+, down-)
      gltf.scene.position.z = 0; //Position (z = front +, back-)

      requestAnimationFrame(() => {
        scene.add(gltf.scene);
        scene.remove(box);
      });
    });

    scene.add(aimSphere);
    scene.add(spotlight);
    scene.add(spotlight.target);
    scene.add(box);

    // EVENT LISTENER CALLBACKS
    const onMouseMove = e => {
      mouseVector.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseVector.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    // EVENT LISTENERS
    this.mouseMoveEventListener = window.addEventListener(
      "mousemove",
      onMouseMove
    );

    // ANIMATION LOOP
    const renderCallback = () => {
      flashlightRaycaster.setFromCamera(mouseVector, camera);

      if (this.previousMouseVectorX !== mouseVector.x) {
        this.previousMouseVectorX = mouseVector.x;
        this.mouseVectorHasChanged = true;
      }

      if (this.previousMouseVectorY !== mouseVector.y) {
        this.previousMouseVectorY = mouseVector.y;
        this.mouseVectorHasChanged = true;
      }

      if (
        this.mouseVectorHasChanged === true
      ) {
        const intersects = flashlightRaycaster.intersectObjects(scene.children);
        const aimSphereIntersect = intersects.find(intersect => {
          if (intersect !== undefined && intersect.object !== undefined) {
            return intersect.object.name === "aimSphere";
          } else {
            return false;
          }
        });

        if (
          aimSphereIntersect !== undefined &&
          aimSphereIntersect.point !== undefined
        ) {
          spotlight.target.position.copy(aimSphereIntersect.point);
          spotlight.target.updateMatrixWorld();
        }

        this.mouseVectorHasChanged = false;
      }
    };

    const render = createRenderFunction(
      renderer,
      scene,
      camera,
      renderCallback
    );
    const animate = createAnimateFunction(render);

    animate();
  }

  componentWillUnmount() {
    window.removeEventListener("mousemove", this.mouseMoveEventListener);
  }

  render() {
    return <div id="three-js-tyrannosaurus-rex" />;
  }
}
