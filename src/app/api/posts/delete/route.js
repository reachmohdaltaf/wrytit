import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/app/lib/db";
import Post from "@/models/Post";

export const DELETE = async (req, { params }) => {
    try {
        await connectDB(); // Ensure DB connection

        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return NextResponse.json({ message: "Invalid Token" }, { status: 401 });
        }

        const postId = params.id;
        const post = await Post.findById(postId);

        if (!post) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        // Check if the user deleting the post is the author
        if (post.author.toString() !== decoded.userId) {
            return NextResponse.json({ message: "Unauthorized to delete this post" }, { status: 403 });
        }

        await post.deleteOne();
        return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Server error", details: error.message }, { status: 500 });
    }
};
