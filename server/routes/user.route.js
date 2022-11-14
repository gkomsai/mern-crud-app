const express = require("express");
const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const { UserModel } = require("../models/userModel.js");
const { emailValidator } = require("../middleware/emailValidator.js");
const { passwordValidator } = require("../middleware/passwordValidator.js");
const {loginController,signupController} = require("../controller/userController.js");


const userRouter = Router();



userRouter.post("/signup",[emailValidator, passwordValidator], signupController);

userRouter.post("/login", [emailValidator, passwordValidator], loginController);



module.exports = { userRouter };
