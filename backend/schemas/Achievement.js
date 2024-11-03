import { model, Schema } from "npm:mongoose@^8.7";

const AchievementSchema = new Schema = {
  name: { type: "string", required: true },
  description: { type: "string", required: true },
  // image: { type: "string", required: true },
};

const Achievement = model("Achievement", AchievementSchema);

export { Achievement };
