import React from 'react';
import * as Three from "three";
import {createAnimateFunction, createRenderFunction, createThreeJSDefaults} from "../libs";

export default class Hover extends React.Component {
  constructor(props) {
    super(props);

    this.hoveredSphere = null;
  }

  componentDidMount() {
    const { scene, camera, renderer, ambientLight } = createThreeJSDefaults();
    const app = document.getElementById('three-js-hover');
    app.appendChild(renderer.domElement);

    camera.position.z = 25;
    camera.position.y = 0;

    scene.add(camera);
    scene.add(ambientLight);

    const red = new Three.Color(255, 0, 0);
    const blue = new Three.Color(0, 0, 255);

    const sphereGeometry = new Three.SphereGeometry(1, 15, 15);
    const sphereMaterial = new Three.MeshStandardMaterial({ color: blue });
    const sphere = new Three.Mesh(sphereGeometry, sphereMaterial);

    const sphere2 = sphere.clone();
    const sphere3 = sphere.clone();
    const sphere4 = sphere.clone();
    const sphere5 = sphere.clone();

    sphere2.material = sphereMaterial.clone();
    sphere3.material = sphereMaterial.clone();
    sphere4.material = sphereMaterial.clone();
    sphere5.material = sphereMaterial.clone();

    const targetGeometry = new Three.SphereGeometry(2, 100);
    const targetMaterial = new Three.MeshStandardMaterial({ color: blue, transparent: true, opacity: 0 });

    const target = new Three.Mesh(targetGeometry, targetMaterial);
    const target2 = target.clone();
    const target3 = target.clone();
    const target4 = target.clone();
    const target5 = target.clone();

    target2.position.set(-3, 0, 0);
    target3.position.set(3, 0, 0);
    target4.position.set(0, 3, 0);
    target5.position.set(0, -3, 0);

    const raycaster = new Three.Raycaster();

    const mouseVector = new Three.Vector2();

    const onMouseMove = e => {
      mouseVector.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseVector.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    target.add(sphere);
    target2.add(sphere2);
    target3.add(sphere3);
    target4.add(sphere4);
    target5.add(sphere5);

    scene.add(target);
    scene.add(target2);
    scene.add(target3);
    scene.add(target4);
    scene.add(target5);

    const renderCallback = () => {
      raycaster.setFromCamera(mouseVector, camera);
      const intersects = raycaster.intersectObjects(scene.children);

      if (intersects.length > 0) {
        const [closestIntersect] = intersects;
        const [child] = closestIntersect.object.children;

        if (this.hoveredSphere !== null && child.uuid !== this.hoveredSphere.uuid) {
          this.hoveredSphere.material.color = blue;
        }
        
        child.material.color = red;
        this.hoveredSphere = child;

      } else if (this.hoveredSphere !== null) {
        this.hoveredSphere.material.color = blue;
        this.hoveredSphere = null;
      }
    };

    const render = createRenderFunction(renderer, scene, camera, renderCallback);
    const animate = createAnimateFunction(render);

    animate();

    this.mouseEventListener = window.addEventListener('mousemove', onMouseMove);
  }

  render() {
    return (
      <div id="three-js-hover"/>
    );
  }
}
