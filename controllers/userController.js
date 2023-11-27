const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

//Create user/register user
exports.registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //Validation
    if (!username || !email || !password) {
      res.status(400).send({
        success: false,
        message: "Please fill all the fields",
      });
    }
    //Existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(401).send({
        message: "User Already Exists",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    //save new user
    const user = new userModel({ username, email, password: hashedPassword });
    await user.save();
    return res.status(201).send({
      success: true,
      message: "New User Created",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in register callback",
      success: false,
      error,
    });
  }
};

//Get All the users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).send({
      userCount: users.length,
      success: true,
      message: "All Users data",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getting all the users",
      error,
    });
  }
};

//Login
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "Invalid Login Credentials",
      });
    }
    //email validation
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "Email is Not Registerd",
      });
    }
    //password validation
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Inavlid Email or Password",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Login successful",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in login callback",
      error,
    });
  }
};
