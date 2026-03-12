"use client"

export default function DashboardActions({
 id,
 slug
}: {
 id: number
 slug: string
}) {

 async function deleteEvent() {

  const res = await fetch("/api/events/delete", {
   method: "POST",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify({ id })
  })

  if(res.ok){
   location.reload()
  } else {
   alert("Delete failed")
  }

 }

 function copyLink() {

  navigator.clipboard.writeText(
   window.location.origin + "/book/" + slug
  )

  alert("Link copied!")
 }

 return (
  <div className="flex gap-3">

   <button
    onClick={copyLink}
    className="text-blue-600"
   >
    Copy Link
   </button>

   <button
    onClick={deleteEvent}
    className="text-red-600"
   >
    Delete
   </button>

  </div>
 )
}