import User from "../models/user.model.js";
import Jwt from "jsonwebtoken";

// Register a new user
export const registerUser = async (req, res, next) => {
  const { username, email, mobile, address, password } = req.body;




  const newUser = new User({ username, email, mobile, address, password });

  try {
    await newUser.save();
    res.status(201).json('User registered successfully');
  } catch (error) {
    next(error);
  }
};

// Sign in user
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
<<<<<<< HEAD
    if (!validUser) return next(errorHandler(404, 'User not found'));

    if (password !== validUser.password) return next(errorHandler(401, 'Wrong Credentials!'));

    const token = Jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

=======
    if (!validUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (password !== validUser.password) return next(errorHandler(401, 'Wrong Credentials!'));

    const token = Jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

>>>>>>> Shalom
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
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

// Request account deletion
export const requestAccountDeletion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(
      id,
      { $set: { deleteRequest: true } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, message: "Delete request sent successfully" });
  } catch (error) {
    next(error);
  }
};

// Sign out user
export const signOut = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json('User has been logged out!');
  } catch (error) {
    next(error);
  }
};
<<<<<<< HEAD
=======

// Delete a user
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
>>>>>>> Shalom
