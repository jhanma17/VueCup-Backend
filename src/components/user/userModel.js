import mongoose from "mongoose";

const Schema = mongoose.Schema;

const uniqueValidator = require("mongoose-unique-validator");

const statuses = {
  values: ["ACTIVE", "INACTIVE"],
  message: "{VALUE} is not a valid status.",
};

const loginTypes = {
  values: ["EMAIL", "GITHUB", "GOOGLE", "GITLAB"],
  message: "{VALUE} is not a valid login type.",
};

const UserSchema = new Schema({
  name: { type: String, required: [true, "Name is required."] },
  email: { type: String, required: [true, "Email is required."], unique: true },
  date: { type: Date, default: Date.now },
  status: { type: String, default: "ACTIVE", enum: statuses },
  loginType: { type: String, default: "EMAIL", enum: loginTypes },
});

UserSchema.plugin(uniqueValidator, { message: "{PATH} must be unique." });

const User = mongoose.model("User", UserSchema);

export default User;
