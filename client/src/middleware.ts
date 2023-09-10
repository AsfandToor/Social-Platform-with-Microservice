import { withAuth } from "next-auth/middleware"
import { getToken } from "next-auth/jwt";

export default withAuth(
  function middleware (req) {
  },
  {
    callbacks: {
      authorized: async ({ req }) => {
        // const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
        // const customToken = token!.accessToken
        // Custom Auth Logic Here
        return true
      }
    }
  }
)

// Paths for which the middleware should run.
export const config = {
    matcher: ['/auth/:path*'],
}