import mongoose from "mongoose";

const Schema = mongoose.Schema;

const uniqueValidator = require("mongoose-unique-validator");

const statuses = {
  values: ["ACTIVE", "INACTIVE"],
  message: "{VALUE} is not a valid status.",
};

const UserSchema = new Schema({
  name: { type: String, required: [true, "Name is required."] },
  email: { type: String, required: [true, "Email is required."], unique: true },
  password: { type: String, required: [true, "Password is required."] },
  date: { type: Date, default: Date.now },
  status: { type: String, default: "ACTIVE", enum: statuses },
});

UserSchema.plugin(uniqueValidator, { message: "{PATH} must be unique." });

UserSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

const User = mongoose.model("User", UserSchema);

export default User;
