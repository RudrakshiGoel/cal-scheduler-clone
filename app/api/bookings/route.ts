import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { Booking, EventType } from "@prisma/client"

export async function POST(req: Request) {

const body = await req.json()

const { name, email, date, eventId } = body

const event = await prisma.eventType.findUnique({
where: { id: eventId }
})

if (!event) {
return NextResponse.json({ error: "Event not found" }, { status: 404 })
}

const start = new Date(date)
const end = new Date(start.getTime() + event.duration * 60000)

const bookings = await prisma.booking.findMany({
include: { event: true }
})

const conflict = bookings.find((b: Booking & { event: EventType }) => {

const existingStart = new Date(b.date)
const existingEnd = new Date(existingStart.getTime() + b.event.duration * 60000)

return start < existingEnd && end > existingStart
})

if (conflict) {
return NextResponse.json(
{ error: "This time slot overlaps with another booking" },
{ status: 400 }
)
}

const booking = await prisma.booking.create({
data: {
name,
email,
date: start,
eventId
}
})

return NextResponse.json(booking)

}
