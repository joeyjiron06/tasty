import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import RecipePage from './recipe';
import HomePage from './home';
import AdminPage from './admin';
import BrowsePage from './browse';
import Toolbar from '../components/toolbar';

export default () => (
  <Router>
    <div>
      <Toolbar />
      <Route exact path='/' component={HomePage} />
      <Route exact path='/recipe/:id' component={RecipePage} />
      <Route exact path='/browse' component={BrowsePage} />
      <Route exact path='/admin' component={AdminPage} />
    </div>
  </Router>
);
