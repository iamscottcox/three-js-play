import React from "react";
import {v4} from "uuid";
import * as Three from "three";

// libs
import {
  createAnimateFunction,
  createRenderFunction,
  createThreeJSDefaults
} from "../libs";
// sprites
import Spark from "../textures/sprites/spark1.png";

const vertexShader = `
attribute float size;
			varying vec3 vColor;
			void main() {
				vColor = color;
				vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
				gl_PointSize = size * ( 300.0 / -mvPosition.z );
				gl_Position = projectionMatrix * mvPosition;
			}
`;

const fragmentShader = `
uniform sampler2D texture;
			varying vec3 vColor;
			void main() {
				gl_FragColor = vec4( vColor, 1.0 );
				gl_FragColor = gl_FragColor * texture2D( texture, gl_PointCoord );
			}
`;

export default class ParticleSystem extends React.Component {
  componentDidMount() {
    const { scene, camera, renderer } = createThreeJSDefaults();

    const app = document.getElementById("Three-js-particle-system");
    app.appendChild(renderer.domElement);

    renderer.setClearColor(0x000000);

    const particles = 10000;
    const radius = 200;

    camera.position.z = 300;
    const uniforms = {
      texture: {
        value: new Three.TextureLoader().load(Spark)
      }
    };
    const shaderMaterial = new Three.ShaderMaterial({
      uniforms: uniforms,
      vertexShader,
      fragmentShader,
      blending: Three.AdditiveBlending,
      depthTest: false,
      transparent: true,
      vertexColors: true
    });
    const geometry = new Three.BufferGeometry();
    const positions = [];
    const colors = [];
    const sizes = [];
    const IDs = [];
    const color = new Three.Color();
    for (let i = 0; i < particles; i += 1) {
      positions.push((Math.random() * 2 - 1) * radius);
      positions.push((Math.random() * 2 - 1) * radius);
      positions.push((Math.random() * 2 - 1) * radius);
      IDs.push(v4());
      color.setHSL(i / particles, 1.0, 0.5);
      colors.push(color.r, color.g, color.b);
      sizes.push(20);
    }

    geometry.addAttribute(
      "position",
      new Three.Float32BufferAttribute(positions, 3)
    );
    geometry.addAttribute("color", new Three.Float32BufferAttribute(colors, 3));
    geometry.addAttribute(
      "size",
      new Three.Float32BufferAttribute(sizes, 1).setDynamic(true)
    );
    geometry.addAttribute("id", new Three.Float32BufferAttribute(IDs, 1));

    const particleSystem = new Three.Points(geometry, shaderMaterial);
    scene.add(particleSystem);
    
    console.log('particleSystem', particleSystem)

    console.log("particleSystem", particleSystem);

    const renderCallback = () => {
      const time = Date.now() * 0.005;
      particleSystem.rotation.z = 0.01 * time;
      const sizes = geometry.attributes.size.array;
      for ( let i = 0; i < particles; i ++ ) {
        sizes[ i ] = 5 * ( 1 + Math.sin( 0.1 * i + time ) );
      }
      geometry.attributes.size.needsUpdate = true;
    };
    const render = createRenderFunction(renderer, scene, camera, renderCallback);
    const animate = createAnimateFunction(render);

    animate();
  }

  render() {
    return <div id="Three-js-particle-system" />;
  }
}
