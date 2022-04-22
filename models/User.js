const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name must be provided"],
  },

  phoneNumber: {
    type: String,
    required: [true, "Phone Number is required"],
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },

  password: {
    type: String,
    required: [true, "Please provide password"],
    minLength: 6,
  },

  userType: {
    type: String,
    required: true,
    enum: {
      values: ["u", "w", "s"],
      message: "{VALUE} is not a valid user type",
    },
  },
});

module.exports = mongoose.model("user", UserSchema);
