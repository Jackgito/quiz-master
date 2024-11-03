import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
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

  // Authenticate a user
  router.post("/api/user/authenticate", async (context) => {
    try {
      const body = await context.request.body().value;
      const { username, password } = body;

      // Use the getCollectionName function to get the correct collection
      const collectionName = getCollectionName(username);
      const usersCollection = usersDb.collection(collectionName);

      // Find the user in the database
      const user = await usersCollection.findOne({ username });
      if (!user) {
        context.response.status = 404;
        context.response.body = { error: "User not found" };
        return;
      }

      // Compare the hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        context.response.status = 401;
        context.response.body = { error: "Invalid password" };
        return;
      }

      // Respond with success message and user ID
      context.response.status = 200;
      context.response.body = { message: "Authentication successful", userId: user._id.$oid };
    } catch (error) {
      console.log(error);
      context.response.status = 500;
      context.response.body = { error: "Internal Server Error" };
    }
  });

  return router;
};