import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ScreenSchema = new Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Project is required."],
    ref: "Project",
  },
  name: { type: String, required: [true, "Name is required."] },
  preview: { type: String, required: false },
});

ScreenSchema.set("timestamps", true);

const Screen = mongoose.model("Screen", ScreenSchema);

export default Screen;
