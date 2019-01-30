import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

import Cube from "./components/Cube";
import RedCube from "./components/RedCube";
import Line from "./components/Line";
import Model from "./components/Model";

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
              </ul>
            </nav>
          </header>
          <main id="main">
            <Route path="/" exact component={Index} />
            <Route path="/cube" component={Cube} />
            <Route path="/red-cube" component={RedCube} />
            <Route path="/line" component={Line} />
            <Route path="/model" component={Model} />
          </main>
        </div>
      </Router>
    )
  }
}

export default App;
