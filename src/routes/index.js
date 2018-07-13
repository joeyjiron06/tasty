import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RecipePage from './recipe';

export default () => (
  <Router basename={process.env.PUBLIC_URL}>
    <Switch>
      <Route exact path="/" component={RecipePage} />
    </Switch>
  </Router>
);
