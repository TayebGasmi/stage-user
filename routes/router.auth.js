const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const {
  userValidator,
  loginValidator,
} = require("../validator/validator.user");
const { signUp, signIn } = require("../controllers/controller.auth");
router.post("/", validate(userValidator), signUp);
router.post("/login", validate(loginValidator), signIn);
module.exports = router;
