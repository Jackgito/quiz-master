import { useState, useEffect } from "react";

const useFetchLeaderboards = (theme, period) => {
  const [leaderboards, setLeaderboards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboards = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/leaderboards/${theme}/${period}`, {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setLeaderboards(data);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboards();
  }, [theme, period]);

  return { leaderboards, loading, error };
};

export default useFetchLeaderboards;