import NextAuth, { type NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

const ADMIN_USERNAME = process.env.ADMIN_USERNAME
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

export const authOptions: NextAuthConfig = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                const username = String(credentials?.username ?? "").trim()
                const password = String(credentials?.password ?? "")

                if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
                    throw new Error("Authentication is not configured.")
                }

                if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
                    return {
                        id: "admin",
                        name: username,
                        email: null,
                        role: "ADMIN",
                    }
                }

                return null
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.role = "ADMIN"
                token.username = user.name
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = String(token.id ?? "admin")
                session.user.role = String(token.role ?? "ADMIN")
                session.user.name = String(token.username ?? ADMIN_USERNAME ?? "admin")
            }
            return session
        },
    },
    session: {
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60,
    },
    pages: {
        signIn: "/signin",
        error: "/signin",
    },
    secret: process.env.AUTH_SECRET,
    trustHost: process.env.AUTH_TRUST_HOST === "true",
}

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions)
