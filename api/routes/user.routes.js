import express from "express";
import { registerUser, getAllUsers, getUserById, updateUser, deleteUser, signOut, sendOtp, resetPassword, signin } from "../controllers/user.controller.js";

const router = express.Router();

// Register a new user
router.post("/register", registerUser);


router.post("/signin", signin);

// Get all users
router.get("/users", getAllUsers);



// Get user by ID
router.get("/user/:id", getUserById);



// Update user details
router.put("/update/:id", updateUser);

// Delete a user
router.delete("/user/:id", deleteUser);

// Sign out user
router.get("/signout", signOut);

router.post("/send-otp", sendOtp);
router.post("/users/reset-password", resetPassword);

router.get("/test", (req, res) => {
  res.status(200).json({ message: "Test route is working" });
});

export default router;
