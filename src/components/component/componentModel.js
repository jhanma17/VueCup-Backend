import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ComponentSchema = new Schema({
  screen: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Screen is required."],
    ref: "Screen",
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Owner is required."],
    ref: "User",
  },
  name: { type: String, required: [true, "Name is required."] },
  type: { type: String, required: [true, "Type is required."] },
  props: { type: Object, required: false },
  father: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "Component",
  },
  isCustom: { type: Boolean, required: false },
});

ComponentSchema.set("timestamps", true);

const Component = mongoose.model("Component", ComponentSchema);

export default Component;
