import { useState, useEffect } from "react";
import { useQuizSettings } from '../../context/quizSettingsContext';
import QuestionCard from "../../components/QuestionCard";
import useFetchQuestions from "../../hooks/useFetchQuestions";
import QuestionTimer from "../../components/QuestionTimer";
import './index.css';

const Quiz = () => {
  const { settings } = useQuizSettings();
  const { theme, difficulty, gamemode } = settings;

  const { questions, loading, error } = useFetchQuestions(theme, difficulty, gamemode);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    if (isAnswered) {
      const timer = setTimeout(() => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setIsAnswered(false);
        setUserAnswer(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isAnswered]);

  if (loading) return <div>Generating questions...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleAnswer = (answer) => {
    setUserAnswer(answer);
    setIsAnswered(true);
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) return <div>Quiz completed!</div>;

  return (
    <>
      <QuestionTimer />
      <QuestionCard question={currentQuestion} onAnswer={handleAnswer} />
      {isAnswered && <div>Next question in 3 seconds...</div>}
    </>
  );
}

export default Quiz;