import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar.component';
import Boards from './containers/boards.container'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from './containers/login.container';
import Register from './containers/register.container';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>
          <NavBar />
          <Switch>
            <Route exact path='/' component={Boards} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
