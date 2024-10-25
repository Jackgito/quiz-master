import { useState, useEffect } from "react";

const useFetchQuestions = (theme, difficulty, gamemode) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/questions?theme=${theme}&difficulty=${difficulty}&gamemode=${gamemode}`);
        const data = await response.json();
        setQuestions(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [theme, difficulty, gamemode]);

  return { questions, loading, error };
};

export default useFetchQuestions;