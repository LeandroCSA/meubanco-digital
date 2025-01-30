import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const authToken = request.headers.get("cookie")?.includes("authToken");
  return NextResponse.json({ authenticated: Boolean(authToken) });
}