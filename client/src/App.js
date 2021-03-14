import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Display from './components/Display/Display';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';

import './App.css';

const App = () => {
  return (
    <>
      <Navbar></Navbar>
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/Display" component={Display} />
      </Router>
    </>
  );
}



export default App;
