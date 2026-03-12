import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
 req: Request,
 context: { params: Promise<{ slug: string }> }
) {

 const { slug } = await context.params

 const event = await prisma.eventType.findUnique({
  where: { slug }
 })

 if (!event) {
  return NextResponse.json([])
 }

 const availability = await prisma.availability.findMany()

 const bookings = await prisma.booking.findMany({
  include: { event: true }
 })

 const slots: string[] = []

 const now = new Date()

 for (let i = 0; i < 14; i++) {

  const day = new Date()
  day.setDate(now.getDate() + i)

  const dayNumber = day.getDay()

  const dayAvailability = availability.find(a => a.day === dayNumber)
  if (!dayAvailability) continue

  const start = new Date(day)
  const end = new Date(day)

  const [startHour, startMin] = dayAvailability.startTime.split(":")
  const [endHour, endMin] = dayAvailability.endTime.split(":")

  start.setHours(Number(startHour), Number(startMin), 0, 0)
  end.setHours(Number(endHour), Number(endMin), 0, 0)

  let current = new Date(start)

  while (current < end) {

   const slotStart = new Date(current).getTime()
   const slotEnd = slotStart + event.duration * 60000

   // Skip past times
   if (slotStart < now.getTime()) {
    current.setMinutes(current.getMinutes() + 15)
    continue
   }

   const conflict = bookings.some(b => {

    const existingStart = new Date(b.date).getTime()
    const existingEnd =
     existingStart + b.event.duration * 60000

    return slotStart < existingEnd && slotEnd > existingStart

   })

   if (!conflict) {
    slots.push(new Date(slotStart).toISOString())
   }

   current.setMinutes(current.getMinutes() + 15)

  }

 }

 return NextResponse.json(slots)

}