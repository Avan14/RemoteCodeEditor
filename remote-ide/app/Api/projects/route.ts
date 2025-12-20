import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import slugify from 'slugify'
import { connectToDB } from '@/server/db/mongoose'
import { Project, User } from '@/server/models/models'

export async function GET(req: NextRequest) {
    try {
        await connectToDB();

        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const user = await User.findOne({ authId: userId })
        if (!user) {
            return NextResponse.json([], { status: 200 })
        }

        const projects = await Project.find({ owner: user._id })
            .sort({ createdAt: -1 })
            .select('_id name slug track createdAt')

        return NextResponse.json(
            projects.map(p => ({
                id: p._id.toString(),
                name: p.name,
                slug: p.slug,
                track: p.track,
                createdAt: p.createdAt,
            }))
        )
    }
    catch {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
export async function PUT(req: NextRequest) {
    try {

        await connectToDB()
        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { name, track } = await req.json()

        const user = await User.findOne({ authId: userId })
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        const project = await Project.create({
            owner: user._id,
            name,
            track,
            slug: slugify(name, { lower: true, strict: true }),
        })

        return NextResponse.json({
            id: project._id.toString(),
            name: project.name,
            slug: project.slug,
            track: project.track,
            createdAt: project.createdAt,
        })
    } catch (err: any) {
        if (err.code === 11000) {
            return NextResponse.json(
                { error: 'Project with same name already exists' },
                { status: 409 }
            )
        }

        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

