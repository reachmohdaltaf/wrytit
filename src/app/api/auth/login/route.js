import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import connectDB from "@/app/lib/db";

export async function POST(req) {
    try {
        await connectDB();
        const { email, password } = await req.json();
        
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User does not exist" }, { status: 400 });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ message: "Invalid email or password" }, { status: 400 });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        // Set token in cookie
        const response = NextResponse.json({
            message: "Login Successful",
            id: user._id,
            name: user.name,
            email: user.email,
        }, { status: 200 });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 24 * 60 * 60 * 1000,
        });

        return response;
    } catch (error) {
        console.error("error", error);
        return NextResponse.json({ message: "Login Failed", details: error.message }, { status: 500 });
    }
}
