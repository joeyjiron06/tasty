import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RecipePage from './recipe';
import HomePage from './home';
import Toolbar from '../components/toolbar';

export default () => (
  <Router basename={process.env.PUBLIC_URL}>
    <div>
      <Toolbar />
      <Route exact path="/" component={HomePage} />
      <Route exact path="/recipes" component={RecipePage} />
    </div>
  </Router>
);
