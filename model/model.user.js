const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");
const bcrypt = require("bcrypt");
const userSchema = new Schema(
  {
    firstName: { required: true, type: String, max: 255 },
    lastName: { required: true, type: String, max: 255 },
    password: { required: true, type: String, min: 8, max: 1024 },
    email: { required: true, type: String, unique: true },
    birthDate: { required: true, type: Date },
    gender: { required: true, type: String, enum: ["female", "male"] },
    role: {
      required: true,
      type: String,
      enum: ["admin", "premium", "user"],
    },
    isBlocked: { type: Boolean, default: false },
    phone: { type: Number },
  },
  { timestamps: true }
);
userSchema.methods.matchPassword = async function (password) {
  try {
    const match = await bcrypt.compare(password, this.password);
    return match;
  } catch (err) {
    throw err;
  }
};
userSchema.virtual("fullName").get(function () {
  return this.firstName + " " + this.lastName;
});
userSchema.pre("save", async function (nxt) {
  try {
    if (!this.isModified("password")) return nxt();
    this.password = await bcrypt.hash(this.password, 10);
    return nxt();
  } catch (err) {
    throw err;
  }
});
userSchema.plugin(mongooseLeanVirtuals);
const Users = mongoose.model("users", userSchema);
module.exports = Users;
