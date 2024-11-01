export const userSchema = {
  _id: { type: "ObjectId", required: true }, // MongoDB ObjectId
  username: { type: "string", required: true, unique: true },
  email: { type: "string", required: true, unique: true },
  password: { type: "string", required: true }, // Hashed password for security
  themes: {
    type: "array",
    items: {
      type: "object",
      properties: {
        theme: { type: "string", required: true }, // Theme name (e.g., "Music")
        rank: { type: "string", required: true }, // User's rank for the theme
        currentScore: { type: "number", required: true }, // User's current score for the theme
      },
    },
  },
  achievements: {
    type: "array",
    items: {
      type: "object",
      properties: {
        achievementId: { type: "ObjectId", required: true }, // Reference to achievement document
        dateEarned: { type: "date", required: true }, // Date achievement was earned
      },
    },
  },
  createdAt: { type: "date", default: () => new Date() }, // Creation timestamp
};
