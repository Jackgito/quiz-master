import { useState } from 'react';
import { Panel } from 'rsuite';
import QuizModal from './quizModal';
import './index.css';

const QuizCard = ({ title, description, image }) => {
  const [open, setOpen] = useState(false);
  const [difficulty, setDifficulty] = useState('normal');
  const [gameMode, setGameMode] = useState('multiplayer');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Panel bodyFill bordered header={title} onClick={handleOpen} style={{ cursor: 'pointer' }}>
        <img src={image} alt={title} style={{ width: '100%', height: 'auto' }} />
      </Panel>

      <QuizModal
        open={open}
        onClose={handleClose}
        title={title}
        description={description}
        difficulty={difficulty}
        onDifficultyChange={setDifficulty}
        gameMode={gameMode}
        onGameModeChange={setGameMode}
      />
    </>
  );
};

export default QuizCard;