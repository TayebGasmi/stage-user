const Users = require("../model/model.user");
const blockUser = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    user.isBlocked = true;
    await user.save();
    return res.status(200).json("blocked");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const unblockUser = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    user.isBlocked = false;
    await user.save();
    return res.status(200).json("unblocked");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getBlokcedUser = async (req, res) => {
  try {
    const users = await Users.find({ isBlocked: true })
      .select(userDetails)
      .lean();
    if (users.length === 0) return res.status(204).json(users);
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ error: error.message });
  }
};
const deleteUser = async (req, res) => {
  try {
    await Users.findByIdAndDelete(req.params.id);
    return res.status(200).json("deleted");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const addUser = async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email })
      .select({ email: 1 })
      .lean();
    if (user) {
      return res
        .status(400)
        .json({ error: { path: "email", msg: "email already registred" } });
    }
    const newUser = new Users({ ...req.body });
    await newUser.save();
    return res.status(200).json(newUser);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
const getAllUser = async (req, res) => {
  try {
    const users = await Users.find().lean();
    if (users.length === 0) {
      return res.status(204).json(users);
    }
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
module.exports = {
  blockUser,
  unblockUser,
  getBlokcedUser,
  deleteUser,
  getAllUser,
};
