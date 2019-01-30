import React from "react";
import propTypes from "prop-types";
import * as Three from "three";

// libs
import {createThreeJSDefaults} from "../libs";

export default class RedCube extends React.Component {
  componentDidMount() {
    const { scene, renderer, camera, ambientLight } = createThreeJSDefaults();

    camera.position.z = 100;
    // APP
    const app = document.getElementById("three-js-red-cube");
    app.appendChild(renderer.domElement);
    // ACTORS
    const geometry = new Three.BoxGeometry(20, 20, 20);
    const material = new Three.MeshStandardMaterial({ color: 0xff0000 });
    const box = new Three.Mesh(geometry, material);
    box.name = "box";

    scene.add(box);
    scene.add(ambientLight);
    
    const render = () => {
      camera.rotation.z += 0.01;

      renderer.render(scene, camera);
      requestAnimationFrame(render);
    };

    render();
  }

  render() {
    return <div id="three-js-red-cube" />;
  }
}

RedCube.propTypes = {};
