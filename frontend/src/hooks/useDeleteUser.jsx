import { useToaster, Message } from "rsuite";

const useDeleteUser = () => {
  const toaster = useToaster();

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/delete/${userId}`, {
        method: "DELETE",
      });
      
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

  return deleteUser;
};

export default useDeleteUser;
