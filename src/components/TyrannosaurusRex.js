import React from 'react';
import * as Three from "three";

// GLTF
import TyrannosaurusRexGLTF from "../GLTF/tyrannosaurus_rex/tyrannosaurus_rex.glb";

// libs
import {createAnimateFunction, createRenderFunction, createThreeJSDefaults} from "../libs";

export default class TyrannosaurusRex extends React.Component {
  componentDidMount() {
    const { scene, camera, renderer, gltfLoader } = createThreeJSDefaults();
    const app = document.getElementById('three-js-tyrannosaurus-rex');
    app.appendChild(renderer.domElement);

    renderer.setClearColor(0x000000);

    gltfLoader.load(TyrannosaurusRexGLTF, (gltf) => {
      console.log('Tyrannosaurus Rex loaded');
    });

    const render = createRenderFunction(renderer, scene, camera);
    const animate = createAnimateFunction(render);

    animate()
  }

  render() {
    return (
      <div id="three-js-tyrannosaurus-rex"/>
    );
  }
}

