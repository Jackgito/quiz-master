import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { userSchema } from "../schemas/userSchema.js";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";

const router = new Router();

export default (usersDb) => {

  // Custom validation function based on `userSchema`
  function validateUserData(data) {
    // Check required fields
    for (const field in userSchema) {
      const fieldSchema = userSchema[field];
      if (fieldSchema.required && !(field in data)) {
        return { isValid: false, message: `${field} is required` };
      }
    }
    // Additional checks, like checking types and uniqueness, can be added here.
    return { isValid: true };
  }

  // Create new user endpoint
  router.post("/api/user/create", async (context) => {
    try {
      const body = await context.request.body().value;
      const { username, email, password = [], } = body;

      // Validate request data against userSchema
      const validation = validateUserData(body);
      if (!validation.isValid) {
        context.response.status = 400;
        context.response.body = { error: validation.message };
        return;
      }

      // Check if username already exists
      const firstChar = username.charAt(0).toUpperCase();
      const collectionName = `Users${firstChar}${firstChar === 'A' ? 'C' : ''}`;
      const usersCollection = usersDb.collection(collectionName);
      const existingUser = await usersCollection.findOne({ username });
      if (existingUser) {
        context.response.status = 400;
        context.response.body = { error: "Username already exists" };
        return;
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password);

      // Insert user document into the database
      const userData = {
        username,
        email,
        password: hashedPassword,
        createdAt: new Date(),
      };

      const result = await usersCollection.insertOne(userData);

      // Respond with success message and user ID
      context.response.status = 201;
      context.response.body = { message: "User created successfully", userId: result.$oid };
    } catch (error) {
      context.response.status = 500;
      context.response.body = { error: "Internal Server Error" };
    }
  });

  return router;
};