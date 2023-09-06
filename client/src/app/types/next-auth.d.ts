import NextAuth, { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      username: string
      token: string
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    username: string
    token: string
  }
}

Popu