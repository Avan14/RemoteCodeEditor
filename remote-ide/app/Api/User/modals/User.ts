import mongoose from "mongoose";

const FileFolderSchema = new mongoose.Schema({
  id: String,
  name: String,
  type: {
    type: String,
    enum: ["File", "Folder"],
    required: true,
  },
  code: String,
  children: [mongoose.Schema.Types.Mixed], // placeholder to allow nesting
});

// This sets children as an array of the same schema (recursive)
FileFolderSchema.add({
  children: [FileFolderSchema],
});

const ProjectSchema = new mongoose.Schema({
  project_id: String,
  name: String,
  type: String,
  date: Date,
  language: String,
  folder: FileFolderSchema,
});

const UserSchema = new mongoose.Schema({
  id: String,
  name: String,
  projects: [ProjectSchema],
});

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);

export default UserModel;
