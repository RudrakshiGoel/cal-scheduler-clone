import "./globals.css"

export const metadata = {
 title: "Cal Scheduler",
 description: "Scheduling App",
}

export default function RootLayout({
 children,
}: {
 children: React.ReactNode
}) {
 return (
  <html lang="en">
   <body>{children}</body>
  </html>
 )
}