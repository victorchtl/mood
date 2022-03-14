import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";
import './App.css';
import Home from './app/components/home/Home';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/home" element={<Home/>}>
          </Route>
          <Route path="" element={<Navigate to="/home" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
