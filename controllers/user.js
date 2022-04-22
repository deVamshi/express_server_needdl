const { dp } = require("../misc/helpers");
const User = require("../models/User");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

// Dev controllers: The controllers that are used for the development purpose only

const getAllUsers = asyncWrapper(async (req, res) => {
  const users = await User.find();
  res.status(201).json({ users: users ? users : [] });
});

const deleteAllUsers = asyncWrapper(async (req, res) => {
  await User.deleteMany({});
  res.status(201).json({ msg: "All user's data has been deleted" });
});

// The endpoints that will be used in production

const createUser = asyncWrapper(async (req, res, next) => {
  const isUserFound = await User.exists({ email: req.body.email });

  if (isUserFound) {
    return next(createCustomError("User already exists, Please login", 400));
  }

  const user = await User.create(req.body);
  res.status(201).json({ user, msg: "User Created successfully" });
});

const loginUser = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(createCustomError("Invalid email or password", 404));

  const user = await User.findOne({ email });

  if (!user)
    return next(createCustomError("No user found with that email", 404));

  if (user.password !== password) {
    return next(createCustomError("Invalid password", 404));
  }

  res.status(201).json({ user, msg: "Successfully logged in" });
});

module.exports = {
  getAllUsers,
  deleteAllUsers,
  loginUser,
  createUser,
};
