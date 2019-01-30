import React from 'react';
import * as Three from 'three';

export default class Cube extends React.Component {
  componentDidMount() {
    const { innerWidth, innerHeight } = window;
    const app = document.getElementById('three-js-cube');
    const fov = 75;
    const ratio = innerWidth / innerHeight;
    // Change these two values can reap a performance gain
    const nearClippingPlane = 0.1;
    const farClippingPlane = 1000;

    const scene = new Three.Scene();
    const camera = new Three.PerspectiveCamera(fov, ratio, nearClippingPlane, farClippingPlane);
    const renderer = new Three.WebGLRenderer();

    renderer.setSize( window.innerWidth, window.innerHeight );
    app.appendChild(renderer.domElement);

    const geometry = new Three.BoxGeometry(1, 1, 1);
    const material = new Three.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new Three.Mesh(geometry, material);

    scene.add(cube);

    camera.position.z = 5;

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
