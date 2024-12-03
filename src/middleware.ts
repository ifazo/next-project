import { getToken } from "next-auth/jwt";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextRequest, NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    const role = token?.role;

    if (!token) {
        return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    const pathname = req.nextUrl.pathname;

    if (pathname.startsWith('/dashboard/seller') && role !== 'seller') {
        return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    if (pathname.startsWith('/dashboard/admin') && role !== 'admin') {
        return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    // if (pathname.startsWith('/dashboard') && !['buyer', 'seller', 'admin'].includes(role)) {
    //     return NextResponse.redirect(new URL('/sign-in', req.url));
    // }

    return NextResponse.next();
});

export const config = {
    matcher: ["/dashboard/:path*"],
};
