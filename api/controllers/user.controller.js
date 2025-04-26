import User from "../models/user.model.js";
import nodemailer from "nodemailer";
import Jwt from "jsonwebtoken";

// Register a new user
export const registerUser = async (req, res, next) => {
  const { username, email, mobile, address, password } = req.body;

  const newUser = new User({ username, email, mobile, address, password });

  try {
    await newUser.save();

    // Send welcome email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to TrendByte!",
      text: `Hi ${username}, welcome to TrendByte!`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json("User registered successfully");
  } catch (error) {
    console.error("Error in sendOtp:", error);
    res.status(500).json({ message: "Failed to send OTP. Please try again later." });
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    console.log("Reset password request received for email:", email);
    console.log("Reset password request received for email:", email);
    const user = await User.findOne({ email });
    console.log("User found:", user ? user.email : "No user found");
    console.log("User found:", user ? user.email : "No user found");
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    next(error);
  }
};

export const sendOtp = async (req, res, next) => {
  const { email } = req.body;

  try {
    console.log("Received request to send OTP for email:", email);
    const user = await User.findOne({ email });
    console.log("User found:", user ? user.email : "No user found");
    if (!user) return res.status(404).json("User not found");

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiration = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    console.log("Generated OTP:", otp);
    user.otp = otp;
    console.log("OTP expiration time:", otpExpiration);
    user.otpExpiration = otpExpiration;
    console.log("Saving OTP to the database...");
    await user.save();
    console.log("OTP saved successfully.");

    console.log("Generating OTP...");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}`,
    };

    console.log("Sending email...");
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");

    res.status(200).json("OTP sent to your email");
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  const { email, otp, newPassword } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.error("User not found for email:", email);
      return res.status(404).json("User not found");
    }

    // Validate OTP
    console.log("Validating OTP...");
    if (user.otp !== otp) {
      console.error("Invalid OTP for user:", email);
      return res.status(400).json("Invalid OTP");
    }

    if (user.otpExpiration < Date.now()) {
      console.error("Expired OTP for user:", email);
      return res.status(400).json("Expired OTP");
    }

    // Hash the new password
    console.log("Hashing new password...");
    const bcrypt = await import("bcryptjs");
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Clear OTP and expiration
    user.otp = null;
    user.otpExpiration = null;

    // Save the updated user
    console.log("Saving updated user...");
    await user.save();

    console.log("Password reset successfully for user:", email);
    res.status(200).json("Password reset successfully");
  } catch (error) {
    console.error("Error during password reset:", error);
    next(error);
  }
};

// Get all users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, { password: 0 }); // Exclude the password field
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// Get user by ID
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(errorHandler(404, "User not found"));
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// Update user details
export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

// Delete a user
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id); // Delete the user by ID
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Sign out user
export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};
