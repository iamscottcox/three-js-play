import React from 'react';
import propTypes from 'prop-types';
import * as Three from "three";

// libs
import {createAnimateFunction, createRenderFunction, createThreeJSDefaults} from "../libs";
import {activateOrbitControls} from "../libs/orbit-controls";
// textures
import GrassTexture from '../images/grass.jpeg';

export default class OrbitalLight extends React.Component {
  componentDidMount() {
    const { scene, camera, renderer, stats, textureLoader } = createThreeJSDefaults();
    const app = document.getElementById('three-js-orbital-light');
    app.appendChild(renderer.domElement);

    camera.position.z = 15;
    camera.position.y = 5;

    const cubeGeometry = new Three.BoxGeometry(1, 1, 1);
    const cubeMaterial = new Three.MeshStandardMaterial({ color: 0x1144dd });
    const cube = new Three.Mesh(cubeGeometry, cubeMaterial);

    cube.castShadow = true;

    scene.add(cube);
    camera.lookAt(0, 0, 0);

    const lightingRigGeometry = new Three.Object3D();

    const sunGeometry = new Three.SphereGeometry(0.1);
    const sunMaterial = new Three.MeshPhongMaterial({
      color: 'goldenrod',
    });
    const sun = new Three.Mesh(sunGeometry, sunMaterial);
    const pointLight = new Three.PointLight(0xffffff, 5);

    lightingRigGeometry.add(pointLight);
    lightingRigGeometry.add(sun);

    pointLight.position.y += 1;
    pointLight.position.z += 3;
    pointLight.castShadow = true;

    sun.position.y += 1.15;
    sun.position.z += 3.5;

    scene.add(lightingRigGeometry);

    const grassGeometry = new Three.PlaneGeometry(5, 5);
    const grassMaterial = new Three.MeshLambertMaterial({
      color: 'green',
      map: textureLoader.load(GrassTexture),
    });
    const grass = new Three.Mesh(grassGeometry, grassMaterial);

    grass.receiveShadow = true;
    grass.rotateX((-90 * Math.PI) / 180);
    grass.position.y = -1;

    scene.add(grass);

    renderer.shadowMap.enabled = true;
    renderer.shadowMapSize = 1024;

    const renderCallback = () => {
      lightingRigGeometry.rotateY(0.025);
    };
    const render = createRenderFunction(renderer, scene, camera, renderCallback);
    const animate = createAnimateFunction(render);

    animate();
  }

  render() {
    return (
      <div id="three-js-orbital-light"/>
    );
  }
}

OrbitalLight.propTypes = {};