import { model, Schema } from "npm:mongoose@^8.7";

const LeaderboardSchema = new Schema({
  playerId: {
    type: "objectId or string",
    required: true,
    unique: true
  },
  score: {
    type: "number",
    required: true
  },
  rank: {
    type: "number",
    required: true
  },
  timestamp: {
    type: "date",
    default: () => new Date()
  },
  period: {
    type: "string",
    enum: ['daily', 'monthly', 'allTime'],
    required: true,
  }
});

const Leaderboard = model("Leaderboard", LeaderboardSchema);

export { Leaderboard };
