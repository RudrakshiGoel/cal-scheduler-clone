# Cal Scheduler Clone

This project is a simplified scheduling platform inspired by Cal.com. It allows users to create meeting event types, define their availability, and allow others to book meetings through a public booking page.

---

## Tech Stack

Frontend
- Next.js (App Router)
- React
- Tailwind CSS
- React Day Picker

Backend
- Next.js API Routes
- Prisma ORM

Database
- PostgreSQL (Supabase)

---

## Setup Instructions

1. Clone the repository

git clone https://github.com/RudrakshiGoel/cal-scheduler-clone.git  
cd cal-scheduler-clone

2. Install dependencies

npm install

3. Create environment variables

Create a `.env` file in the root directory and add your database connection string:

DATABASE_URL="your_database_connection_url"

4. Run database migrations

npx prisma migrate dev

5. Start the development server

npm run dev

The application will run on:

http://localhost:3000

---

## Assumptions Made

- A 10 minute buffer time is enforced between meetings.
- Availability settings apply globally across all event types.
- Each event type has a unique slug used for its public booking page.
- Time slots are generated based on availability and filtered against existing bookings to prevent double booking.
- Bookings can only be created within the defined availability window.
