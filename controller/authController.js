const { hashPassword, comparePassword } = require("../helpers/authHelper.js");
const userModel = require("../models/userModel.js");
const JWT = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;

    //validation / doğrulama

    if (!name) {
      return res.send({ message: "Name is required" });
    } else if (!email) {
      return res.send({ message: "Email is required" });
    } else if (!password) {
      return res.send({ message: "Password is required" });
    } else if (!phone) {
      return res.send({ message: "Phone number is required" });
    } else if (!address) {
      return res.send({ message: "Address is required" });
    } else if (!answer) {
      return res.send({ message: "Answer is required" });
    }

    // existing user check

    const existingUser = await userModel.findOne({ email });
    // if user exists then return error / eğer kullanıcı varsa hata döndür

    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "Already registered, please log in.",
      });
    }
    // register user
    const hashedPassword = await hashPassword(password);
    const newUser = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    });

    newUser.save();

    res.status(201).send({
      success: true,
      message: "User registered successfully.",
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    // doğrulama
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "email is not registered",
      });
    }

    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(404).send({
        success: false,
        message: "invalid password",
      });
    }

    // token

    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in login",
      error: error,
    });
  }
};

// forgotPasswordController

const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }
    if (!answer) {
      return res.status(400).send({ message: "Answer is required" });
    }
    if (!newPassword) {
      return res.status(400).send({ message: "New password is required" });
    }

    // check question

    const user = await userModel.findOne({ email, answer });

    //validaiton

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong email or Answer.",
      });
    }

    const hashed = await hashPassword(newPassword);

    await userModel.findByIdAndUpdate(user._id, { $set: { password: hashed } });

    return res.status(200).send({
      success: true,
      message: "Password Reset successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Something went wrong.",
      error,
    });
  }
};

const testController = (req, res) => {
  res.send("Protected Route");
};
module.exports = {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
};
