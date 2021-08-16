import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from "./screens/home/index";
import Project from "./screens/project/index";
import Config from "./screens/config/index";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/"  component={Home}/>
        <Route exact path="/project/:id" component={Project} />
        <Route exact path="/config/:id" component={Config} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
