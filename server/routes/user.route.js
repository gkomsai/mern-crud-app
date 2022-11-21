const express = require("express");
const { Router } = require("express");




const { emailValidator } = require("../middleware/emailValidator.js");
const { passwordValidator } = require("../middleware/passwordValidator.js");
const {loginController,signupController} = require("../controller/userController.js");
const { emailPassRequiredValidator } = require("../middleware/emailPasswordRequiredValidator.js");


const userRouter = Router();



userRouter.post("/signup",[emailPassRequiredValidator, emailValidator, passwordValidator], signupController);

userRouter.post("/login", [emailPassRequiredValidator, emailValidator, passwordValidator], loginController);



module.exports = { userRouter };
