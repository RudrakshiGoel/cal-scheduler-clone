import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {

 const body = await req.json()

 const title = body.title
 const description = body.description
 const duration = Number(body.duration)
 const slug = body.slug

 try {

  const event = await prisma.eventType.create({
   data: {
    title: title,
    description: description,
    duration: duration,
    slug: slug
   }
  })

  return NextResponse.json(event)

 } catch (error) {

  console.error(error)

  return NextResponse.json(
   { error: "Create event failed" },
   { status: 500 }
  )

 }

}