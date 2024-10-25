import { Modal, Button } from 'rsuite';
import { useNavigate } from 'react-router-dom';
import DifficultySelector from './difficultySelector';
import GameModeSelector from './gameModeSelector';
import { useQuizSettings } from '../../context/quizSettingsContext';

const QuizModal = ({ open, onClose, title, description, difficulty, onDifficultyChange, gameMode, onGameModeChange }) => {
  const navigate = useNavigate();
  const { setSettings } = useQuizSettings();

  const handleStartQuiz = () => {
    setSettings({ theme: title, difficulty, gamemode: gameMode });
    navigate('/quiz');
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{description}</p>
        <div className="selector-container">
          <DifficultySelector difficulty={difficulty} onChange={onDifficultyChange} />
          <GameModeSelector gameMode={gameMode} onChange={onGameModeChange} />
          <Button onClick={handleStartQuiz} appearance="primary">
            Start Quiz
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default QuizModal;