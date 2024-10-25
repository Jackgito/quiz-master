import React, { createContext, useState, useContext } from 'react';

const QuizSettingsContext = createContext();

export const useQuizSettings = () => useContext(QuizSettingsContext);

export const QuizSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    theme: '',
    difficulty: 'normal',
    gamemode: 'multiplayer',
  });

  return (
    <QuizSettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </QuizSettingsContext.Provider>
  );
};