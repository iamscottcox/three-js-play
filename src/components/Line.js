import React from 'react';
import * as Three from "three";

// libs
import {createThreeJSDefaults} from "../libs";


export default class Line extends React.Component {
  componentDidMount() {
    const { camera, scene, renderer } = createThreeJSDefaults();

    const app = document.getElementById('three-js-line');

    camera.position.z = 100;

    // Three.BufferGeometry is more performant
    const geometry = new Three.Geometry();
    geometry.vertices.push(new Three.Vector3( -10, 0, 0) );
    geometry.vertices.push(new Three.Vector3( 0, 10, 0) );
    geometry.vertices.push(new Three.Vector3( 10, 0, 0) );

    const material = new Three.LineBasicMaterial({ color: 0x0000ff });
    const line = new Three.Line(geometry, material);

    scene.add(line);

    renderer.render(scene, camera);

    app.appendChild(renderer.domElement);
  }

  render() {
    return (
      <div id="three-js-line"></div>
    );
  }
}
