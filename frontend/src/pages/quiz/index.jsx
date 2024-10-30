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
  const [key, setKey] = useState(0);  // Key for resetting timer

  // Move to the next question and reset the answer state
  console.log(questions)
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setIsAnswered(false);
      setUserAnswer(null);
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
    setIsAnswered(true);
  };

  // Automatically move to the next question if answered, with a delay
  useEffect(() => {
    if (isAnswered) {
      const timer = setTimeout(() => {
        handleNextQuestion();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isAnswered]);

  // Loading and error handling
  if (loading) return <div>Generating questions...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Check if there are questions left
  const questionInfo = questions[currentQuestionIndex];
  if (!questionInfo) return <div>Quiz completed!</div>;

  return (
    <div className="quiz-container">
      <h2>{questionInfo.question}</h2>
      <QuestionTimer key={key} onTimeUp={handleNextQuestion} />
      {/* <QuestionCard 
        question={questionInfo} 
        onAnswer={handleAnswer} 
        disabled={isAnswered}  // Disable answering when time's up or already answered
      /> */}
      {isAnswered && <div>Next question in 3 seconds...</div>}
    </div>
  );
};

export default Quiz;
