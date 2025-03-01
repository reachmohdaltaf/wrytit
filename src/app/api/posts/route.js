import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import { protect } from "../../middleware/auth";
import Post from "@/models/Post";

export async function GET() {
  try {
    await connectDB();
    const posts = await Post.find().populate("author", "name email profilePic");
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const user = await protect(req);
    if (!user.id) return user; // If unauthorized, return the response

    const { title, description, content } = await req.json();
    if (!title || !description || !content) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const post = await Post.create({ title, description, content, author: user.id });
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
