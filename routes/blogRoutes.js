const express = require("express");
const {
  getAllBlogsController,
  createBlogController,
  updateBlogController,
  getBlogByIdController,
  deleteBlogController,
  userBlogController,
} = require("../controllers/blogController");

//router object
const router = express.Router();

//routes
//GET || all blogs
router.get("/all-blog", getAllBlogsController);

//POST || create blog
router.post("/create-blog", createBlogController);

//PUT || Update blog
//On the basis of the id we update it
router.put("/update-blog/:id", updateBlogController);

//GET || Get single blog
router.get("/get-blog/:id", getBlogByIdController);

//DELETE || delete blog
//Ont the basis of the id
router.delete("/delete-blog/:id", deleteBlogController);

//GET || User blog
router.get("/user-blog/:id", userBlogController);

module.exports = router;
