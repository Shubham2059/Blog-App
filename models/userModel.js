const mongoose = require("mongoose");

//Design a schema to define what value is needed

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "UserName Is Required"],
    },
    email: {
      type: String,
      required: [true, "Email Is Required"],
    },
    password: {
      type: String,
      required: [true, "Password Is Required"],
    },
    blogs: [
      {
        //Getting the blogs from the userModel
        type: mongoose.Types.ObjectId,
        ref: "Blog",
      },
    ],
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
