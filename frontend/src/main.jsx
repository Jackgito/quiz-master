import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { QuizSettingsProvider } from './context/quizSettingsContext';

import Home from './pages/home';
import Quiz from './pages/quiz';
import Leaderboard from './pages/leaderboard';

import 'rsuite/dist/rsuite.min.css';
import './main.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QuizSettingsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </Router>
    </QuizSettingsProvider>
  </StrictMode>,
)