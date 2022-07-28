var express = require("express");
var router = express.Router();
var adminRouter = require("./router.admin");
const authRouter = require("./router.auth");
router.get("/", (req, res) => {
  res.status(200).json("Backend server working properly! 🙌 ");
});
router.use("/auth", authRouter);
router.use("/admins", adminRouter);
module.exports = router;
