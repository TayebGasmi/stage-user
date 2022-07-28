const verfieDoc = (Model) => {
  return async (req, res, nxt) => {
    try {
      const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
      if (!isValid) return res.status(400).json({ error: "invalid params" });
      let document = await Model.findById(req.params.id)
        .select({ owner: 1 })
        .lean()
        .exec();
      if (!document) return res.status(400).json("! wrong params");
      nxt();
    } catch (err) {
      return res.status(500).json({ error: error.message });
    }
  };
};
module.exports = { verfieDoc };
