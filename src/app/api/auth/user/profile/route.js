import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/app/lib/db';
import User from '@/models/User';

export const GET = async (req) => {
    try {
        await connectDB(); // Ensure the database is connected

        // Get the token from cookies
        const token = req.cookies.get('token')?.value;
        if (!token) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return NextResponse.json({ message: 'Invalid Token' }, { status: 401 });
        }

        // Fetch the user
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching user profile', details: error.message }, { status: 500 });
    }
};
