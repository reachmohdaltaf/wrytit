import { NextResponse } from "next/server";

export async function POST() {
    const response = NextResponse.json({ message: "Logout Successful" }, { status: 200 });
    response.cookies.set("token", "", { httpOnly: true, secure: true, sameSite: "None", expires: new Date(0) });
    return response;
}
