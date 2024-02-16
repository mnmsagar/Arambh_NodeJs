const express = require("express");
const { userLogIn, userSignUp } = require("../controllers/users.controller");
const {validateRequest} = require('../middleware/validation');

const userRouter = express.Router();

userRouter.route("/signup").post(userSignUp);
userRouter.route("/login").post(userLogIn);
// userRouter.route("/reset-password").post(resetPassword);
// userRouter.route("forget-password").post(forgetPass);

module.exports={
    userRouter
}
