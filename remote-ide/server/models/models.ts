
import mongoose from 'mongoose'
const { Schema, model, Types } = mongoose

const UserSchema = new Schema({
    // id recived from clerk
    authId: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
}, { timestamps: true })

const ProjectSchema = new Schema({
    owner: { type: Types.ObjectId, ref: 'User', required: true, index: true },
    name: { type: String, required: true },
    slug: { type: String, index: true },
    track: { type: String, enum: ['WebDevelopment', 'SoftWareDevelopment'], required: true },
    // project shareing implemented 
    isPrivate: { type: Boolean, default: true }
}, { timestamps: true })

ProjectSchema.index({ owner: 1, name: 1 }, { unique: true })

const DocumentSchema = new Schema({
    project: { type: Types.ObjectId, ref: 'Project', required: true, index: true },
    parent: { type: Types.ObjectId, ref: 'Document', default: null, index: true },
    type: { type: String, enum: ['file', 'folder'], required: true },
    name: { type: String, required: true },
    extension: { type: String, default: null },
    // req for collaboation and undo deletes
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true })

// fasterlookups
DocumentSchema.index({ project: 1, parent: 1 })
// no duplicates
DocumentSchema.index({ project: 1, parent: 1, name: 1 }, { unique: true, partialFilterExpression: { isDeleted: false } })


const FileSchema = new Schema({
    document: { type: Types.ObjectId, ref: 'Document', required: true, unique: true, index: true },
    content: { type: String, default: '' },
    language: { type: String, default: null },
}, { timestamps: true })



export const User = mongoose.models.User || model('User', UserSchema)
export const Project = mongoose.models.Project || model('Project', ProjectSchema)
export const Document = mongoose.models.Document || model('Document', DocumentSchema)
export const File = mongoose.models.File || model('File', FileSchema)

