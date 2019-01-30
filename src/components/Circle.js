import React from "react";
import propTypes from "prop-types";
import * as Three from "three";

// libs
import { createThreeJSDefaults } from "../libs";
import { activateOrbitControls } from "../libs/orbit-controls";

export default class Circle extends React.Component {
  componentDidMount() {
    const { camera, renderer, scene, ambientLight } = createThreeJSDefaults();

    const app = document.getElementById("three-js-circle");
    app.appendChild(renderer.domElement);

    activateOrbitControls(Three, camera, renderer);

    const geometry = new Three.CircleGeometry(5, 64);
    const material = new Three.MeshBasicMaterial({ color: 0xffff00 });
    const circle = new Three.Mesh(geometry, material);

    camera.position.z = 40;

    scene.add(ambientLight);
    scene.add(camera);
    scene.add(circle);

    const render = () => {
      renderer.render(scene, camera);
    };

    const animate = () => {
      render();
      this.animationFrame = requestAnimationFrame(animate);
    };

    animate();
  }

  render() {
    return <div id="three-js-circle" />;
  }
}

Circle.propTypes = {};
