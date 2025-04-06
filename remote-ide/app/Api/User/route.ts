import mongoose from "mongoose";
import UserModel from "./modals/User"; // Assuming UserModel is correctly imported from the correct location
import { UserSchemaType } from "./schema/types"; // Adjust imports as per your schema definitions
import { NextRequest, NextResponse } from "next/server";

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}
await connectDB();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, name } = body;

  try {

    // Check if user exists
    const existingUser = await UserModel.findOne({ id: userId });
    if (existingUser) {
      return NextResponse.json(existingUser, { status: 200 });
    }

    // Create new user if not exists
    const newUser = {
      id: userId,
      name: name,
      projects: [],
    };

    const createdUser = await UserModel.create(newUser);

    return NextResponse.json(createdUser, { status: 200 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, updatedprojects } = body;

    if (!userId || !Array.isArray(updatedprojects)) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const updatedUser = await UserModel.findOneAndUpdate(
      { id: userId },
      { $set: { projects: updatedprojects } },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User updated", user: updatedUser }, { status: 200 });
  } catch (err) {
    console.error("Error updating user:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
