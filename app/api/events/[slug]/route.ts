import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
 req: Request,
 context: { params: Promise<{ slug: string }> }
){

 const { slug } = await context.params

 try {

  const event = await prisma.eventType.findFirst({
   where: { slug }
  })

  if(!event){
   return NextResponse.json(null)
  }

  return NextResponse.json(event)

 } catch(error){

  console.error(error)

  return NextResponse.json(
   { error: "Server error" },
   { status: 500 }
  )

 }

}