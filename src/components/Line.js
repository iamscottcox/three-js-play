import React from 'react';
import * as Three from "three";


export default class Line extends React.Component {
  componentDidMount() {
    const { innerWidth, innerHeight } = window;
    const ratio = innerWidth / innerHeight;
    const fov = 45;
    const innerClipping = 1;
    const outerClipping = 500;

    const app = document.getElementById('three-js-line');

    const camera = new Three.PerspectiveCamera(fov, ratio, innerClipping, outerClipping);
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);

    // Three.BufferGeometry is more performant
    const geometry = new Three.Geometry();
    geometry.vertices.push(new Three.Vector3( -10, 0, 0) );
    geometry.vertices.push(new Three.Vector3( 0, 10, 0) );
    geometry.vertices.push(new Three.Vector3( 10, 0, 0) );

    const material = new Three.LineBasicMaterial({ color: 0x0000ff });

    const line = new Three.Line(geometry, material);

    const scene = new Three.Scene();
    scene.add(line);

    const renderer = new Three.WebGLRenderer();
    renderer.setSize(innerWidth, innerHeight);
    renderer.render(scene, camera);

    app.appendChild(renderer.domElement);
  }

  render() {
    return (
      <div id="three-js-line"></div>
    );
  }
}
