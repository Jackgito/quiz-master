import mongoose from "npm:mongoose@^8.7";
const { ObjectId } = mongoose.Types;

// Transform an array of strings to an array of ObjectIds
export function transformToObjectId(userId) {
  try {
    return new ObjectId(userId);
  } catch (error) {
    console.error("Invalid userId format:", userId);
    throw new Error("Invalid user ID format");
  }
}