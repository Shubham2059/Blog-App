const mongoose = require("mongoose");
const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");

//GET all the blogs
exports.getAllBlogsController = async (req, res) => {
  try {
    const blogs = await blogModel.find({}).populate("user");
    if (!blogs) {
      return res.status(200).send({
        success: false,
        message: "No Blog Found",
      });
    }
    return res.status(200).send({
      success: true,
      BlogCount: blogs.length,
      message: "All Blogs Lists",
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while getting blogs",
      error,
    });
  }
};

//POST new Blog
exports.createBlogController = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;
    //validation
    if (!title || !description || !image || !user) {
      return res.status(400).send({
        success: false,
        message: "Please provide all the fields",
      });
    }
    const existingUser = await userModel.findById(user);
    //validation
    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: "Unable to find User",
      });
    }

    const newBlog = new blogModel({ title, description, image, user });
    //Starting a session
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });
    await session.commitTransaction();
    await newBlog.save();
    return res.status(201).send({
      success: true,
      message: "Blog Created",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Unable to create a new Blog",
      error,
    });
  }
};

//PUT update an existing blog
exports.updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Blog Updated",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Something went wront, try again!",
      error,
    });
  }
};

//GET fetch a single blog
exports.getBlogByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findByIdAndUpdate(id);
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog Not Found with this id",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Fetching Single Blog",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while getting the blog",
      error,
    });
  }
};

//DELETE a blog
exports.deleteBlogController = async (req, res) => {
  try {
    //below three lines is used to fetch the blog from the blogs array, remove it from the array and also save the array after the deletion.
    const blog = await blogModel
      .findOneAndDelete(req.params.id)
      .populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
    return res.status(200).send({
      success: true,
      message: "Blog Deleted!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while deleting the blog",
      error,
    });
  }
};

//GET the blogs from the particular user
exports.userBlogController = async (req, res) => {
  try {
    const userBlog = await userModel.findById(req.params.id).populate("blogs");
    if (!userBlog) {
      return res.status(404).send({
        success: false,
        message: "Blogs Not Found With This Id",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Blogs Found!",
      userBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};
