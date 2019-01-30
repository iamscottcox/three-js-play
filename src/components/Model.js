import React from "react";

import * as Three from "three";
import GLTFLoader from "three-gltf-loader";
import OrbitControlsLoader from "three-orbit-controls";
import Artorias from "../GLTF/artorias.glb";

const OrbitControls = OrbitControlsLoader(Three);


export default class Model extends React.Component {
  componentDidMount() {
    // VARIABLES
    const { innerWidth, innerHeight, devicePixelRatio } = window;
    const ratio = innerWidth / innerHeight;
    const fov = 75;
    const innerClipping = 1;
    const outerClipping = 20000;
    // APP
    const app = document.getElementById("three-js-model");
    // Load 3D Scene
    const scene = new Three.Scene();

    // Load Camera Perspective
    const camera = new Three.PerspectiveCamera(
      fov,
      ratio,
      innerClipping,
      outerClipping,
    );
    camera.position.set(1, 1, 20);

    // Load a Renderer
    const renderer = new Three.WebGLRenderer({ alpha: false });
    renderer.setClearColor(0xc5c5c3);
    renderer.setPixelRatio(devicePixelRatio);
    renderer.setSize(innerWidth, innerHeight);
    app.appendChild(renderer.domElement);

    // Load the Orbitcontroller
    new OrbitControls(camera, renderer.domElement);

    // Load Light
    const ambientLight = new Three.AmbientLight('#ccc');
    scene.add(ambientLight);

    const directionalLight = new Three.DirectionalLight('#fff');
    directionalLight.position.set(0, 10, 15).normalize();
    scene.add(directionalLight);

    // glTf 2.0 Loader
    const loader = new GLTFLoader();
    loader.load(Artorias, function(gltf) {
      
      gltf.scene.children.forEach((child) => {
        if (child.material !== undefined) {
          child.material = new Three.MeshStandardMaterial({ color: '#666' });
        }
      });
      
      gltf.scene.scale.set(0.5, 0.5, 0.5);
      gltf.scene.position.x = 0; //Position (x = right+ left-)
      gltf.scene.position.y = -6; //Position (y = up+, down-)
      gltf.scene.position.z = 0; //Position (z = front +, back-)

      scene.add(gltf.scene);
    });

    function animate() {
      render();
      requestAnimationFrame(animate);
    }

    function render() {
      renderer.render(scene, camera);
    }

    render();
    animate();
  }

  render() {
    return <div id="three-js-model" />;
  }
}

Model.propTypes = {};
