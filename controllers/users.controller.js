require("dotenv").config();
const fs = require("fs");
const bcrypt = require("bcrypt");
const { User } = require("../models/users.schema");
const jwt = require("jsonwebtoken");
const hashedPasswordGenerator = (password) => {
  return bcrypt.hashSync(password, 10);
};

exports.userSignUp = async (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = hashedPasswordGenerator(password);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
    });
    // Save the new user to the database
    await newUser.save();
    const token = jwt.sign(newUser.email, process.env.SECRET_KEY);

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser, token });
  } catch (err) {
    console.log(err);
  }
};

exports.userLogIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  // Check if the password is correct
  let isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid password" });
  }
  const token = jwt.sign(user.email, process.env.SECRET_KEY);
  // If user exists and password is correct, login successful
  res.status(200).json({ message: "Login successful", user, token });
};
