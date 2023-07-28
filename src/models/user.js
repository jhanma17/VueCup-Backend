import mongoose from "mongoose";

const Schema = mongoose.Schema;

const uniqueValidator = require('mongoose-unique-validator');

const roles = {
  values: ["user", "admin"],
  message: "{VALUE} is not a valid role.",
};

const UserSchema = new Schema({
  name: { type: String, required: [true, "Name is required."]},
  email: { type: String, required: [true, "Email is required."], unique: true},
  password: { type: String, required: [true, "Password is required."]},
  date: { type: Date, default: Date.now },
  role: { type: String, default: "user", enum: roles },
  active: { type: Boolean, default: false },
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