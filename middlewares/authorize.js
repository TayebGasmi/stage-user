const jwt = require("jsonwebtoken");
const UserModel = require("../model/model.user");
exports.authorize = (roles) => async (req, res, next) => {
  if (req.headers["x-access-token"] || req.headers.authorization)
    return res.status(401).json("unathurozied");
  let token = req.headers["x-access-token"] || req.headers.authorization;
  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  } else return res.status(401).json("unathurozied");
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    if ("role" in data) {
      const user = await UserModel.findOne({
        _id: data.id || data._id,
        role: data.role,
      }).lean();
      if (!user)
        return res.status(400).json({ message: "verify your informations! " });
      if (roles.indexOf(user.role) === -1)
        return res.status(401).json({ message: "unathorized! " });
      req.user = user;
      req.role = user.role;
      next();
    } else res.status(404).json({ message: "Not found!" });
  } catch (error) {
    res.status(401).json({ message: "you are not authorized to do this!" });
  }
};
