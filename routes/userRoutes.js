const express = require("express");
const {
  getAllUsers,
  registerController,
  loginController,
} = require("../controllers/userController");

//route object
const router = express.Router();

//Get all user : get
router.get("/all-users", getAllUsers);

//Create user : post
router.post("/register", registerController);

//Create Login : post
router.post("/login", loginController);

module.exports = router;
