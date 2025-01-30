import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logout realizado" });

  response.cookies.set({
    name: "authToken",
    value: "",
    path: "/",
    expires: new Date(0), // Expira o cookie
  });

  return response;
}