import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { cpf, password } = await request.json();

  if (cpf === "12345678900" && password === "password") {
    const response = NextResponse.json({ message: "Login bem-sucedido" });

    response.cookies.set({
      name: "authToken",
      value: "fakeToken123",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 dia
    });

    return response;
  }

  return NextResponse.json({ error: "CPF ou senha inválidos" }, { status: 401 });
}