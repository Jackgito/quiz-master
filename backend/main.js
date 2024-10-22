import { Application } from "https://deno.land/x/oak/mod.js";
import playerRoutes from "./routes/playerRoutes.js";  // Import your player API routes
import gameRoutes from "./routes/gameRoutes.js";      // Import your game session routes
import db from "./config/db.js";                      // Import your MongoDB connection setup

// Initialize the application
const app = new Application();

// Middleware to log the time each request takes (optional)
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.request.method} ${ctx.request.url} - ${ms}ms`);
});

// Register routes for players and game sessions
app.use(playerRoutes.routes());
app.use(playerRoutes.allowedMethods());

app.use(gameRoutes.routes());
app.use(gameRoutes.allowedMethods());

// Handle any uncaught errors in requests (optional)
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.error("Server Error:", err);
    ctx.response.status = 500;
    ctx.response.body = { message: "Internal Server Error" };
  }
});

console.log("Server is running on port 9000");
await app.listen({ port: 9000 });