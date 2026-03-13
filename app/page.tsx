import Link from "next/link"

export default function HomePage() {

return(

<div className="min-h-screen bg-[#F7F7F7] text-black">


{/* NAVBAR */}

<div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">

<h1 className="text-xl font-semibold">
Cal.com
</h1>

<Link href="/dashboard">
<button className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition">
Go to app →
</button>
</Link>

</div>



{/* HERO */}

<div className="max-w-7xl mx-auto px-8 py-20 grid md:grid-cols-2 gap-20 items-center">


{/* LEFT */}

<div>

<h1 className="text-6xl font-bold leading-tight mb-6">
The better way to schedule your meetings
</h1>

<p className="text-gray-600 text-lg mb-10 max-w-xl">
A fully customizable scheduling software for individuals,
businesses taking calls and developers building scheduling
platforms where users meet users.
</p>

<Link href="/dashboard">
<button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition">
Dashboard →
</button>
</Link>

</div>



{/* RIGHT UI PREVIEW */}

<div className="relative flex justify-center">



{/* GOOGLE STYLE CALENDAR */}

<div className="bg-white border border-gray-200 rounded-xl p-6 w-[360px] shadow-xl">

{/* MONTH */}

<div className="flex justify-between items-center mb-4">

<p className="font-semibold">
May 2025
</p>

<div className="flex gap-2 text-gray-500">

<button>‹</button>
<button>›</button>

</div>

</div>



{/* DAYS */}

<div className="grid grid-cols-7 text-xs text-gray-400 mb-2">

<p>Sun</p>
<p>Mon</p>
<p>Tue</p>
<p>Wed</p>
<p>Thu</p>
<p>Fri</p>
<p>Sat</p>

</div>



{/* CALENDAR GRID */}

<div className="grid grid-cols-7 gap-2 text-sm">

{Array.from({length:31}).map((_,i)=>{

const day=i+1

return(

<div
key={i}
className={`h-10 flex items-center justify-center rounded-md border
${day===21
? "bg-black text-white border-black"
: "bg-gray-50 border-gray-200 text-gray-700"}
`}
>

{day}

</div>

)

})}

</div>

</div>



{/* EVENT CARD */}

<div className="bg-white border border-gray-200 rounded-xl p-5 w-[240px] shadow-xl absolute -bottom-10 -right-10">

<p className="text-sm font-semibold mb-3">
Available Times
</p>

<div className="space-y-2">

<div className="bg-gray-100 rounded-md py-2 text-center hover:bg-gray-200">
3:00 PM
</div>

<div className="bg-gray-100 rounded-md py-2 text-center hover:bg-gray-200">
3:30 PM
</div>

<div className="bg-gray-100 rounded-md py-2 text-center hover:bg-gray-200">
4:00 PM
</div>

</div>

</div>



</div>

</div>

</div>

)

}