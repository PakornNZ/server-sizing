import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

const authPageRoute = "/signin"
const secureCookie = (process.env.AUTH_URL ?? process.env.NEXTAUTH_URL ?? "").startsWith("https://")

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl
    const token = await getToken({ req: request, secret: process.env.AUTH_SECRET, secureCookie })

    if (pathname === authPageRoute && token) {
        const url = request.nextUrl.clone()
        url.pathname = "/"
        return NextResponse.redirect(url)
    }

    if (pathname.startsWith("/api/auth") || pathname.startsWith(authPageRoute)) {
        return NextResponse.next()
    }

    if (!token) {
        const url = request.nextUrl.clone()
        url.pathname = authPageRoute
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
}
