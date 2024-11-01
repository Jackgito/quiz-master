import { useState, useEffect } from "react";
import { useQuizSettings } from '../../context/quizSettingsContext';
import QuestionCard from "./QuestionCard/questionCard.jsx";
import QuestionTimer from "./QuestionTimer/questionTimer.jsx";
import useFetchQuestions from "../../hooks/useFetchQuestions";
import './index.css';

const Quiz = () => {
  const { settings } = useQuizSettings();
  const { theme, difficulty, gamemode } = settings;

  const { questions, loading, error } = useFetchQuestions(theme, difficulty, gamemode);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [key, setKey] = useState(0);  // Key for resetting timer

  // Move to the next question and reset the answer state
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setUserAnswer(null);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setKey(prevKey => prevKey + 1);
    } else {
      // Quiz completed
      console.log("Quiz completed!");
      // Show final results
    }
  };

  // Handle answer selection
  const handleAnswer = (answer) => {
    setUserAnswer(answer);
  };

  // Automatically move to the next question if answered, with a delay
  useEffect(() => {
    if (userAnswer !== null) {
      const timer = setTimeout(() => {
        handleNextQuestion();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [userAnswer]);

  // Loading and error handling
  if (loading) return <div>Generating questions...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Check if there are questions left
  const questionInfo = questions[currentQuestionIndex];
  if (!questionInfo) return <div>Quiz completed!</div>;

  return (
    <div className="quiz-container">
      <QuestionTimer key={key} onTimeUp={handleNextQuestion} />
      <QuestionCard
        question={questionInfo.question}
        choices={questionInfo.choices}
        onAnswer={handleAnswer} 
        isDisabled={userAnswer !== null}  // Disable answering when time's up or already answered
      />
    </div>
  );
};

export default Quiz;