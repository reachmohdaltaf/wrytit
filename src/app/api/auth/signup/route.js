import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import connectDB from "@/app/lib/db";

export async function POST(req) {
    try {
        await connectDB();
        const { name, email, password } = await req.json();

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "User Already Exists" }, { status: 400 });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = new User({ name, email, password: hashPassword });
        await user.save();

        return NextResponse.json({ message: "User Signed in Successfully", user }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "User Signup Failed", details: error.message }, { status: 500 });
    }
}
