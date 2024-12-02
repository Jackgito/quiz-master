import { model, Schema } from "npm:mongoose@^8.7";

const UserSchema = new Schema ({
  username: { type: "string", required: true, unique: true },
  email: { type: "string", required: true, unique: true },
  password: { type: "string", required: true }, // Hashed password for security
  createdAt: { type: "date", default: () => new Date() }, // Creation timestamp
  profilePicture: { type: "string", default: "default.png" }, // File path to user's profile picture
  totalScore: { type: "number", default: 0 }, // Total score across all themes
  totalWins: { type: "number", default: 0 }, // Total number of wins across all themes
  themes: { type: "array", default: [] }, // Array of user's themes
  achievements: { type: "array", default: [] }, // Array of user's achievements
  
  // themes: {
  //   type: "array",
  //   items: {
  //     type: "object",
  //     properties: {
  //       theme: { type: "string", required: true }, // Theme name (e.g., "Music")
  //       rank: { type: "string", required: true }, // User's rank for the theme
  //       currentScore: { type: "number", required: true }, // User's current score for the theme
  //     },
  //   },
  // },
  // achievements: {
  //   type: "array",
  //   items: {
  //     type: "object",
  //     properties: {
  //       achievementId: { type: "ObjectId", required: true }, // Reference to achievement document
  //       dateEarned: { type: "date", required: true }, // Date achievement was earned
  //     },
  //   },
  // },
});

const User = model("User", UserSchema);

export { User };
