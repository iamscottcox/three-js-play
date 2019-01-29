import React from 'react';
import * as THREE from "three";


export default class Line extends React.Component {
  componentDidMount() {
    const { innerWidth, innerHeight } = window;
    const ratio = innerWidth / innerHeight;
    const fov = 45;
    const innerClipping = 1;
    const outerClipping = 500;

    const app = document.getElementById('three-js-line');

    const camera = new THREE.PerspectiveCamera(fov, ratio, innerClipping, outerClipping);
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);

    // THREE.BufferGeometry is more performant
    const geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3( -10, 0, 0) );
    geometry.vertices.push(new THREE.Vector3( 0, 10, 0) );
    geometry.vertices.push(new THREE.Vector3( 10, 0, 0) );

    const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

    const line = new THREE.Line(geometry, material);

    const scene = new THREE.Scene();
    scene.add(line);

    const renderer = new THREE.WebGLRenderer();
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
