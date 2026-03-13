import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
 req: Request,
 context: { params: Promise<{ slug: string }> }
){

 const { slug } = await context.params

 const event = await prisma.eventType.findUnique({
  where:{ slug }
 })

 if(!event){
  return NextResponse.json([])
 }

 const availability = await prisma.availability.findMany({
  orderBy:{ day:"asc" }
 })

 const bookings = await prisma.booking.findMany({
  include:{ event:true }
 })

 const BUFFER = 10
 const slots:string[] = []

 const today = new Date()

 for(let i=0;i<30;i++){

  const date = new Date()
  date.setDate(today.getDate()+i)

  const day = date.getDay()

  const dayAvailability = availability.find(a=>a.day===day)

  if(!dayAvailability) continue


  const start = new Date(date)
  const [sh,sm] = dayAvailability.startTime.split(":")
  start.setHours(Number(sh),Number(sm),0,0)


  const end = new Date(date)
  const [eh,em] = dayAvailability.endTime.split(":")
  end.setHours(Number(eh),Number(em),0,0)


  let current = new Date(start)


  // adjust start time based on existing bookings
  bookings.forEach(b=>{

   const bookedStart = new Date(b.date)

   if(bookedStart.toDateString() !== date.toDateString()) return

   const bookedEnd = new Date(bookedStart)
   bookedEnd.setMinutes(
    bookedEnd.getMinutes() +
    b.event.duration +
    BUFFER
   )

   if(current < bookedEnd && current >= bookedStart){
    current = new Date(bookedEnd)
   }

  })


  while(current < end){

   const slotStart = new Date(current)

   const slotEnd = new Date(slotStart)
   slotEnd.setMinutes(slotEnd.getMinutes() + event.duration)

   const overlap = bookings.some(b=>{

    const bookedStart = new Date(b.date)

    if(bookedStart.toDateString() !== date.toDateString()) return false

    const bookedEnd = new Date(bookedStart)
    bookedEnd.setMinutes(
     bookedEnd.getMinutes() +
     b.event.duration +
     BUFFER
    )

    return (
     slotStart < bookedEnd &&
     slotEnd > bookedStart
    )

   })

   if(!overlap && slotEnd <= end){
    slots.push(slotStart.toISOString())
   }

   current.setMinutes(
    current.getMinutes() + event.duration
   )

  }

 }

 return NextResponse.json(slots)

}