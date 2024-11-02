import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";

const router = new Router();

export default (questionsDb) => {
  router.get("/api/questions", async (context) => {
    const theme = context.request.url.searchParams.get("theme");
    const difficulty = context.request.url.searchParams.get("difficulty");
    const limitParam = context.request.url.searchParams.get("limit");

    // Convert limit to an integer or set a default value
    const limit = limitParam ? parseInt(limitParam, 10) : 10; // default to 10 if limit is not provided
    if (isNaN(limit) || limit <= 0) {
      context.response.status = 400;
      context.response.body = { error: "Limit must be a positive number" };
      return;
    }

    if (!theme || !difficulty) {
      context.response.status = 400;
      context.response.body = { error: "Theme and difficulty are required" };
      return;
    }

    try {
      // Select collection based on theme
      const questionsCollection = questionsDb.collection(theme);
      const questions = await questionsCollection
        .find({ theme, difficulty })
        .limit(limit)
        .toArray();
      context.response.body = questions;
    } catch (error) {
      context.response.status = 500;
      context.response.body = { error: "Internal Server Error" };
    }
  });

  return router;
};
