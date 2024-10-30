import React, { createContext, useState, useContext } from 'react';

const QuizSettingsContext = createContext();

export const useQuizSettings = () => useContext(QuizSettingsContext);

// This is used to pass the theme, difficulty, and gamemode
// settings among different components and pages
export const QuizSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    theme: '',
    difficulty: '',
    gamemode: '',
  });

  return (
    <QuizSettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </QuizSettingsContext.Provider>
  );
};