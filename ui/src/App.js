import React from 'reactn';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  return (
    <Router>
      <Route path="/" exact component={Login} />
      <Route path="/signup" component={Signup} />
    </Router>
  );
}

export default App;
