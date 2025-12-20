import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { connectToDB } from "@/server/db/mongoose"
import { Project, Document } from "@/server/models/models"
import mongoose from "mongoose"

// builds nested list 
function buildTree(nodes: any[]) {
    const map = new Map()
    let root = null

    for (const node of nodes) {
        map.set(node._id.toString(), {
            id: node._id.toString(),
            name: node.name,
            type: node.type,
            extension: node.extension,
            children: [],
        })
    }

    for (const node of nodes) {
        const id = node._id.toString()
        if (node.parent) {
            const parent = map.get(node.parent.toString())
            parent.children.push(map.get(id))
        } else {
            root = map.get(id)
        }
    }
    return root;
}

export async function GET(
    req: NextRequest,
    ctx: { params: Promise<{ projectId: string }> }
) {
    const { userId } = await auth()
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { projectId } = await ctx.params

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        return NextResponse.json({ error: "Invalid project id" }, { status: 400 })
    }

    await connectToDB()

    const project = await Project.findById(projectId).populate("owner")

    if (!project || project.owner.authId !== userId) {
        return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    const documents = await Document.find({
        project: project._id,
        isDeleted: false,
    }).lean()

    const tree = buildTree(documents)

    console.log(tree);
    return NextResponse.json({
        project: {
            id: project._id.toString(),
            name: project.name,
            track: project.track,
        },
        tree,
    })
}

