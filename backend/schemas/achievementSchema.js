export const achievementSchema = {
  _id: { type: "ObjectId", required: true }, // MongoDB ObjectId
  name: { type: "string", required: true }, // Name of the achievement
  description: { type: "string", required: true }, // Description of what the achievement entails
};