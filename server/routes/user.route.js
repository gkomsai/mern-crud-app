const express = require("express");
const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { checkUserAuth } = require("../middleware/authMiddleware.js");
const { UserModel } = require("../models/userModel.js");

const userRouter = Router();

/* ------------------ SignUp Logic----------------------------------- */

userRouter.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const isEmailPresent = await UserModel.findOne({ email });
  // console.log(isEmailPresent);
  if (isEmailPresent) {
    res.send("already signUp");
  } else {
    bcrypt
      .hash(password, 10)
      .then(async function (hash) {
        const newUser = new UserModel({ ...req.body, password: hash });
        await newUser.save();
        return res
          .status(201)
          .json({
            message: "successfully signUp in the database",
            status: "Success",
            user: newUser,
          });
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  console.log(user);
  let hash = user?.password;
  bcrypt.compare(password, hash, function (err, result) {
    if (err) {
      res.send({
        message: "Something went wrong, plz try again later",
        status: "Failed",
      }); 
    }
    if (result) {
    
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });
      res
        .status(200)
        .send({ message: "Login Success", token: token, user: user });
    } else {
      res.status(400).send("login failed, Invalid Credentials");
    }
  });
});

module.exports = { userRouter };
