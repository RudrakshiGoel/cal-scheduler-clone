import { prisma } from "@/lib/prisma"

export default async function EditEventPage(
 { params }: { params: Promise<{ id: string }> }
){

 const { id } = await params

 const event = await prisma.eventType.findUnique({
  where:{ id: Number(id) }
 })

 if(!event){
  return <p className="p-10">Event not found</p>
 }

 return(

  <div className="max-w-xl mx-auto p-10">

   <h1 className="text-2xl font-bold mb-6">
    Edit Event
   </h1>

   <form action="/api/events/update" method="POST" className="space-y-4">

    <input type="hidden" name="id" value={event.id} />

    <input
     name="title"
     defaultValue={event.title}
     className="border p-2 w-full rounded"
    />

    <input
     name="description"
     defaultValue={event.description}
     className="border p-2 w-full rounded"
    />

    <input
     name="duration"
     type="number"
     defaultValue={event.duration}
     className="border p-2 w-full rounded"
    />

    <input
     name="slug"
     defaultValue={event.slug}
     className="border p-2 w-full rounded"
    />

    <button className="bg-black text-white px-4 py-2 rounded">
     Update Event
    </button>

   </form>

  </div>

 )

}