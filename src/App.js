import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

import Cube from "./components/Cube";
import RedCube from "./components/RedCube";
import Line from "./components/Line";
import Model from "./components/Model";
import Circle from "./components/Circle";
import Sphere from "./components/Sphere";
import CustomGeometry from "./components/CustomGeometry";
import Extrusion from "./components/Extrusion";
import OrbitalLight from './components/OrbitalLight';
import Torch from "./components/Torch";
import TyrannosaurusRex from './components/TyrannosaurusRex'
import Hover from './components/Hover'
import ParticleSystem from './components/ParticleSystem';

const Index = () => (
  <div>Choose an example from the nav menu</div>
);

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <header>
            <nav>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/cube">Cube</Link></li>
                <li><Link to="/red-cube">Red Cube</Link></li>
                <li><Link to="/line">Line</Link></li>
                <li><Link to="/model">Model</Link></li>
                <li><Link to="/circle">Circle</Link></li>
                <li><Link to="/sphere">Sphere</Link></li>
                <li><Link to="/custom-geometry">Custom Geometry</Link></li>
                <li><Link to="/extrusion">Extrusion</Link></li>
                <li><Link to="/orbital-light">Orbital Light</Link></li>
                <li><Link to="/torch">Torch</Link></li>
                <li><Link to="/tyrannosaurus-rex">Tyrannosaurus Rex</Link></li>
                <li><Link to="/hover">Hover</Link></li>
                <li><Link to="/particle-system">Particle System</Link></li>
              </ul>
            </nav>
          </header>
          <main id="main">
            <Route path="/" exact component={Index} />
            <Route path="/cube" component={Cube} />
            <Route path="/red-cube" component={RedCube} />
            <Route path="/line" component={Line} />
            <Route path="/model" component={Model} />
            <Route path="/circle" component={Circle} />
            <Route path="/sphere" component={Sphere} />
            <Route path="/custom-geometry" component={CustomGeometry} />
            <Route path="/extrusion" component={Extrusion} />
            <Route path="/orbital-light" component={OrbitalLight} />
            <Route path="/torch" component={Torch} />
            <Route path="/tyrannosaurus-rex" component={TyrannosaurusRex} />
            <Route path="/hover" component={Hover} />
            <Route path="/particle-system" component={ParticleSystem} />
          </main>
        </div>
      </Router>
    )
  }
}

export default App;
