const User = require("../models/User");
const { dp } = require("./helpers");

const deleteUsersData = async () => {
  try {
    await User.deleteMany({}, callback);
  } catch (err) {
    dp(err);
  }
};

deleteUsersData();
