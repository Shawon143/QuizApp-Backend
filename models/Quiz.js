const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuizSchema = new Schema(
  {
    category: { type: String, required: true }, // New category field
    title: { type: String, required: true },
    questions: [
      {
        question: { type: String, required: true },
        options: [String],
        answer: { type: String, required: true },
      },
    ],
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model("Quiz", QuizSchema);
