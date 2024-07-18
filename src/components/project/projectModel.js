import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Owner is required."],
    ref: "User",
  },
  name: { type: String, required: [true, "Name is required."] },
  height: { type: Number, required: [true, "Height is required."] },
  width: { type: Number, required: [true, "Width is required."] },
  preview: { type: String, required: false },
});

ProjectSchema.set("timestamps", true);

const Project = mongoose.model("Project", ProjectSchema);

export default Project;
