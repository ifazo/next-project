import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextRequest, NextResponse } from "next/server";
import { AuthSession, auth as localAuth } from "./auth";

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req: NextRequest) {
    const session = await localAuth();
    
    if (!session) {
        return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    const role = (session as AuthSession)?.role;

    const pathname = req.nextUrl.pathname;

    if (pathname.startsWith('/dashboard/seller') && role !== 'seller') {
        return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    if (pathname.startsWith('/dashboard/admin') && role !== 'admin') {
        return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/dashboard/:path*"],
};
