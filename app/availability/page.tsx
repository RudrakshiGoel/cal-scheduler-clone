import { prisma } from "@/lib/prisma"

export default async function AvailabilityPage() {

 const availability = await prisma.availability.findMany({
  orderBy:{ day:"asc" }
 })

 const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
 ]

 return(

  <div className="max-w-3xl mx-auto p-10">

   <h1 className="text-3xl font-bold mb-8">
    Availability
   </h1>

   <div className="space-y-4">

    {availability.map(a => (

     <div
      key={a.id}
      className="bg-white border rounded-lg p-4 flex justify-between"
     >

      <p className="font-medium">
       {days[a.day]}
      </p>

      <p className="text-gray-600">
       {a.startTime} — {a.endTime}
      </p>

     </div>

    ))}

   </div>

  </div>

 )

}