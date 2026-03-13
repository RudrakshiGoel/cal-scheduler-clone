"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"

export default function BookingPage() {

 const params = useParams()
 const router = useRouter()
 const slug = params.slug as string

 const [event,setEvent] = useState<any>(null)
 const [slots,setSlots] = useState<any[]>([])
 const [selectedDate,setSelectedDate] = useState<Date | undefined>()
 const [selectedSlot,setSelectedSlot] = useState("")
 const [name,setName] = useState("")
 const [email,setEmail] = useState("")

 useEffect(()=>{

  async function loadData(){

   const eventRes = await fetch(`/api/events/${slug}`)
   const slotRes = await fetch(`/api/slots/${slug}`)

   if(eventRes.ok){
    const eventData = await eventRes.json()
    setEvent(eventData)
   }

   if(slotRes.ok){
    const slotData = await slotRes.json()
    setSlots(slotData)
   }

  }

  if(slug) loadData()

 },[slug])

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
  return <p className="p-10 text-white">Event not found</p>
 }

 return(

  <div className="min-h-screen bg-[#0B0B0C] flex items-center justify-center text-white px-6">

   <div className="bg-[#151517] border border-[#242428] rounded-2xl shadow-xl max-w-5xl w-full grid grid-cols-2 gap-10 p-10">

    {/* LEFT PANEL */}

    <div className="border-r border-[#242428] pr-8">

     <h1 className="text-2xl font-semibold mb-4">
      {event.title}
     </h1>

     <p className="text-gray-400 mb-6">
      {event.description}
     </p>

     <div className="text-gray-400 text-sm mb-2">
      ⏱ {event.duration} minutes
     </div>

     <div className="text-gray-400 text-sm">
      📅 Choose a time
     </div>

    </div>


    {/* RIGHT PANEL */}

    <div>

     <h3 className="font-semibold mb-4">
      Select Date
     </h3>

     <DayPicker
      mode="single"
      selected={selectedDate}
      onSelect={setSelectedDate}
      className="text-white"
     />

     {selectedDate && (

      <>
       <h3 className="font-semibold mt-6 mb-3">
        Available Times
       </h3>

       <div className="grid grid-cols-2 gap-3 max-h-[260px] overflow-y-auto">

        {slots.map((slot:any)=>{

         const date = new Date(slot)

         if(date.toDateString() !== selectedDate.toDateString()) return null

         return(

          <button
           key={slot}
           onClick={()=>setSelectedSlot(slot)}
           className={`flex items-center justify-center gap-2 border border-[#242428] rounded-full py-2 text-sm transition hover:bg-[#1C1C1F]
           ${selectedSlot === slot ? "bg-white text-black border-white" : ""}`}
          >

           <span className="w-2 h-2 bg-green-500 rounded-full"></span>

           {date.toLocaleTimeString([],{
            hour:"2-digit",
            minute:"2-digit"
           })}

          </button>

         )

        })}

       </div>

      </>

     )}

     {selectedSlot && (

      <form onSubmit={handleSubmit} className="mt-6 space-y-3">

       <input
        className="border border-[#242428] bg-[#0F0F10] rounded-md p-2 w-full text-white"
        placeholder="Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        required
       />

       <input
        className="border border-[#242428] bg-[#0F0F10] rounded-md p-2 w-full text-white"
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        required
       />

       <button
        className="bg-white text-black w-full py-2 rounded-md hover:bg-gray-200 transition"
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