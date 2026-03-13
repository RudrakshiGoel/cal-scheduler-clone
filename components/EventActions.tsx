"use client"

export default function EventActions({ slug }:{ slug:string }){

 const copyLink = () => {
  const url = `${window.location.origin}/book/${slug}`
  navigator.clipboard.writeText(url)
 }

 return(

  <button
   onClick={copyLink}
   className="text-blue-400 hover:text-blue-300 text-sm"
  >
   Copy Link
  </button>

 )

}