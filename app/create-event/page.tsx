"use client"

import { useState } from "react"

export default function CreateEventPage() {

 const [title, setTitle] = useState("")
 const [description, setDescription] = useState("")
 const [duration, setDuration] = useState(30)
 const [slug, setSlug] = useState("")

 async function createEvent() {

  await fetch("/api/events", {
   method: "POST",
   headers: {
    "Content-Type": "application/json"
   },
   body: JSON.stringify({
    title,
    description,
    duration,
    slug
   })
  })

  alert("Event created!")

 }

 return (
  <div style={{ padding: 40 }}>

   <h1>Create Event</h1>

   <input
    placeholder="Title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
   />

   <br /><br />

   <input
    placeholder="Description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
   />

   <br /><br />

   <input
    type="number"
    placeholder="Duration"
    value={duration}
    onChange={(e) => setDuration(Number(e.target.value))}
   />

   <br /><br />

   <input
    placeholder="Slug (URL)"
    value={slug}
    onChange={(e) => setSlug(e.target.value)}
   />

   <br /><br />

   <button onClick={createEvent}>
    Create Event
   </button>

  </div>
 )
}