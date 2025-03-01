import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "../lib/db";
import User from "@/models/User";

export const protect = async (req) => {
  try {
    await connectDB();
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized, no token" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 401 });
    }

    return user;
  } catch (error) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
};
