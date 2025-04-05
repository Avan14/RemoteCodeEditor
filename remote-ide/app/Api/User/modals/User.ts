import mongoose from "mongoose";
import { FileTreeType } from "../schema/types";


const FileTreeSchema = new mongoose.Schema<FileTreeType>({
    id: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, enum: ["Folder", "File"], required: true },
    code: { type: String},
    children: [{ type: mongoose.Schema.Types.Mixed }]
}, { _id: false });

FileTreeSchema.add({ children: [FileTreeSchema] });

const ProjectSchema = new mongoose.Schema({
    project_id: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    date: { type: Date, required: true },
    language: { type: String, required: true },
    folder: { type: FileTreeSchema, required: true }
}, { _id: false });

const UserSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    projects: [ProjectSchema] 
});

 export const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);


