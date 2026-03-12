import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req:Request){

 const data = await req.formData()

 const id = Number(data.get("id"))
 const title = data.get("title") as string
 const description = data.get("description") as string
 const duration = Number(data.get("duration"))
 const slug = data.get("slug") as string

 await prisma.eventType.update({
  where:{ id },
  data:{
   title,
   description,
   duration,
   slug
  }
 })

 return NextResponse.redirect(new URL("/dashboard", req.url))

}