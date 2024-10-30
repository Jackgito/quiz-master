import { Router } from "https://deno.land/x/oak/mod.ts";

const achievementRoutes = (achievementsCollection) => {
  const router = new Router();

  // Fetch all achievements
  router.get("/achievements", async (ctx) => {
    const achievements = await achievementsCollection.find().toArray();
    ctx.response.body = achievements;
  });

  return router;
};

export default achievementRoutes;