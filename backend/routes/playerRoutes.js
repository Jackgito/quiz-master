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
      context.response.body = { message: "User created successfully", userId: result.$oid };
    } catch (error) {
      console.log(error);
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
      console.log(error);
      context.response.status = 500;
      context.response.body = { error: "Internal Server Error" };
    }
  });

  // Get user details with achievements
  router.get("/api/user/get/:userId", async (context) => {
    try {
      const userId = context.params.userId;
      let objectId;
      try {
        objectId = new ObjectId(userId);
      } catch (error) {
        console.error("Invalid userId format:", userId);
        context.response.status = 400;
        context.response.body = { error: "Invalid user ID format" };
        return;
      }

      // Define user collections to search
      const userCollectionNames = ["UsersAC", "UsersDF", "UsersGI", "UsersJL", "UsersMZ"];
      let user = null;

      // Search for the user in all collections
      for (const collectionName of userCollectionNames) {
        user = await usersDb.collection(collectionName).findOne({ _id: objectId });
        if (user) break;
      }

      if (!user) {
        context.response.status = 404;
        context.response.body = { error: "User not found" };
        return;
      }

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
      console.log("Error fetching user details:", error);
      context.response.status = 500;
      context.response.body = { error: "Internal server error" };
    }
  });


  return router;
};