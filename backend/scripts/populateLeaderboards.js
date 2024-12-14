import { config } from "https://deno.land/x/dotenv/mod.ts";
import { MongoClient } from "npm:mongodb@6.10.0";
import { calculateRank } from "../utils/calculateRank.js";

// Usage: Loading ENV's didn't work, so you need to copy-paste the uri and db name from env file
// User ID should exist in the Users DB
//  deno run --allow-all populateLeaderboards.js <your_user_id>

// Generates random scores and ranks for a user in each leaderboard collection
async function populateLeaderboards(userId) {
  
  // Load environment variables from .env file
  const env = config();
  const MONGO_URI = ""
  const MONGO_DB_NAME_LEADERBOARDS = "";
  console.log(MONGO_URI);

  // Initialize MongoDB client with URI
  const client = new MongoClient(MONGO_URI);
  try {


    // Attempt to connect to MongoDB and handle any connection errors
    try {
      await client.connect();
      console.log("🟢 Connected to MongoDB successfully");
    } catch (error) {
      console.error("🔴 Error connecting to MongoDB", error);
      Deno.exit(1);
    }

    const leaderboardDb = client.db(MONGO_DB_NAME_LEADERBOARDS);

    // Replace listCollectionNames with listCollections
    const collectionsCursor = await leaderboardDb.listCollections();
    const collections = await collectionsCursor.toArray();
    console.log("Collections found:", collections.map(collection => collection.name));

    for (const collection of collections) {
      const collectionName = collection.name;
      const leaderboardCollection = leaderboardDb.collection(collectionName);

      const score = Math.floor(Math.random() * 1001); // Random score between 0 and 1000
      const rank = calculateRank(score);
      const timestamp = new Date(
        new Date(2020, 0, 1).getTime() + Math.random() * (Date.now() - new Date(2020, 0, 1).getTime())
      );

      const entry = {
        userId: userId,
        score,
        rank,
        timestamp
      };

      await leaderboardCollection.insertOne(entry);
      console.log(`Inserted entry into ${collectionName}:`, entry);
    }
  } catch (error) {
    console.error("Error populating leaderboards:", error);
  } finally {
    client.close();
  }
}

// Replace 'your_user_id' with the actual user ID you want to use
const userId = Deno.args[0];
if (!userId) {
  console.error("Please provide a user ID as an argument.");
  Deno.exit(1);
}

await populateLeaderboards(userId);
