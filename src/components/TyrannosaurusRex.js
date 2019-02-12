import React from 'react';
import * as Three from "three";

// GLTF
import TyrannosaurusRexGLTF from "../GLTF/tyrannosaurus_rex/tyrannosaurus_rex.glb";
// libs
import {createAnimateFunction, createRenderFunction, createThreeJSDefaults} from "../libs";
import {activateOrbitControls} from "../libs/orbit-controls";

export default class TyrannosaurusRex extends React.Component {
  componentDidMount() {
    const { scene, camera, renderer, gltfLoader, ambientLight } = createThreeJSDefaults();
    // SCENE
    scene.add(ambientLight);
    // CAMERA
    camera.position.z = 15;
    // RENDERER
    renderer.setClearColor(0xffffff);
    // APP
    const app = document.getElementById('three-js-tyrannosaurus-rex');
    app.appendChild(renderer.domElement);
    // ORBIT CONTROLS
    activateOrbitControls(Three, camera, renderer);

    // AIM SPHERE
    const aimSphereGeometry = new Three.SphereGeometry(50);
    const aimSphereMaterial = new Three.MeshBasicMaterial({
      color: 0x000000,
      side: Three.BackSide,
      receiveShadow: true,
    });
    const aimSphere = new Three.Mesh(aimSphereGeometry, aimSphereMaterial);
    aimSphere.name = 'aimSphere';
    scene.add(aimSphere);

    // RAYCASTER
    const flashlightRaycaster = new Three.Raycaster();

    // SPOTLIGHT
    const spotlight = new Three.SpotLight(0xffffff, 1, 500, 0.05);
    console.log('spotlight.position', spotlight.position);
    spotlight.position.z = 15;
    spotlight.position.y = -0.045;
    const spotlightHelper = new Three.SpotLightHelper(spotlight, 0xffffff);


    scene.add(spotlight);
    scene.add(spotlight.target);
    scene.add(spotlightHelper);

    // MOUSE VECTOR
    const mouseVector = new Three.Vector2();

    // MODEL LOADING
    gltfLoader.load(TyrannosaurusRexGLTF, (gltf) => {
      gltf.scene.scale.set(0.5, 0.5, 0.5);
      gltf.scene.position.x = 0; //Position (x = right+ left-)
      gltf.scene.position.y = -3; //Position (y = up+, down-)
      gltf.scene.position.z = 0; //Position (z = front +, back-)

      requestAnimationFrame(() => {
        scene.add(gltf.scene)
      });
      console.log('Tyrannosaurus Rex has loaded');
    });

    // EVENT LISTENER CALLBACKS
    const onMouseMove = (e) => {
      mouseVector.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseVector.y = - (e.clientY / window.innerHeight) * 2 + 1;
    };

    // EVENT LISTENERS
    window.addEventListener('mousemove', onMouseMove);

    // ANIMATION LOOP
    const renderCallback = () => {
      flashlightRaycaster.setFromCamera(mouseVector, camera);

      const intersects = flashlightRaycaster.intersectObjects(scene.children, true);
      const aimSphereIntersect = intersects.find((intersect) => {
        if (intersect !== undefined && intersect.object !== undefined) {
          return intersect.object.name === 'aimSphere';
        } else {
          return false;
        }
      })

      if (aimSphereIntersect !== undefined && aimSphereIntersect.point !== undefined) {
          spotlight.target.position.copy(aimSphereIntersect.point);
          spotlight.target.updateMatrixWorld();
          spotlightHelper.update();
      }

    };

    const render = createRenderFunction(renderer, scene, camera, renderCallback);
    const animate = createAnimateFunction(render);

    animate()
  }

  render() {
    return (
      <div id="three-js-tyrannosaurus-rex"/>
    );
  }
}

