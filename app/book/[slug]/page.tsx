"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"

export default function BookingPage() {

 const params = useParams()
 const router = useRouter()

 const slug = params.slug as string

 const [event, setEvent] = useState<any>(null)
 const [slots, setSlots] = useState<any[]>([])
 const [selectedDate, setSelectedDate] = useState<Date | undefined>()
 const [selectedSlot, setSelectedSlot] = useState("")
 const [name, setName] = useState("")
 const [email, setEmail] = useState("")

 useEffect(() => {

  async function loadData(){

   try{

    const eventRes = await fetch(`/api/events/${slug}`)

    if(eventRes.ok){
     const eventData = await eventRes.json()
     setEvent(eventData)
    } else {
     setEvent(null)
    }

    const slotRes = await fetch(`/api/slots/${slug}`)

    if(slotRes.ok){
     const slotData = await slotRes.json()
     setSlots(slotData || [])
    } else {
     setSlots([])
    }

   }catch(error){
    console.error(error)
    setSlots([])
   }

  }

  if(slug) loadData()

 }, [slug])


 async function handleSubmit(e:any){

  e.preventDefault()

  const res = await fetch("/api/bookings",{
   method:"POST",
   headers:{ "Content-Type":"application/json" },
   body:JSON.stringify({
    name,
    email,
    date:selectedSlot,
    eventId:event.id
   })
  })

  if(res.ok){
   router.push("/book/success")
  }

 }


 if(!event){
  return <p className="p-10 text-center">Event not found</p>
 }


 return (

  <div className="min-h-screen flex items-center justify-center bg-gray-50">

   <div className="bg-white rounded-2xl shadow-lg p-10 w-[900px] flex gap-8">

    {/* LEFT SIDE */}

    <div className="w-1/2 pr-6 border-r">

     <h1 className="text-2xl font-semibold mb-4">
      {event.title}
     </h1>

     <p className="text-gray-500 mb-6">
      {event.description}
     </p>

     <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
      ⏱ {event.duration} minutes
     </div>

     <div className="flex items-center gap-2 text-gray-600 text-sm">
      📅 Select a time
     </div>

    </div>


    {/* RIGHT SIDE */}

    <div className="w-1/2">

     <h3 className="font-semibold mb-4">
      Select Date
     </h3>

     <DayPicker
      mode="single"
      selected={selectedDate}
      onSelect={setSelectedDate}
     />


     {selectedDate && (

      <>
       <h3 className="font-semibold mt-6 mb-3">
        Available Times
       </h3>

       <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">

        {slots.map((slot:any)=>{

         const date = new Date(slot)

         if(date.toDateString() !== selectedDate.toDateString()) return null

         return(

          <button
           key={slot}
           onClick={()=>setSelectedSlot(slot)}
           className={`w-full border rounded-md py-2 text-sm transition
            hover:bg-gray-100
            ${selectedSlot === slot ? "bg-black text-white border-black" : ""}
           `}
          >
           {date.toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"})}
          </button>

         )

        })}

       </div>

      </>

     )}


     {selectedSlot && (

      <form onSubmit={handleSubmit} className="mt-6 space-y-3">

       <input
        className="border rounded-md p-2 w-full"
        placeholder="Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        required
       />

       <input
        className="border rounded-md p-2 w-full"
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        required
       />

       <button
        className="bg-black text-white w-full py-2 rounded-md hover:opacity-90"
       >
        Confirm Booking
       </button>

      </form>

     )}

    </div>

   </div>

  </div>

 )
}