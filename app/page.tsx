import Link from "next/link"

export default function HomePage() {

 return (

  <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">

   <div className="text-center max-w-2xl">

    <h1 className="text-6xl font-bold text-black mb-6">
     cal.com
    </h1>

    <h2 className="text-3xl font-semibold text-gray-800 mb-6">
     Simple scheduling for everyone
    </h2>

    <p className="text-gray-600 text-lg mb-10">
     Create booking links, share them, and let people schedule meetings instantly.
    </p>

    <Link href="/dashboard">
     <button className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
      Open Dashboard
     </button>
    </Link>

   </div>

  </div>

 )

}