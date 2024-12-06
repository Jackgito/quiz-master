import { useToaster, Notification } from "rsuite";

const useAuthenticateUser = () => {
  const toaster = useToaster();

  const authenticateUser = async (username, password) => {
    // Sanitize form values
    const sanitizedFormValue = {
      username: username.trim(),
      password: password.trim(),
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/authenticate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sanitizedFormValue),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to authenticate");
      }

      const responseData = await response.json();
      const { message, userId, userProfilePicturePath } = responseData;

      // Store user ID in session storage
      sessionStorage.setItem("userId", userId);
      sessionStorage.setItem("userProfilePicturePath", userProfilePicturePath);

      // Show success toaster
      toaster.push(
        <Notification type="success" header="Authentication Successful">
          {message || "Welcome back!"}
        </Notification>,
        { placement: "topEnd" }
      );

      return { success: true, message };
    } catch (err) {
      console.error("Authentication error:", err.message);

      // Show error toaster
      toaster.push(
        <Notification type="error" header="Authentication Failed">
          {err.message || "An unexpected error occurred"}
        </Notification>,
        { placement: "topEnd" }
      );

      return { success: false, error: err.message };
    }
  };

  return authenticateUser;
};

export default useAuthenticateUser;
