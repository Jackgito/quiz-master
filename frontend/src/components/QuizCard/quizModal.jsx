import { Modal, Button } from 'rsuite';
import DifficultySelector from './difficultySelector';
import GameModeSelector from './gameModeSelector';

const QuizModal = ({ open, onClose, title, description, difficulty, onDifficultyChange, gameMode, onGameModeChange }) => (
  <Modal open={open} onClose={onClose}>
    <Modal.Header>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>{description}</p>
      <div className="selector-container">
        <DifficultySelector difficulty={difficulty} onChange={onDifficultyChange} />
        <GameModeSelector gameMode={gameMode} onChange={onGameModeChange} />
        <Button onClick={onClose} appearance="primary">
        Start Quiz
      </Button>
      </div>
    </Modal.Body>
  </Modal>
);

export default QuizModal;