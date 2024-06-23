const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");
const { auth, isAdmin } = require("./auth");

// Get all quizzes
router.get("/quizzes", async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific quiz by ID
router.get("/quizzes/:id", async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) throw new Error("Quiz not found");
    res.json(quiz);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// Create a new quiz
router.post("/quizzes", auth, isAdmin, async (req, res) => {
  const quiz = new Quiz(req.body);
  try {
    const savedQuiz = await quiz.save();
    res.status(201).json(savedQuiz);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a quiz by ID
router.put("/quizzes/:id", auth, isAdmin, async (req, res) => {
  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedQuiz) throw new Error("Quiz not found");
    res.json(updatedQuiz);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a quiz by ID
router.delete("/quizzes/:id", auth, isAdmin, async (req, res) => {
  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!deletedQuiz) throw new Error("Quiz not found");
    res.json({ message: "Quiz deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
