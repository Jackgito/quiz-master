import { useState } from 'react';
import { Panel } from 'rsuite';
import QuizModal from './quizModal';
import './index.css';

const QuizCard = ({ title, description, image }) => {
  const [open, setOpen] = useState(false);
  const [difficulty, setDifficulty] = useState('normal');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDifficultyChange = (value) => setDifficulty(value);

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
        onDifficultyChange={handleDifficultyChange}
      />
    </>
  );
};

export default QuizCard;