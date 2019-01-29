import * as THREE from 'three';

const loader = new THREE.GLTFLoader();;

console.log('loader', loader);

export default class Model extends React.Component {
  render() {
    return (
      <div id="three-js-model"/>
    );
  }
}

Model.propTypes = {}