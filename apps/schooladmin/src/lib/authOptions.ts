import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { v4 as uuidv4 } from 'uuid';
import { decrypt } from "./encryption";
import { LOGIN_VIA_OTP, LOGIN_VIA_PASSWORD } from "@/modules/shared/config/apiConfig";


declare module "next-auth" {
    interface User {
        id?: string;
        firstName?: string;
        lastName?: string;
        mobile?: string;
        email?: string;
        role?: string;
        roleCode?: string;
        additionalRoles?: string[];
        accessToken?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string;
        role?: string;
        roleCode?: string;
    }
}

declare module "next-auth" {
    interface Session {
        accessToken?: string;
        role?: string;
        roleCode?: string;
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        // Password-based authentication
        Credentials({
            id: "password",
            name: "Password Login",

            credentials: {
                mobile: { label: "Mobile", type: "text" },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials) {
                try {
                    if (!credentials?.mobile || !credentials?.password) {
                        throw new Error("Mobile and password are required");
                    }

                    const res = await fetch(
                        `${LOGIN_VIA_PASSWORD}`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "x-authorization-token": process.env.NEXT_PUBLIC_AUTH_TOKEN || "",
                            },
                            body: JSON.stringify({
                                mobile: credentials.mobile,
                                password: credentials.password,
                                fingerprint: uuidv4(),
                                token: "150725"
                            }),
                        }
                    );
                    console.log("Login Response:", res);
                    console.log("Login URL:", LOGIN_VIA_PASSWORD);
                    const rawInfo = await res.json();
                    const data = JSON.parse(decrypt(rawInfo.data));
                    if (!res.ok || !data?.accessToken) {
                        throw new Error(data?.message || "Invalid credentials");
                    }

                    // ⭐ what we return becomes `user`
                    return {
                        id: data.user.id,
                        firstName: data.user.first_name,
                        lastName: data.user.last_name,
                        mobile: data.user.mobile,
                        email: data.user.email,
                        role: data.user.role,
                        roleCode: data.user.roleCode,
                        additionalRoles: data.user.additional_roles,
                        accessToken: data.accessToken,
                    };
                } catch (err) {
                    throw new Error(err instanceof Error ? err.message : "Login failed");
                }
            },
        }),

        // OTP-based authentication
        Credentials({
            id: "otp",
            name: "OTP Login",

            credentials: {
                mobile: { label: "Mobile", type: "text" },
                otp: { label: "OTP", type: "text" },
            },

            async authorize(credentials) {
                try {
                    if (!credentials?.mobile || !credentials?.otp) {
                        throw new Error("Mobile and OTP are required");
                    }

                    const res = await fetch(
                        `${LOGIN_VIA_OTP}`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "x-authorization-token": process.env.NEXT_PUBLIC_AUTH_TOKEN || "",
                            },
                            body: JSON.stringify({
                                mobile: credentials.mobile,
                                otp: credentials.otp,
                                fingerprint: uuidv4(),
                                token: "150725"
                            }),
                        }
                    );

                    const rawInfo = await res.json();
                    const data = JSON.parse(decrypt(rawInfo.data));
                    if (!res.ok || !data?.accessToken) {
                        throw new Error(data?.message || "Invalid OTP");
                    }

                    // ⭐ what we return becomes `user`
                    return {
                        id: data.user.id,
                        firstName: data.user.first_name,
                        lastName: data.user.last_name,
                        mobile: data.user.mobile,
                        email: data.user.email,
                        role: data.user.role,
                        roleCode: data.user.roleCode,
                        additionalRoles: data.user.additional_roles,
                        accessToken: data.accessToken,
                    };
                } catch (err) {
                    throw new Error(err instanceof Error ? err.message : "OTP login failed");
                }
            },
        }),
    ],

    session: {
        strategy: "jwt",
        maxAge: 60 * 60
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    mobile: user.mobile,
                    email: user.email,
                    role: user.role,
                    roleCode: user.roleCode,
                    additionalRoles: user.additionalRoles,
                };
                token.accessToken = user.accessToken;
                token.role = user.role;
                token.roleCode = user.roleCode;
            }
            return token;
        },

        async session({ session, token }) {
            session.user = token.user as any;
            session.accessToken = token.accessToken as string;
            session.role = token.role as string;
            session.roleCode = token.roleCode as string;
            return session;
        },
    },

    pages: {
        signIn: "/",
    },

    secret: process.env.NEXTAUTH_SECRET,
};
