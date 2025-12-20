import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { connectToDB } from "@/server/db/mongoose"
import { User } from "@/server/models/models"

export async function POST(req: NextRequest) {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const name = body?.name ?? "User"

  try {
    await connectToDB();

    let user = await User.findOne({ authId: userId })

    if (!user) {
      user = await User.create({
        authId: userId,
        name,
      })
    }

    return NextResponse.json(
      {
        id: user._id.toString(),
        name: user.name,
        createdAt: user.createdAt,
      },
      { status: 201 }
    )
  } catch (err) {
    console.error("User init error:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
