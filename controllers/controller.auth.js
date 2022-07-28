const Users = require("../model/model.user");
var mongoose = require("mongoose");
const signUp = async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email })
      .select({ email: 1 })
      .lean();
    if (user) {
      return res
        .status(400)
        .json({ error: { path: "email", msg: "email already registred" } });
    }
    const newUser = new Users({ ...req.body, role: "user" });
    await newUser.save();
    return res.status(200).json(newUser);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
const signIn = async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email }).lean();
    if (!user) {
      return res.status(400).json({ error: "email unregistred" });
    }
    const match = await user.matchPassword(req.body.password);
    if (!match) {
      return res.status(400).json({ error: "wrong password or email" });
    }
    if (user.isBlocked) {
      return res.status(400).json({ error: "blocked account" });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "15d",
      }
    );
    return res.status(200).json({ token, user });
  } catch (err) {
    return res
      .status(500)
      .json({ error: { path: "server", msg: err.message } });
  }
};
module.exports = {
  signUp,
  signIn,
};
