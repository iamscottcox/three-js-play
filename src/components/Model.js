import React from "react";

import * as Three from "three";
import GLTFLoader from "three-gltf-loader";

// GLTFs
import Artorias from "../GLTF/artorias/artorias.glb";
// libs
import { createThreeJSDefaults } from "../libs";
import { activateOrbitControls } from "../libs/orbit-controls";

export default class Model extends React.Component {
  componentDidMount() {
    // VARIABLES
    const { scene, camera, renderer, ambientLight } = createThreeJSDefaults();
    // APP
    const app = document.getElementById("three-js-model");
    app.appendChild(renderer.domElement);

    camera.position.set(1, 1, 35);

    // Load the Orbitcontroller
    activateOrbitControls(Three, camera, renderer.domElement);

    const directionalLight = new Three.PointLight(0xffffff, 1, 100);
    directionalLight.position.set(0, 25, 10);
    directionalLight.castShadow = true;

    // ambientLight.castShadow = true;

    scene.add(directionalLight);
    scene.add(ambientLight);

    renderer.shadowMap.enabled = true;
    renderer.shadowMapSize = 4096;

    // glTf 2.0 Loader
    const loader = new GLTFLoader();
    loader.load(Artorias, function(gltf) {
      gltf.scene.children.forEach(child => {
        if (child.material !== undefined) {
          child.material = new Three.MeshStandardMaterial({ color: "#666" });
        }
      });

      gltf.scene.scale.set(0.5, 0.5, 0.5);
      gltf.scene.position.x = 0; //Position (x = right+ left-)
      gltf.scene.position.y = -4; //Position (y = up+, down-)
      gltf.scene.position.z = 0; //Position (z = front +, back-)

      scene.add(gltf.scene);
    });

    const render = () => {
      renderer.render(scene, camera);
    };

    const animate = () => {
      render();
      this.animationFrame = requestAnimationFrame(animate);
    };

    animate();
  }

  componentWillUnmount() {
    if (this.animationFrame !== undefined) {
      window.cancelAnimationFrame(this.animationFrame);
    }
  }

  render() {
    return <div id="three-js-model" />;
  }
}

Model.propTypes = {};
