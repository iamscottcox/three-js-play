import React from 'react';
import propTypes from 'prop-types';
import * as Three from "three";

import {createAnimateFunction, createRenderFunction, createThreeJSDefaults} from "../libs";
import {activateOrbitControls} from "../libs/orbit-controls";

export default class Extrusion extends React.Component {
  componentDidMount() {
    const { camera, scene, renderer, ambientLight } = createThreeJSDefaults();
    const app = document.getElementById('three-js-wave');
    app.appendChild(renderer.domElement);

    activateOrbitControls(Three, camera, renderer);

    const material = new Three.MeshBasicMaterial({ wireframe: true });
    const shapePoints = [];

    shapePoints.push(new Three.Vector3(0.0, 1.0, 0.0));
    shapePoints.push(new Three.Vector3(-1.0, -1.0, 0.0));
    shapePoints.push(new Three.Vector3(1.0, -1.0, 0.0));

    camera.position.x = 20;
    camera.position.z = 100;

    const shapeSettings = new Three.Shape(shapePoints);

    const extrusionSettings = {
      steps: 15,
      depth: 10,
      bevelEnabled: false,
    };

    const shapeGeometry = new Three.ExtrudeGeometry(shapeSettings, extrusionSettings);

    const triangle = new Three.Mesh(shapeGeometry, material);

    scene.add(triangle);
    scene.add(ambientLight);

    const render = createRenderFunction(renderer, scene, camera);
    const animate = createAnimateFunction(render);

    animate();
  }

  render() {
    return (
      <div id="three-js-wave"/>
    );
  }
}

Extrusion.propTypes = {};