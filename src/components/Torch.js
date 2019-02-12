import React from 'react';
import propTypes from 'prop-types';
import * as Three from "three";
import Spooky from '../images/spooky.jpg';

import {createAnimateFunction, createRenderFunction, createThreeJSDefaults} from "../libs";
import {activateOrbitControls} from "../libs/orbit-controls";

export default class Torch extends React.Component {
  componentDidMount() {
    const { camera, renderer, scene, textureLoader } = createThreeJSDefaults();
    const app = document.getElementById('three-js-torch');

    app.appendChild(renderer.domElement);

    camera.position.z = 15;

    activateOrbitControls(Three, camera, renderer);

    const spotlight = new Three.SpotLight(0x333333, 100, 25, 0.035);

    const backgroundTexture = textureLoader.load(Spooky);

    const backgroundGeometry = new Three.PlaneGeometry(10, 5);
    const backgroundMaterial = new Three.MeshPhongMaterial({
      color: 0x333333,
      map: backgroundTexture,
      dithering: true,
      shininess: 0,
      bumpMap: backgroundTexture,
    });
    const background = new Three.Mesh(backgroundGeometry, backgroundMaterial);

    const raycaster = new Three.Raycaster();
    const mouse = new Three.Vector2();

    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;
    };

    scene.add(background);
    scene.add(spotlight);
    scene.add(spotlight.target);

    spotlight.position.z = 15;

    const renderCallback = () => {
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(scene.children);
      const [intersect] = intersects;

      if (intersect !== undefined && intersect.point !== undefined) {
        const { point: { x, y, z } } = intersect;
        spotlight.target.position.set(x, y, z);
        spotlight.target.updateMatrixWorld();
      }

    };

    const render = createRenderFunction(renderer, scene, camera, renderCallback);
    const animate = createAnimateFunction(render);

    window.addEventListener('mousemove', onMouseMove, false);

    animate()
  }

  render() {
    return (
      <div id="three-js-torch"/>
    );
  }
}

Torch.propTypes = {}