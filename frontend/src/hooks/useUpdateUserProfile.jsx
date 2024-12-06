import { useToaster, Notification } from "rsuite";

const useUpdateUserProfile = () => {
  const toaster = useToaster();

  const updateUserProfile = async (userId, updatedData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/updateProfile/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update profile");
      }

      const responseData = await response.json();

      // Show success notification
      toaster.push(
        <Notification type="success" header="Profile Updated Successfully">
          Your profile has been updated.
        </Notification>,
        { placement: "topEnd" }
      );

      return { success: true, data: responseData };
    } catch (err) {
      console.error("Error updating profile:", err.message);

      // Show error notification
      toaster.push(
        <Notification type="error" header="Profile Update Failed">
          {err.message || "An unexpected error occurred"}
        </Notification>,
        { placement: "topEnd" }
      );

      return { success: false, error: err.message || "An unexpected error occurred" };
    }
  };

  return updateUserProfile;
};

export default useUpdateUserProfile;
