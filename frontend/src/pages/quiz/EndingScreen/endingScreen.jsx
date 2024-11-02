import { useState } from 'react';
import { Button } from 'rsuite';
import { useQuizSettings } from '../../../context/quizSettingsContext';
import QuizModal from '../../../components/QuizModal/quizModal.jsx';
import e from 'express';

// Displays final results of the quiz, including score and total questions answered correctly, and a button to play again.
const EndingScreen = ({ score, totalQuestions }) => {
  const [open, setOpen] = useState(false);

  const { settings } = useQuizSettings();
  const { theme, difficulty, gamemode } = settings;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <h2>Final score: {score}</h2>
      <h3>{totalQuestions} questions answered correctly</h3>
      <Button onClick={handleOpen}>Play again</Button>
      <QuizModal
        open={open}
        onClose={handleClose}
        title={title}
        description={description}
      />
    </div>
  );
}

export default EndingScreen;
