import { MongoClient } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import "https://deno.land/x/dotenv/load.ts";  // To load environment variables from .env file

// Load environment variables
const MONGO_URI = Deno.env.get("MONGO_URI") || "mongodb://localhost:27017";
const MONGO_DB_NAME = Deno.env.get("MONGO_DB_NAME") || "quiz-game";

// Initialize MongoClient
const client = new MongoClient();

try {
  // Connect to the MongoDB server using the URI and options
  await client.connect(MONGO_URI);
  console.log("🟢 Connected to MongoDB successfully");
} catch (error) {
  console.error("🔴 Error connecting to MongoDB", error);
  throw error;
}

// Export the connected database
const db = client.database(MONGO_DB_NAME);

export default db;