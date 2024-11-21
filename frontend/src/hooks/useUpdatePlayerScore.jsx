import { useToaster, Notification } from "rsuite";

const useUpdatePlayerScore = () => {
  const toaster = useToaster();

  const updatePlayerScore = async (userId, theme, score) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/updateScore/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, theme, score }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update score");
      }

      const responseData = await response.json();

      // Show success toaster
      toaster.push(
        <Notification type="success" header="Score Updated Successfully">
          Score has been updated for {theme}.
        </Notification>,
        { placement: "topEnd" }
      );

      return { success: true, data: responseData };
    } catch (err) {
      console.error("Error updating score:", err.message);

      // Show error toaster
      toaster.push(
        <Notification type="error" header="Score Update Failed">
          {err.message || "An unexpected error occurred"}
        </Notification>,
        { placement: "topEnd" }
      );

      return { success: false, error: err.message || "An unexpected error occurred" };
    }
  };

  return updatePlayerScore;
};

export default useUpdatePlayerScore;
