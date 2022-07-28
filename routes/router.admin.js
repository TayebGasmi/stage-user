var express = require("express");
var router = express.Router();
const Users = require("../model/model.user");
const { authorize } = require("../middlewares/authorize");
const {
  blockUser,
  unblockUser,
  getBlokcedUser,
} = require("../controllers/controller.admin");
/* GET users listing. */
router.get("/blocked", authorize(["admin"]), getBlokcedUser);
router.put("/block/:id", authorize(["admin"]), blockUser);
router.put("/unblock/:id", authorize(["admin"]), unblockUser);

module.exports = router;
