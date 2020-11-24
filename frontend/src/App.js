import React from 'react';
import './styles/App.css';
import NavBar from './components/NavBar.component';
import Boards from './containers/boards.container'
import {useSelector} from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from './containers/login.container';
import Register from './containers/register.container';

const App = () => {

  const userReducer = useSelector(state => state.userReducer)

    return (
      <div className="App">
        <Router>
          <NavBar 
            isAuthenticated={userReducer.loggedIn}
          />
          <Switch>
            <Route exact path="/">
              <Redirect to="/boards" />
            </Route>
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/boards' component={Boards} />
          </Switch>
        </Router>
      </div>
    );
  }

export default App
