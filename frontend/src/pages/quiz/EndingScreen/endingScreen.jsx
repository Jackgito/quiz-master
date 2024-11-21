import { useState } from 'react';
import { Button } from 'rsuite';
import { useNavigate } from 'react-router-dom';
import { useQuizSettings } from '../../../context/quizSettingsContext';
import QuizModal from '../../../components/QuizModal/quizModal.jsx';

// Displays final results of the quiz, including score and total questions answered correctly, and a button to play again.
const EndingScreen = ({ score, totalQuestions, correctAnswers }) => {
  const [open, setOpen] = useState(false);

  const { settings } = useQuizSettings();

  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="quiz-container">
      <h2>Final score: {score}</h2>
      <h3>Correct answers: {correctAnswers}/{totalQuestions}</h3>
      <Button onClick={handleOpen} style={{marginRight: 10}}>Play again</Button>
      <Button onClick={() => navigate("/")}>Return to home</Button>
      <QuizModal
        open={open}
        onClose={handleClose}
        title={settings.theme}
        description={settings.description}
      />
    </div>
  );
}

export default EndingScreen;
