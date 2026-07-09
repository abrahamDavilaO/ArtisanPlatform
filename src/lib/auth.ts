import { compare } from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { prisma } from "@/lib/prisma";

const providers: NonNullable<NextAuthOptions["providers"]> = [
    CredentialsProvider({
        name: "Email y contraseña",
        credentials: {
            email: { label: "Correo", type: "email" },
            password: { label: "Contraseña", type: "password" },
        },
        async authorize(credentials) {
            const email = credentials?.email?.toLowerCase().trim();
            const password = credentials?.password;

            if (!email || !password) {
                return null;
            }

            const user = await prisma.user.findUnique({
                where: { email },
            });

            if (!user || !user.passwordHash) {
                return null;
            }

            const isValidPassword = await compare(password, user.passwordHash);

            if (!isValidPassword) {
                return null;
            }

            return {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            };
        },
    }),
];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    providers.push(
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    );
}

if (process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET) {
    providers.push(
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        })
    );
}

export const authOptions: NextAuthOptions = {
    providers,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/",
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "credentials") {
                return true;
            }

            if (!user.email) {
                return false;
            }

            await prisma.user.upsert({
                where: { email: user.email.toLowerCase() },
                update: {
                    name: user.name,
                },
                create: {
                    email: user.email.toLowerCase(),
                    name: user.name,
                    passwordHash: "",
                },
            });

            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role ?? "USER";
            }

            if (!token.role && token.email) {
                const dbUser = await prisma.user.findUnique({
                    where: { email: token.email.toLowerCase() },
                    select: { id: true, role: true },
                });

                token.id = dbUser?.id ?? token.sub;
                token.role = dbUser?.role ?? "USER";
            }

            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = String(token.id ?? token.sub ?? "");
                session.user.role = token.role ?? "USER";
            }

            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};
