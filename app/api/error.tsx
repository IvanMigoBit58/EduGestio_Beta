import { NextResponse } from "next/server"

export default async function GET(request: Request) {
  return NextResponse.json({ error: "Se ha producido un error en la API" }, { status: 500 })
}
