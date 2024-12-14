import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { calculateRank } from "../utils/calculateRank.js";
import { transformToObjectId } from "../utils/transformToObjectId.js";

const router = new Router();

export default (leaderboardDb, usersDb) => {

  // Add or update a leaderboard entry
  router.post("/api/leaderboards/update/:userId", async (context) => {
    const body = await context.request.body().value;
  
    const { userId, score, theme } = body;
  
    if (!userId || !score || !theme) {
      context.response.status = 400;
      context.response.body = { error: "All fields are required" };
      return;
    }
  
    try {
      const leaderboardCollection = leaderboardDb.collection(theme);
      const existingEntry = await leaderboardCollection.findOne({ userId });
  
      const entryData = {
        userId,
        score,
        rank: calculateRank(score),
        timestamp: new Date()
      };
  
      if (existingEntry) {
        // Update existing entry
        const { matchedCount } = await leaderboardCollection.updateOne(
          { userId },
          { $set: entryData }
        );
  
        if (matchedCount === 0) {
          context.response.status = 404;
          context.response.body = { error: "Leaderboard entry not found" };
          return;
        }
  
        context.response.body = { message: "Leaderboard entry updated successfully" };
      } else {
        // Create new entry
        await leaderboardCollection.insertOne(entryData);
        context.response.status = 201;
        context.response.body = { message: "Leaderboard entry added successfully" };
      }
    } catch (error) {
      context.response.status = 500;
      context.response.body = { error: "Internal Server Error" };
    }
  });

  // Fetch all users from a specific leaderboard theme and period
  router.get("/api/leaderboards/:theme/:period", async (context) => {
    const theme = context.params.theme;
    const period = context.params.period;

    let startDate, endDate;
    const now = new Date();

    if (period === "daily") {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    } else if (period === "monthly") {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    } else if (period === "allTime") {
      startDate = new Date(0);
      endDate = now;
    } else {
      context.response.status = 400;
      context.response.body = { error: "Invalid period" };
      return;
    }

    try {
      const leaderboardCollection = leaderboardDb.collection(theme); // Access the correct leaderboard collection
      const users = await leaderboardCollection.find({
        timestamp: { $gte: startDate, $lt: endDate }
      }).toArray();

      if (users.length === 0) {
        context.response.status = 200;
        console.log("No users found");
        context.response.body = [];
        return;
      }

      // Retrieve user details from Users DB based on user IDs in the leaderboard
      const userIds = users.map(user => user.userId);
      const usersCollections = ["UsersAC", "UsersDF", "UsersGI", "UsersJL", "UsersMZ"];
      let userDetails = [];

      for (const collectionName of usersCollections) {
        const usersCollection = usersDb.collection(collectionName);

        console.log(`Querying collection: ${collectionName} with IDs:`, userIds);

        const details = await usersCollection.find({ _id: { $in: userIds.map(id => transformToObjectId(id)) } }).toArray();

        if (details.length > 0) {
          userDetails = userDetails.concat(details);
          console.log("User details found in collection:", collectionName);
        }
      }

      // Sort users by score in descending order and calculate placement
      users.sort((a, b) => b.score - a.score);
      users.forEach((user, index) => {
        user.placement = index + 1;
      });

      // Map leaderboard entries with user info, like username
      const leaderboardWithDetails = users.map(user => {
        const userInfo = userDetails.find(detail => detail._id.toString() === user.userId.toString()) || null;
        return {
          ...user,
          userInfo
        };
      });

      context.response.status = 200;
      context.response.body = leaderboardWithDetails;
    } catch (error) {
      console.error("Error retrieving user details:", error);
      context.response.status = 500;
      context.response.body = { error: "Internal Server Error" };
    }
  });

  return router;
};