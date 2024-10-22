import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';

import 'rsuite/dist/rsuite.min.css';
import './main.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  </StrictMode>,
)
