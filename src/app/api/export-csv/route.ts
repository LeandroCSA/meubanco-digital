import { NextResponse } from "next/server";
import { Parser } from "json2csv";

export async function GET() {
  try {
    // Buscar os dados da API externa
    const response = await fetch("https://67982974c2c861de0c6f0321.mockapi.io/api/v1/transactions");
    const transactions = await response.json();

    if (!Array.isArray(transactions)) {
      return NextResponse.json({ error: "Erro ao buscar os dados" }, { status: 500 });
    }

    // Definir os campos do CSV
    const fields = ["id", "type", "createdAt", "contact_name", "contact_email", "value"];
    const parser = new Parser({ fields });

    // Converter JSON para CSV
    const csv = parser.parse(transactions);

    // Configurar headers para download do arquivo CSV
    return new NextResponse("\ufeff" + csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=transacoes.csv",
      },
    });

  }  catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Erro ao exportar CSV", details: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Erro desconhecido ao exportar CSV" },
      { status: 500 }
    );
  }
}