import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
// import { isRouteAllowed } from "@/lib/roleBaseControl";
// import { Role } from "@/modules/shared/config/roles";

export async function proxy(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const pathname = req.nextUrl.pathname;
  // const role = token.roleCode as Role;

  // if (!role || !isRouteAllowed(role, pathname)) {
  //   return NextResponse.redirect(new URL("/unauthorized", req.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/manage-school/:path*",
    "/alerts/:path*",
    "/school-report/:path*",
    "/app-configuration/:path*",
  ],
};
