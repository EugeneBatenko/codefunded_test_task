import { NextRequest, NextResponse } from "next/server";
import {verifyJwtToken} from "@/lib/token";

const protectedRoutes = ["/currency"];

export default async function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;
    const hasVerifiedToken = token && (await verifyJwtToken(token));

    if(!hasVerifiedToken && protectedRoutes.includes(req?.nextUrl?.pathname)) {
        const absoluteUrl = new URL("/login", req.nextUrl.origin);
        return NextResponse.redirect(absoluteUrl.toString());
    }
    return NextResponse.next();
}





