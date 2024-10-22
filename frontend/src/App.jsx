import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';

import 'rsuite/dist/rsuite.min.css';
import './App.css'

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Add other routes here */}
    </Routes>
  </Router>
);

export default App;