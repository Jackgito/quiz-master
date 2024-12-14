import { useState, useEffect } from "react";
import { useQuizSettings } from '../../context/quizSettingsContext';
import useFetchQuestions from "../../hooks/useFetchQuestions";
import useUpdatePlayerScore from "../../hooks/useUpdatePlayerScore.jsx";
import QuestionCard from "./QuestionCard/questionCard.jsx";
import QuestionTimer from "./QuestionTimer/questionTimer.jsx";
import ScoreDisplay from "./ScoreDisplay/scoreDisplay.jsx";
import EndingScreen from "./EndingScreen/endingScreen.jsx";
import './index.css';

const Quiz = () => {
  const { settings } = useQuizSettings();
  const { theme, difficulty, gamemode } = settings;

  const { questions, loading: questionsLoading, error: questionsError } = useFetchQuestions(theme, difficulty, gamemode);

  const updatePlayerScore = useUpdatePlayerScore();

  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [key, setKey] = useState(0); // Key for resetting timer
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);

  // Move to the next question and reset the answer state
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setUserAnswer(null);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setKey((prevKey) => prevKey + 1);
    } else {
      setGameEnded(true); // Quiz completed
    }
  };

  // Update score if the answer is correct
  const handleAnswer = (choice) => {
    setUserAnswer(choice);
    if (choice.correctAnswer) {
      setCorrectAnswers((prevCorrectAnswers) => prevCorrectAnswers + 1);
      setScore((prevScore) => prevScore + timeLeft);
    }
  };

  // Automatically move to the next question after answering
  useEffect(() => {
    if (userAnswer !== null) {
      const timer = setTimeout(() => {
        handleNextQuestion();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [userAnswer]);

  // Update player score to leaderboards and player database when game ends
  useEffect(() => {
    if (gameEnded) {
      const userId = sessionStorage.getItem("userId");
      if (userId) {
        updatePlayerScore(userId, theme, score); // Use the hook to update the score
      }
    }
  }, [gameEnded, score, theme, updatePlayerScore]);

  // Handle loading and errors for fetching questions
  if (questionsLoading) return <div>Loading...</div>;
  if (questionsError) return <div>Error loading questions: {questionsError.message}</div>;

  // Results screen
  if (gameEnded) {
    return (
      <EndingScreen
        score={score}
        totalQuestions={questions.length}
        correctAnswers={correctAnswers}
      />
    );
  }

  return (
    <div className="quiz-container">
      <ScoreDisplay score={score} />
      <QuestionTimer key={key} onTimeUp={handleNextQuestion} onTimeChange={setTimeLeft} />
      <QuestionCard
        question={questions[currentQuestionIndex].question}
        choices={questions[currentQuestionIndex].choices}
        onAnswer={handleAnswer}
        isDisabled={userAnswer !== null} // Disable answering if already answered
      />
    </div>
  );
};

export default Quiz;
