const { QuestionModel } = require("../models");

async function postQuestions(req, res) {
  try {
    const newQuestion = new QuestionModel(req.body);
    const savedQuestion = await newQuestion.save();
    return res.status(200).json({
      message: "Question post successfully!",
      data: savedQuestion,
    });
  } catch (error) {
    console.error("Error during authentication:", error);
    return res.status(500).send("An error occurred. Please try again.");
  }
}

async function putQuestions(req, res) {
  try {
    const updatedQuestion = await QuestionModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Return updated document & validate input
    );
    if (!updatedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }
    return res.status(200).json({
      message: "Updated successfully!",
      data: updatedQuestion,
    });
  } catch (error) {
    console.error("Error during authentication:", error);
    return res.status(500).send("An error occurred. Please try again.");
  }
}

async function deleteQuestions(req, res) {
  try {
    const deletedQuestion = await QuestionModel.findByIdAndDelete(
      req.params.id
    );
    if (!deletedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error("Error during authentication:", error);
    return res.status(500).send("An error occurred. Please try again.");
  }
}

async function getAllQuestions(req, res) {
  try {
    const questions = await QuestionModel.find().populate("topics");
    res
      .status(200)
      .json({ message: "Question get successfully", data: questions });
  } catch (error) {
    console.error("Error during authentication:", error);
    return res.status(500).send("An error occurred. Please try again.");
  }
}

async function getQuestions(req, res) {
  try {
    const question = await QuestionModel.findById(req.params.id).populate(
      "topics"
    );
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    res
      .status(200)
      .json({ message: "Question getbyId successfully", data: question });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).send("Internal server error");
  }
}

module.exports = {
  postQuestions,
  putQuestions,
  deleteQuestions,
  getAllQuestions,
  getQuestions,
};
