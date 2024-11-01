import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";

const router = new Router();

export default (leaderboardDb) => {
  // Add a new leaderboard entry
  router.post("/api/leaderboards", async (context) => {
    const body = await context.request.body().value;

    const { playerId, score, rank, period } = body;

    if (!playerId || !score || !rank || !period) {
      context.response.status = 400;
      context.response.body = { error: "All fields are required" };
      return;
    }

    try {
      const leaderboardCollection = leaderboardDb.collection("leaderboard");
      const newEntry = {
        playerId,
        score,
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
  router.put("/api/leaderboards/:playerId", async (context) => {
    const playerId = context.params.playerId;
    const body = await context.request.body().value;

    const { score, rank, period } = body;

    if (!score || !rank || !period) {
      context.response.status = 400;
      context.response.body = { error: "All fields are required" };
      return;
    }

    try {
      const leaderboardCollection = leaderboardDb.collection("leaderboard");
      const updatedEntry = {
        score,
        rank,
        period,
        timestamp: new Date()
      };
      const { matchedCount } = await leaderboardCollection.updateOne(
        { playerId },
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

  // Fetch all players from a specific leaderboard theme and period
  router.get("/api/leaderboards/:theme/:period", async (context) => {
    const theme = context.params.theme;
    const period = context.params.period;

    try {
      const leaderboardCollection = leaderboardDb.collection(theme); // Ensure the collection name is correct
      const players = await leaderboardCollection.find({ period }).toArray();

      if (players.length === 0) {
        context.response.status = 403;
        context.response.body = { message: "No players found for the specified theme and period" };
        return;
      }

      context.response.status = 200;
      context.response.body = players;
    } catch (error) {
      context.response.status = 500;
      context.response.body = { error: "Internal Server Error" };
    }
  });

  return router;
};