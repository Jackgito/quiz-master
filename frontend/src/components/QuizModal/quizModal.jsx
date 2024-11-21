import { Modal, Button } from 'rsuite';
import { useNavigate } from 'react-router-dom';
import DifficultySelector from '../../pages/home/QuizCard/difficultySelector';
import GamemodeSelector from '../../pages/home/QuizCard/gamemodeSelector';
import { useQuizSettings } from '../../context/quizSettingsContext';

import './quizModal.css';
import { useEffect } from 'react';

const QuizModal = ({ open, onClose, title, description }) => {

  const { setSettings } = useQuizSettings();

  // Update theme in settings context when the modal is opened
  useEffect(() => {
    if (open) {
      setSettings((prevSettings) => ({
        ...prevSettings,
        theme: title,
      }));
    }
  }, [title, setSettings, open]);

  const navigate = useNavigate();

  const handleStartQuiz = () => {
    if (location.pathname === '/quiz') {
      window.location.reload(); // Reload the page with new settings if already on quiz page
    } else {
      navigate('/quiz');
    }
  };

  return (
    <Modal open={open} onClose={onClose} size="md">
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{description}</p>
        <div className="selector-container">
          <DifficultySelector/>
          <GamemodeSelector/>
          <Button onClick={handleStartQuiz} appearance="primary">
            Start Quiz
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default QuizModal;