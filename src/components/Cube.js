import React from 'react';
import * as Three from 'three';
import {createThreeJSDefaults} from "../libs";

export default class Cube extends React.Component {
  componentDidMount() {
    const { scene, camera, renderer } = createThreeJSDefaults();
    const app = document.getElementById('three-js-cube');
    app.appendChild(renderer.domElement);

    const geometry = new Three.BoxGeometry(1, 1, 1);
    const material = new Three.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new Three.Mesh(geometry, material);

    camera.position.z = 5;
    scene.add(cube);

    const animate = () => {
      this.animationFrame = requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();
  }

  componentWillUnmount() {
    if (this.animationFrame !== undefined) {
      window.cancelAnimationFrame(this.animationFrame);
    }
  }

  render() {
    return (
      <div id="three-js-cube"/>
    );
  }
}
