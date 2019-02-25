import React, { Component } from 'react';
import './App.css';

import { Route, Router, Switch } from 'react-router-dom';
import Login from './containers/login';
import Register from './containers/register';
import UserProfile from './containers/userProfile';
import Operator from './containers/operator';
import Admin from './containers/admin';

import {createBrowserHistory} from 'history';
const history = createBrowserHistory ();

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/userProfile' component={UserProfile} />
          <Route path='/operator' component={Operator} />
          <Route path='/admin' component={Admin} />
        </Switch>
      </Router>
    );
  }
}

export default App;
