import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import apolloClient from "@/app/graphql/client";
import { LOGIN_USER } from "@/app/graphql/mutations/user";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "name@provider.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const response = await apolloClient.mutate({
            mutation: LOGIN_USER,
            variables: {
              email: credentials!.email,
              password: credentials!.password,
            },
          });
          const { _id, ...data } = response.data.login;
          return {
            id: _id,
            ...data,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  session: {
    maxAge: 3 * 24 * 60 * 60,
  },
  jwt: {
    maxAge: 3 * 24 * 60 * 60,
  },
  callbacks: {
    jwt: (params) => {
      const { token, user } = params;
      if (user) {
        token.accessToken = user.token;
      }
      return token;
    },
    session: (params) => {
      const { session } = params;
      return session;
    }
  },
  pages: {
    signIn: "/auth/login",
  }
});

export { handler as GET, handler as POST };
