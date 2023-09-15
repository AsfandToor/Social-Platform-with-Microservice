import { withAuth } from "next-auth/middleware"
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  async function middleware (req: NextRequest) {
    const session = await getSession()
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    if (!token?.accessToken) {
      return NextResponse.redirect(new URL('/auth/login', req.nextUrl))
    }
    else {
      return NextResponse.next()
    }
  }
)

// Paths for which the middleware should run.
export const config = {
    matcher: ['/home'],
}