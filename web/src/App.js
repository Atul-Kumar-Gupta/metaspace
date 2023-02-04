import './App.css';
import Homepage from './components/homepage/homepage'
import Login from './components/login/login'
import Register from './components/register/register'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { useState } from 'react';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" >
            <Homepage />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
        </Switch>
      </Router>



    </div>
  );
}

export default App;
