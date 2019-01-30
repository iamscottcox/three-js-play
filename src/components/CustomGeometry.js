import React from 'react';
import propTypes from 'prop-types';
import * as Three from "three";

// libs
import {createAnimateFunction, createRenderFunction, createThreeJSDefaults} from "../libs";
import {activateOrbitControls} from "../libs/orbit-controls";

export default class CustomGeometry extends React.Component {
  componentDidMount() {
    const { camera, renderer, ambientLight, scene } = createThreeJSDefaults();

    const app = document.getElementById('three-js-custom-geometry');
    app.appendChild(renderer.domElement);

    activateOrbitControls(Three, camera, renderer);

    camera.position.z = 5;

    scene.add(ambientLight);

    const render = createRenderFunction(renderer, scene, camera);
    const animate = createAnimateFunction(render);

    const triangleGeometry = new Three.Geometry();
    triangleGeometry.vertices.push(new Three.Vector3(0.0, 1.0, 0.0));
    triangleGeometry.vertices.push(new Three.Vector3(-1.0, -1.0, 0.0));
    triangleGeometry.vertices.push(new Three.Vector3(1.0, -1.0, 0.0));
    triangleGeometry.faces.push(new Three.Face3(0, 1, 2));

    triangleGeometry.faces[0].vertexColors[0] = new Three.Color(0xff0000);
    triangleGeometry.faces[0].vertexColors[1] = new Three.Color(0x00ff00);
    triangleGeometry.faces[0].vertexColors[2] = new Three.Color(0xff0000);

    const material = new Three.MeshBasicMaterial(({
      vertexColors: Three.VertexColors,
      side: Three.DoubleSide,
    }));

    const triangle = new Three.Mesh(triangleGeometry, material);

    scene.add(triangle);
    
    animate();
  }

  render() {
    return (
      <div id="three-js-custom-geometry"/>
    );
  }
}

CustomGeometry.propTypes = {}