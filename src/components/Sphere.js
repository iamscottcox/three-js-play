import React from 'react';
import propTypes from 'prop-types';
import Stats from 'stats.js';
import * as Three from "three";

// libs
import {createThreeJSDefaults} from "../libs";
import {activateOrbitControls} from "../libs/orbit-controls";

export default class Sphere extends React.Component {
  componentDidMount() {
    const { scene, renderer, camera, ambientLight, stats } = createThreeJSDefaults();

    const app = document.getElementById('three-js-sphere');
    app.appendChild(renderer.domElement);

    activateOrbitControls(Three, camera, renderer);

    camera.position.z = 100;

    const geometry = new Three.SphereGeometry(15, 100, 100);
    const material = new Three.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
    const sphere = new Three.Mesh(geometry, material);
    
    sphere.name = 'sphere';

    scene.add(ambientLight);
    scene.add(sphere);

    // stats.setMode(0);
    document.body.appendChild(stats.domElement);

    const render = () => {
      renderer.render(scene, camera);
      stats.update();
    };

    const animate = () => {
      render();
      this.animationFrame = requestAnimationFrame(animate);
    };

    animate();
  }

  render() {
    return (
      <div id="three-js-sphere"/>
    );
  }
}

Sphere.propTypes = {}