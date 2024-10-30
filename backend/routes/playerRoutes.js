// routes/playerRoutes.js
import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";

const router = new Router();

export default (usersCollection) => {
  router.get("/players", async (context) => {
    // Fetch players from usersCollection
    const players = await usersCollection.find().toArray();
    context.response.body = players;
  });

  return router;
};