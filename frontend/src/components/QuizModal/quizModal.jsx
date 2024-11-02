import { Modal, Button } from 'rsuite';
import { useNavigate } from 'react-router-dom';
import { useQuizSettings } from '../../context/quizSettingsContext';
import DifficultySelector from '../../pages/home/QuizCard/difficultySelector';
import GameModeSelector from '../../pages/home/QuizCard/gameModeSelector';
import './quizModal.css';
import { useState } from 'react';

const QuizModal = ({ open, onClose, title, description }) => {
  const navigate = useNavigate();
  const { settings, setSettings } = useQuizSettings();
  const [difficulty, setDifficulty] = useState(settings.difficulty || 'Normal');
  const [gameMode, setGameMode] = useState(settings.gamemode || 'Multiplayer');

  const handleStartQuiz = () => {
    setSettings({ theme: title, difficulty, gamemode: gameMode }); // This saves quiz settings to the context, so it can be accessed by the quiz page
    navigate('/quiz');
  };

  return (
    <Modal open={open} onClose={onClose} size="md">
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{description}</p>
        <div className="selector-container">
          <DifficultySelector difficulty={difficulty} onChange={setDifficulty} />
          <GameModeSelector gameMode={gameMode} onChange={setGameMode} />
          <Button onClick={handleStartQuiz} appearance="primary">
            Start Quiz
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default QuizModal;