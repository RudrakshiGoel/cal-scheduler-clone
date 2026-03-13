import { prisma } from "@/lib/prisma"
import DashboardActions from "./dashboardActions"
import { revalidatePath } from "next/cache"
async function cancelBooking(id:number){
 "use server"

 try{
  await prisma.booking.delete({
   where:{ id }
  })

  revalidatePath("/dashboard")

 }catch{}
}

export default async function DashboardPage(){

 const events = await prisma.eventType.findMany()

 const bookings = await prisma.booking.findMany({
  include:{ event:true },
  orderBy:{ date:"asc" }
 })

 const now = new Date()

 const upcoming = bookings.filter(b => new Date(b.date) >= now)
 const past = bookings.filter(b => new Date(b.date) < now)

 return(

  <div className="min-h-screen bg-black text-white">

   <div className="max-w-5xl mx-auto py-12 px-6">

    <h1 className="text-3xl font-bold mb-6">
     Dashboard
    </h1>

    <div className="flex gap-3 mb-10">

     <a href="/create-event">
      <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-200 transition">
       Create Event
      </button>
     </a>

     <a href="/availability">
      <button className="border border-gray-700 px-4 py-2 rounded-md hover:bg-gray-900 transition">
       Availability
      </button>
     </a>

    </div>


    {/* EVENT TYPES */}

    <h2 className="text-lg font-semibold mb-4">
     Event Types
    </h2>

    <div className="space-y-4 mb-12">

     {events.map(event => (

      <div
       key={event.id}
       className="bg-gray-900 border border-gray-800 rounded-lg p-5 flex justify-between items-center hover:bg-gray-800 transition"
      >

       <div>

        <p className="font-semibold text-white">
         {event.title}
        </p>

        <p className="text-sm text-gray-400">
         {event.duration} minutes
        </p>

        <a
         href={`/book/${event.slug}`}
         className="text-blue-400 text-sm"
        >
         /book/{event.slug}
        </a>

       </div>


       <div className="flex gap-4 items-center">

        <a
         href={`/edit-event/${event.id}`}
         className="text-gray-300 text-sm hover:text-white"
        >
         Edit
        </a>

        <DashboardActions id={event.id} slug={event.slug} />

       </div>

      </div>

     ))}

    </div>


    {/* UPCOMING BOOKINGS */}

    <h2 className="text-lg font-semibold mb-4">
     Upcoming Bookings
    </h2>

    <div className="space-y-3 mb-12">

     {upcoming.map(b => {

      const date = new Date(b.date)

      return(

       <div
        key={b.id}
        className="bg-gray-900 border border-gray-800 rounded-lg p-4 flex justify-between items-center hover:bg-gray-800 transition"
       >

        <div>

         <p className="font-semibold text-white">
          {b.name}
         </p>

         <p className="text-sm text-gray-400">
          {b.event.title}
         </p>

        </div>

        <div className="flex items-center gap-4">

         <p className="text-sm text-gray-400">
          {date.toLocaleString()}
         </p>

         <form action={cancelBooking.bind(null,b.id)}>
          <button className="text-red-400 text-sm hover:text-red-300">
           Cancel
          </button>
         </form>

        </div>

       </div>

      )

     })}

    </div>


    {/* PAST BOOKINGS */}

    <h2 className="text-lg font-semibold mb-4">
     Past Bookings
    </h2>

    <div className="space-y-3">

     {past.map(b => {

      const date = new Date(b.date)

      return(

       <div
        key={b.id}
        className="bg-gray-900 border border-gray-800 rounded-lg p-4 flex justify-between items-center hover:bg-gray-800 transition"
       >

        <div>

         <p className="font-semibold text-white">
          {b.name}
         </p>

         <p className="text-sm text-gray-400">
          {b.event.title}
         </p>

        </div>

        <p className="text-sm text-gray-400">
         {date.toLocaleString()}
        </p>

       </div>

      )

     })}

    </div>

   </div>

  </div>

 )

}