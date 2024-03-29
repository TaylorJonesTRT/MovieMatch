/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import App from './App';
import MyStuff from './components/MyStuff';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/my-stuff" component={MyStuff} />
    </Switch>
  </Router>
);

export default Routes;
