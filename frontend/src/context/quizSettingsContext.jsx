import React, { createContext, useState, useContext, useEffect } from 'react';

const QuizSettingsContext = createContext();

export const useQuizSettings = () => useContext(QuizSettingsContext);

export const QuizSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('quizSettings');
    return savedSettings ? JSON.parse(savedSettings) : {
      theme: '',
      difficulty: '',
      gamemode: '',
      description: '',
    };
  });

  useEffect(() => {
    localStorage.setItem('quizSettings', JSON.stringify(settings));
  }, [settings]);

  return (
    <QuizSettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </QuizSettingsContext.Provider>
  );
};