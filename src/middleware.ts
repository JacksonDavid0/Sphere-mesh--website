import { NextRequest, NextResponse } from "next/server";
import getAuthUser from "./utils/authUser";

const protectedRoutes = ["/"];
const publicRoutes = ["/login", "/register"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtected = protectedRoutes.includes(path);
  const isPublic = publicRoutes.includes(path);

  const user = await getAuthUser();

  if (isProtected && user.success === false) {
    const loginUrl = new URL("/login", req.nextUrl);
    loginUrl.searchParams.set("message", "Please login to continue");
    return NextResponse.redirect(loginUrl);
  }

  if (isPublic && user.success === true) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}
