import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import mongoose from "npm:mongoose@^8.7";
const { ObjectId } = mongoose.Types;
import { User } from "../schemas/User.js";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";

const router = new Router();

export default (usersDb) => {

  // Function to determine the collection name based on the first character of username
  function getCollectionName(username) {
    const firstChar = username.charAt(0).toUpperCase();

    if (firstChar >= 'A' && firstChar <= 'C') {
      return "UsersAC";
    } else if (firstChar >= 'D' && firstChar <= 'F') {
      return "UsersDF";
    } else if (firstChar >= 'G' && firstChar <= 'I') {
      return "UsersGI";
    } else if (firstChar >= 'J' && firstChar <= 'L') {
      return "UsersJL";
    } else if (firstChar >= 'M' && firstChar <= 'Z') {
      return "UsersMZ";
    } else {
      throw new Error("Invalid username character range");
    }
  }

  function transformToObjectId(userId) {
    try {
      return new ObjectId(userId);
    } catch (error) {
      console.error("Invalid userId format:", userId);
      throw new Error("Invalid user ID format");
    }
  }

  // Returns the user document and collection name
  async function findUserById(userId) {
    const userCollectionNames = ["UsersAC", "UsersDF", "UsersGI", "UsersJL", "UsersMZ"];
    let user = null;
    let foundCollectionName = null;
  
    for (const collectionName of userCollectionNames) {
      user = await usersDb.collection(collectionName).findOne({ _id: transformToObjectId(userId) });
      if (user) {
        foundCollectionName = collectionName;
        break;
      }
    }
  
    if (!user) {
      context.response.status = 404;
      context.response.body = { error: "User not found" };
      return;
    }
  
    return { user, collectionName: foundCollectionName };
  }

  // Create a new user
  router.post("/api/user/create", async (context) => {
    try {
      const body = await context.request.body().value;
      const { username, email, password = [] } = body;

      // Use the getCollectionName function to get the correct collection
      const collectionName = getCollectionName(username);
      const usersCollection = usersDb.collection(collectionName);

      // Check if username already exists
      const existingUser = await usersCollection.findOne({ username });
      if (existingUser) {
        context.response.status = 400;
        context.response.body = { error: "Username already exists" };
        return;
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password);

      // Insert user document into the database
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        createdAt: new Date(),
      });

      const result = await usersCollection.insertOne(newUser);

      // Respond with success message and user ID
      context.response.status = 201;
      context.response.body = { message: "User created successfully", userId: result.insertedId.toString() };
    } catch (error) {
      console.error(error);
      context.response.status = 500;
      context.response.body = { error: "Internal Server Error" };
    }
  });

  // Authenticate a user (check if userId in session storage matches user in DB)
  router.post("/api/user/authenticate", async (context) => {
    try {
      const body = await context.request.body().value;
      const { username, password } = body;

      // Use the getCollectionName function to get the correct collection
      const collectionName = getCollectionName(username);
      const usersCollection = usersDb.collection(collectionName);

      // Find the user in the database and compare the hashed password
      const user = await usersCollection.findOne({ username });
      const passwordMatch = user && await bcrypt.compare(password, user.password);

      if (!user || !passwordMatch) {
        context.response.status = 404;
        context.response.body = { error: "Invalid username or password" };
        return;
      }

      // Convert user._id to a string
      const userId = user._id.toString(); 

      // Respond with success message and user ID
      context.response.status = 200;
      context.response.body = { message: "Authentication successful", userId: userId };
    } catch (error) {
      console.error(error);
      context.response.status = 500;
      context.response.body = { error: "Internal Server Error" };
    }
  });

  // Get user details with achievements
  router.get("/api/user/get/:userId", async (context) => {
    try {
      // Find the user in the database
      const userId = context.params.userId;
      let objectId = transformToObjectId(userId);
      const { user, collectionName } = await findUserById(objectId);

      // Remove _id and password from the user data
      const { _id, password, achievements, ...userWithoutSensitiveInfo } = user;
      // Fetch achievement details for each achievement ID
      const achievementDetails = [];
      if (achievements && achievements.length > 0) {
        for (const achievement of achievements) {
          const achievementData = await usersDb.collection("Achievements").findOne({ _id: achievement.achievementId });
          if (achievementData) {
            achievementDetails.push({
              achievementId: achievement.achievementId,
              name: achievementData.name,
              icon: achievementData.icon,
              dateEarned: achievement.dateEarned,
            });
          }
        }
      }
      // Combine user data with achievements
      context.response.status = 200;
      context.response.body = {
        ...userWithoutSensitiveInfo,
        achievements: achievementDetails,
      };

    } catch (error) {
      console.error("Error fetching user details:", error);
      context.response.status = 500;
      context.response.body = { error: "Internal server error" };
    }
  });

  // Update or add user score
  router.post("/api/user/updateScore/:userId", async (context) => {
    try {
      // Find the user in the database
      const userId = context.params.userId;
      let objectId = transformToObjectId(userId);
      const { user, collectionName } = await findUserById(objectId);

      const body = await context.request.body().value;
      const { theme, score } = body;
      

      // Validate request body
      if (!theme || typeof score !== "number") {
        context.response.status = 400;
        context.response.body = { error: "Invalid request body. Provide 'theme' and 'score'." };
        return;
      }

      user.themes = user.themes || [];

      // Check if the theme exists
      let themeIndex = user.themes.findIndex((t) => t.theme === theme);
      const updatedThemes = [...user.themes];

      if (themeIndex === -1) {
        // Add new theme if not found
        updatedThemes.push({
          theme: theme,
          rank: "novice",
          currentScore: score,
        });
      } else {
        // Increment theme score
        updatedThemes[themeIndex].currentScore += score;

        // Update rank based on new currentScore
        const newRank = determineRank(updatedThemes[themeIndex].currentScore);
        updatedThemes[themeIndex].rank = newRank;
      }

      // Update totalScore
      const newTotalScore = user.totalScore + score;

      // Update the user document in the database
      const usersCollection = usersDb.collection(collectionName);
      const result = await usersCollection.updateOne(
        { _id: objectId },
        {
          $set: {
            totalScore: newTotalScore,
            themes: updatedThemes,
          },
        }
      );

      if (result.modifiedCount === 0) {
        context.response.status = 500;
        context.response.body = { error: "Failed to update user scores." };
        return;
      }

      // Respond with success
      context.response.status = 200;
      context.response.body = {
        message: "Score updated successfully",
        userId,
        updatedTotalScore: newTotalScore,
        updatedTheme: updatedThemes.find((t) => t.theme === theme),
      };
    } catch (error) {
      console.error(error);
      context.response.status = 500;
      context.response.body = { error: "Internal Server Error" };
    }
  });

  // Update user profile
router.post("/api/user/updateProfile/:userId", async (context) => {
  try {
    // Extract userId from the route parameters
    const userId = context.params.userId;
    const objectId = transformToObjectId(userId);

    // Retrieve the user from the database
    const { user, collectionName } = await findUserById(objectId);

    if (!user) {
      context.response.status = 404;
      context.response.body = { error: "User not found." };
      return;
    }

    // Parse the request body
    const body = await context.request.body().value;
    const { profilePicture, ...otherUpdates } = body;

    // Validate the request body
    if (!profilePicture && Object.keys(otherUpdates).length === 0) {
      context.response.status = 400;
      context.response.body = { error: "Invalid request body. Provide data to update." };
      return;
    }

    // Update fields in the user document
    const updates = {};

    if (profilePicture) {
      updates.profilePicture = profilePicture;
    }

    // Add any other updates to the user profile
    Object.keys(otherUpdates).forEach((key) => {
      updates[key] = otherUpdates[key];
    });

    // Update the user document in the database
    const usersCollection = usersDb.collection(collectionName);
    const result = await usersCollection.updateOne(
      { _id: objectId },
      { $set: updates }
    );

    if (result.modifiedCount === 0) {
      context.response.status = 500;
      context.response.body = { error: "Failed to update user profile." };
      return;
    }

    // Respond with success
    context.response.status = 200;
    context.response.body = {
      message: "Profile updated successfully",
      userId,
      updatedFields: updates,
    };
  } catch (error) {
    console.error(error);
    context.response.status = 500;
    context.response.body = { error: "Internal Server Error" };
  }
});
  // Delete a user by ID
  router.delete("/api/user/delete/:userId", async (context) => {
    try {
      const userId = context.params.userId;
      const objectId = transformToObjectId(userId);

      // Find the user and the collection they belong to
      const { user, collectionName } = await findUserById(objectId);

      if (!user) {
        context.response.status = 404;
        context.response.body = { error: "User not found" };
        return;
      }

      // Delete the user from the database
      const usersCollection = usersDb.collection(collectionName);
      const result = await usersCollection.deleteOne({ _id: objectId });

      if (result.deletedCount === 0) {
        context.response.status = 500;
        context.response.body = { error: "Failed to delete user." };
        return;
      }

      // Respond with success
      context.response.status = 200;
      context.response.body = { message: "User deleted successfully", userId };
    } catch (error) {
      console.error("Error deleting user:", error);
      context.response.status = 500;
      context.response.body = { error: "Internal Server Error" };
    }
  });

  // Utility function to determine rank based on score (rank names need to be changed)
  function determineRank(score) {
    switch (true) {
      case (score >= 1000):
        return "Expert";
      case (score >= 750):
        return "Advanced";
      case (score >= 500):
        return "Intermediate";
      case (score >= 250):
        return "Scholar";
      default:
        return "Novice";
    }
  }

  return router;
};