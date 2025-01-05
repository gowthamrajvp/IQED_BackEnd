const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const IQUserModel = require("../models/User/IQUser.model");
const router = express.Router();

async function Createbulkusers(req, res) {
  const users = req.body.users;

  if (!Array.isArray(users) || users.length === 0) {
    return res.status(400).json({ error: "Invalid input, users array required." });
  }
  try {
    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return { ...user, password: hashedPassword };
      })
    );
    const createdUsers = await IQUserModel.insertMany(hashedUsers);
    res.status(201).json({ message: "Users created successfully", users: createdUsers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function IQUserVerify(req, res){
  const { username, password } = req.body;
  console.log(req.body)
  if (!username || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }
  
  try {
    const user = await IQUserModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials." });
    }
    if (user.isComplated) {
      return res.status(400).json({ error: "You Already completed" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateIQ(req, res) {
  const { userId,iqId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid user ID." });
  }

  if (!mongoose.Types.ObjectId.isValid(iqId)) {
    return res.status(400).json({ error: "Invalid QuizSession ID." });
  }

  try {
    const updatedUser = await IQUserModel.findByIdAndUpdate(
      userId,
      { Iq: iqId,isComplated:true },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({ message: "IQ updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  Createbulkusers,
  IQUserVerify,
  updateIQ,  
};