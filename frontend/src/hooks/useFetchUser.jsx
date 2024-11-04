import { useState, useEffect } from "react";
import { useToaster, Message } from "rsuite";

// Custom hook to fetch user data by user ID
const useFetchUser = (userId) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toaster = useToaster();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true); // Ensure loading state resets on each call
      try {
        const response = await fetch(`http://localhost:8000/api/user/get/${userId}`);
        if (!response.ok) {
          throw new Error(`Error fetching user: ${response.statusText}`);
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
        // Show error message using rsuite's toaster
        toaster.push(<Message type="error">{err.message}</Message>, { placement: "topCenter" });
      } finally {
        setLoading(false);
      }
    };

    // Call fetch function if a userId is provided
    if (userId) fetchUser();
  }, [userId, toaster]);

  return { user, loading, error };
};

export default useFetchUser;
