export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center">

      <div className="text-center max-w-2xl px-6">

        <p className="text-5xl mb-6">
          cal.com
        </p>

        <h1 className="text-5xl font-bold mb-6">
          Simple scheduling for everyone
        </h1>

        <p className="text-gray-400 mb-10 text-lg">
          Create booking links, share them, and let people schedule meetings instantly.
        </p>

        <a href="/dashboard">
          <button className="bg-white text-black px-8 py-3 rounded-md text-lg font-medium hover:bg-gray-200 transition">
            Open Dashboard
          </button>
        </a>

      </div>

      <div className="absolute bottom-6 text-gray-500 text-sm">
        Built with Next.js
      </div>

    </div>
  )
}