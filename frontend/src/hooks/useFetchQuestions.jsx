import { useState, useEffect } from "react";

// This custom hook acts like a function which returns an object with three properties: questions, loading, and error.
// Returned questions are chosen based on the theme and difficulty level selected by the user.
const useFetchQuestions = (theme, difficulty) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/questions?theme=${theme}&difficulty=${difficulty}&limit=1`);
        const data = await response.json();
        setQuestions(data);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [theme, difficulty]);

  return { questions, loading, error };
};

export default useFetchQuestions;