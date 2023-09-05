import NextAuth from "next-auth/next";
import CredentialProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const user = { id: 1, name: "J Smith", email: "123" };
                if (user) {
                    return user;
                } else {
                    return null;
                }
            }
        })
    ]
})

export { handler as GET, handler as POST };