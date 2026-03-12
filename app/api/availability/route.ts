import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {

 const availability = await prisma.availability.findMany()

 return NextResponse.json(availability)

}