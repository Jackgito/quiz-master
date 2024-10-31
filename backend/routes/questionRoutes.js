import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";

const router = new Router();

export default (questionsDb) => {
  router.get("/api/questions", async (context) => {
    const theme = context.request.url.searchParams.get("theme");
    const difficulty = context.request.url.searchParams.get("difficulty");

    if (!theme || !difficulty) {
      context.response.status = 400;
      context.response.body = { error: "Theme and difficulty are required" };
      return;
    }

    try {
      // Select collection based on theme
      const questionsCollection = questionsDb.collection(theme);
      const questions = await questionsCollection.find({ theme, difficulty }).toArray();
      context.response.body = questions;
    } catch (error) {
      context.response.status = 500;
      context.response.body = { error: "Internal Server Error" };
    }
  });

  return router;
};
