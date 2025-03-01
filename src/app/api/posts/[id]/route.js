import connectDB from "@/app/lib/db";
import { protect } from "@/app/middleware/auth";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const post = await Post.findById(params.id).populate("author", "name email profilePic");

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const user = await protect(req);
    if (!user.id) return user; // If unauthorized, return the response

    const post = await Post.findById(params.id);
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    if (post.author.toString() !== user.id) {
      return NextResponse.json({ message: "Unauthorized to delete this post" }, { status: 403 });
    }

    await post.deleteOne();
    return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
