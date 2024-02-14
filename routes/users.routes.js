const express = require("express");
const { userLogIn, userSignUp } = require("../controllers/controller");
const {validateRequest} = require('../middleware/validation');

const router = express.Router();

router.route("/signup").post(validateRequest,userSignUp);
router.route("/login").post(userLogIn);
// router.route("/reset-password").post(resetPassword);
// router.route("forget-password").post(forgetPass);

module.exports={
    router
}
