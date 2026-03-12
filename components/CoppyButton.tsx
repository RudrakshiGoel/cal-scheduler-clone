"use client"

export default function CopyButton({ link }: { link: string }) {

 function copy(){
  navigator.clipboard.writeText(link)
  alert("Link copied!")
 }

 return (
  <button
   onClick={copy}
   className="text-sm border px-3 py-1 rounded"
  >
   Copy link
  </button>
 )
}