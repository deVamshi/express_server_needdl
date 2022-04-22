const router = require("express").Router();
const {
  deleteAllUsers,
  createUser,
  getAllUsers,
  loginUser,
} = require("../controllers/user");

// Dev endpoints

router.get("/", getAllUsers);
router.delete("/", deleteAllUsers);

// Actual endpoints
router.post("/create", createUser);
router.post("/login", loginUser);

module.exports = router;
