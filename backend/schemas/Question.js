import { model, Schema } from "npm:mongoose@^8.7";

const QuestionSchema = new Schema({
  _id: { type: "ObjectId", required: true }, // MongoDB ObjectId
  questionText: { type: "string", required: true }, // Text of the question
  options: {
    type: "array",
    items: {
      type: "string",
      required: true,
    },
    minItems: 2, // Minimum number of options
  },
  correctAnswer: { type: "string", required: true }, // The correct answer, should match one of the options
  createdAt: { type: "date", default: () => new Date() }, // Creation timestamp
  updatedAt: { type: "date", default: () => new Date() }, // Update timestamp
});

const Question = model("Question", QuestionSchema);

export { Question };