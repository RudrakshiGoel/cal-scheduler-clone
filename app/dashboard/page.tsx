import { prisma } from "@/lib/prisma"
import DashboardActions from "./dashboardActions"

async function cancelBooking(id:number){
 "use server"

 try{
  await prisma.booking.delete({
   where:{ id }
  })
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

  <div className="min-h-screen bg-gray-50">

   <div className="max-w-4xl mx-auto py-12 px-6">

    <h1 className="text-3xl font-bold mb-6">
     Dashboard
    </h1>

    <div className="flex gap-3 mb-10">

     <a href="/create-event">
      <button className="bg-black text-white px-4 py-2 rounded-md">
       Create Event
      </button>
     </a>

     <a href="/availability">
      <button className="border px-4 py-2 rounded-md">
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
       className="bg-white border rounded-lg p-5 flex justify-between items-center shadow-sm"
      >

       <div>

        <p className="font-semibold">
         {event.title}
        </p>

        <p className="text-sm text-gray-500">
         {event.duration} minutes
        </p>

        <a
         href={`/book/${event.slug}`}
         className="text-blue-600 text-sm"
        >
         /book/{event.slug}
        </a>

       </div>


       <div className="flex gap-4 items-center">

        <a
         href={`/edit-event/${event.id}`}
         className="text-gray-600 text-sm"
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
        className="bg-white border rounded-lg p-4 flex justify-between items-center shadow-sm"
       >

        <div>

         <p className="font-semibold">
          {b.name}
         </p>

         <p className="text-sm text-gray-500">
          {b.event.title}
         </p>

        </div>

        <div className="flex items-center gap-4">

         <p className="text-sm text-gray-600">
          {date.toLocaleString()}
         </p>

         <form action={cancelBooking.bind(null,b.id)}>
          <button className="text-red-500 text-sm">
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
        className="bg-white border rounded-lg p-4 flex justify-between items-center shadow-sm"
       >

        <div>

         <p className="font-semibold">
          {b.name}
         </p>

         <p className="text-sm text-gray-500">
          {b.event.title}
         </p>

        </div>

        <p className="text-sm text-gray-600">
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