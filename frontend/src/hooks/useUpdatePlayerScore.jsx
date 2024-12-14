import { useToaster, Notification } from "rsuite";

// Updates player score in the player and leaderboards databases
const useUpdatePlayerScore = () => {
  const toaster = useToaster();

  const updatePlayerScore = async (userId, theme, score) => {
    try {
      // Update player score
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

      // Update leaderboard
      const leaderboardResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/leaderboards/update/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, theme, score }),
      });

      if (!leaderboardResponse.ok) {
        const errorData = await leaderboardResponse.json();
        throw new Error(errorData.error || "Failed to update leaderboard");
      }

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