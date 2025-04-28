import express from "express";
<<<<<<< HEAD
import { registerUser, signin, getAllUsers, getUserById, updateUser, deleteUser, signOut } from "../controllers/user.controller.js";
=======
// Re-enable requestAccountDeletion import
// Fix import for deleteUser and requestAccountDeletion
import { registerUser, signin, getAllUsers, getUserById, updateUser, signOut, requestAccountDeletion, deleteUser } from "../controllers/user.controller.js";
>>>>>>> Shalom

const router = express.Router();

// Register a new user
router.post("/register", registerUser);

// Sign in a user
router.post("/signin", signin);

// Get all users
router.get("/users", getAllUsers);



// Get user by ID
router.get("/user/:id", getUserById);



// Update user details
router.put("/update/:id", updateUser);

// Request account deletion
// Request account deletion
router.post("/request-delete/:id", requestAccountDeletion);

// Delete a user
// Delete a user
// Remove deleteUser route temporarily
router.delete("/user/:id", deleteUser);

// Sign out user
router.get("/signout", signOut);

export default router;
