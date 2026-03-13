import { prisma } from "@/lib/prisma"
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

async function deleteEvent(id:number){
 "use server"

 try{
  await prisma.eventType.delete({
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

  <div className="min-h-screen bg-[#0B0B0C] text-white">

   <div className="max-w-5xl mx-auto py-12 px-6">

    <h1 className="text-3xl font-bold mb-6">
     Dashboard
    </h1>

    <div className="flex gap-3 mb-10">

     <a href="/create-event">
      <button className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition">
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
 className="bg-[#151517] border border-[#242428] rounded-xl p-6 flex justify-between items-center hover:bg-[#1C1C1F] transition"
>

<div>

<p className="font-semibold text-lg">
 {event.title}
</p>

<div className="flex items-center gap-2 mt-2">

<span className="text-xs bg-[#242428] px-2 py-1 rounded">
 {event.duration}m
</span>

<span className="text-gray-400 text-sm">
 /{event.slug}
</span>

</div>

</div>


{/* ACTION BUTTONS */}

<div className="flex items-center gap-4 text-sm">

<a
 href={`/book/${event.slug}`}
 target="_blank"
 className="text-gray-300 hover:text-white"
>
 Open
</a>

<a
 href={`/book/${event.slug}`}
 target="_blank"
 className="text-blue-400 hover:text-blue-300"
>
 Copy Link
</a>


<details className="relative">

<summary className="cursor-pointer text-gray-400 hover:text-white">
 ⋯
</summary>

<div className="absolute right-0 mt-2 w-28 bg-[#151517] border border-[#242428] rounded-lg shadow-lg flex flex-col">

<a
 href={`/edit-event/${event.id}`}
 className="px-3 py-2 hover:bg-[#1C1C1F]"
>
 Edit
</a>

<form action={deleteEvent.bind(null,event.id)}>
<button
 className="text-red-400 text-left px-3 py-2 hover:bg-[#1C1C1F]"
>
 Delete
</button>
</form>

</div>

</details>

</div>

</div>

))}

</div>


{/* UPCOMING BOOKINGS */}

<details className="mb-10">

<summary className="text-lg font-semibold cursor-pointer">
 Upcoming Bookings
</summary>

<div className="space-y-3 mt-4">

{upcoming.map(b => {

const date = new Date(b.date)

return(

<div
 key={b.id}
 className="bg-[#151517] border border-[#242428] rounded-lg p-4 flex justify-between items-center"
>

<div>

<p className="font-semibold">
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
<button className="text-red-400 hover:text-red-300 text-sm">
 Cancel
</button>
</form>

</div>

</div>

)

})}

</div>

</details>


{/* PAST BOOKINGS */}

<details>

<summary className="text-lg font-semibold cursor-pointer">
 Past Bookings
</summary>

<div className="space-y-3 mt-4">

{past.map(b => {

const date = new Date(b.date)

return(

<div
 key={b.id}
 className="bg-[#151517] border border-[#242428] rounded-lg p-4 flex justify-between items-center"
>

<div>

<p className="font-semibold">
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

</details>

</div>

</div>

)
}