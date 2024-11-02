import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";

const router = new Router();

export default (leaderboardDb, usersDb) => {

  // Add a new leaderboard entry
  router.post("/api/leaderboards", async (context) => {
    const body = await context.request.body().value;

    const { userId, topScore, rank, period } = body;

    if (!userId || !topScore || !rank || !period) {
      context.response.status = 400;
      context.response.body = { error: "All fields are required" };
      return;
    }

    try {
      const leaderboardCollection = leaderboardDb.collection("leaderboard");
      const newEntry = {
        userId,
        topScore,
        rank,
        period,
        timestamp: new Date()
      };
      await leaderboardCollection.insertOne(newEntry);
      context.response.status = 201;
      context.response.body = { message: "Leaderboard entry added successfully" };
    } catch (error) {
      context.response.status = 500;
      context.response.body = { error: "Internal Server Error" };
    }
  });

  // Update an existing leaderboard entry
  router.put("/api/leaderboards/:userId", async (context) => {
    const userId = context.params.userId;
    const body = await context.request.body().value;

    const { topScore, rank, period } = body;

    if (!topScore || !rank || !period) {
      context.response.status = 400;
      context.response.body = { error: "All fields are required" };
      return;
    }

    try {
      const leaderboardCollection = leaderboardDb.collection("leaderboard");
      const updatedEntry = {
        topScore,
        rank,
        period,
        timestamp: new Date()
      };
      const { matchedCount } = await leaderboardCollection.updateOne(
        { userId },
        { $set: updatedEntry }
      );

      if (matchedCount === 0) {
        context.response.status = 404;
        context.response.body = { error: "Leaderboard entry not found" };
        return;
      }

      context.response.body = { message: "Leaderboard entry updated successfully" };
    } catch (error) {
      context.response.status = 500;
      context.response.body = { error: "Internal Server Error" };
    }
  });

  // Fetch all users from a specific leaderboard theme and period
  router.get("/api/leaderboards/:theme/:period", async (context) => {
    const theme = context.params.theme;
    const period = context.params.period;

    try {
      const leaderboardCollection = leaderboardDb.collection(theme); // Access the correct leaderboard collection
      const users = await leaderboardCollection.find({ period }).toArray();

      if (users.length === 0) {
        context.response.status = 403;
        context.response.body = { message: "No users found for the specified theme and period" };
        return;
      }

      // Retrieve user details from Users DB based on user IDs in the leaderboard
      const userIds = users.map(user => user.userId);
      const usersCollections = ["UsersAC", "UsersDF", "UsersGI", "UsersJL", "UsersMZ"];
      let userDetails = [];

      for (const collectionName of usersCollections) {
        const usersCollection = usersDb.collection(collectionName);
        const details = await usersCollection.find({ _id: { $in: userIds } }).toArray();
        if (details.length > 0) {
          userDetails = details;
          break;
        }
      }

      // Sort users by topScore in descending order and calculate placement
      users.sort((a, b) => b.topScore - a.topScore);
      users.forEach((user, index) => {
        user.placement = index + 1;
      });

      // Map leaderboard entries with user details
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
      context.response.status = 500;
      context.response.body = { error: "Internal Server Error" };
    }
  });

  return router;
};