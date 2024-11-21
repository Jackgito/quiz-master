import { useToaster, Message } from "rsuite";

const useFetchUserData = () => {
  const toaster = useToaster();

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/get/${userId}`);
      if (!response.ok) {
        throw new Error(`Error fetching user: ${response.statusText}`);
      }
      const data = await response.json();
      return { success: true, data };
    } catch (err) {
      console.error(err);
      // Show an error message using the toaster
      toaster.push(<Message type="error">{err.message}</Message>, { placement: "topCenter" });
      return { success: false, error: err.message };
    }
  };

  return fetchUserData;
};

export default useFetchUserData;
