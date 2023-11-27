const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is Required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    image: {
      type: String,
      description: [true, "Image is Required"],
    },
    user: {
      // Getting the user from the userModel
      type: mongoose.Types.ObjectId,
      ref: "User",
      require: [true, "User Id is required"],
    },
  },
  {
    timestamps: true,
  }
);

//Varibale to export
//BlogSchema is the reference
const blogModel = mongoose.model("Blog", blogSchema);

module.exports = blogModel;
