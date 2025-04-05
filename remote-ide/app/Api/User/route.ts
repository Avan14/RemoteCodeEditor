import mongoose from "mongoose";
import { UserModel } from "./modals/User"; // Assuming UserModel is correctly imported from the correct location
import { UserSchemaType } from "./schema/types"; // Adjust imports as per your schema definitions
import { NextRequest, NextResponse } from "next/server";

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect("mongodb+srv://Avan:1234@cluster0.zrxqa4d.mongodb.net/yourdbname");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error; // Rethrow error to be caught by caller
  }
}

// Example user data (validating using zod before saving)
const exampleUser = {
  id: "user_123",
  name: "John Doe",
  projects: [
    {
      project_id: "proj_456",
      name: "AI Chatbot",
      type: "Web Application",
      date: new Date("2024-04-03"),
      language: "TypeScript",
      folder: {
        id: "folder_1",
        name: "src",
        type: "Folder",
        code: "",
        children: [
          {
            id: "file_1",
            name: "index.ts",
            type: "File",
            code: "console.log('Hello, World!');",
            children: [],
          },
          {
            id: "folder_2",
            name: "components",
            type: "Folder",
            code: "",
            children: [
              {
                id: "file_2",
                name: "Chatbot.tsx",
                type: "File",
                code: "export function Chatbot() { return <div>Chatbot</div>; }",
                children: [],
              },
            ],
          },
        ],
      },
    },
  ],
};

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, name } = body;

  try {
    await connectDB();

    // Check if user exists
    const existingUser = await UserModel.findOne({ id: userId });
    if (existingUser) {
      return NextResponse.json(existingUser, { status: 400 });
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
