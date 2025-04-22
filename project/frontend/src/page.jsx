// "use client"

// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Calendar } from "@/components/ui/calendar"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { CalendarIcon, Search, MapPin } from "lucide-react"
// import { format } from "date-fns"
// import { useState } from "react"
// import HeroCarousel from "@/components/hero-carousel"
// import PopularDestinations from "@/components/popular-destinations"
// import Footer from "@/components/footer"

// export default function Home() {
//   return (
//     <main className="min-h-screen flex flex-col">
//       <header className="bg-white shadow-sm">
//         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <Link href="/" className="flex items-center gap-2">
//               <span className="text-2xl font-bold text-amber-700">Brijwasi</span>
//               <span className="text-sm text-gray-600 uppercase tracking-wider">Hotel & Restaurant</span>
//             </Link>
//           </div>
//           <nav className="hidden md:flex items-center gap-6">
//             <Link href="/" className="text-gray-700 hover:text-amber-700">
//               Home
//             </Link>
//             <Link href="/rooms" className="text-gray-700 hover:text-amber-700">
//               Rooms
//             </Link>
//             <Link href="/dining" className="text-gray-700 hover:text-amber-700">
//               Dining
//             </Link>
//             <Link href="/events" className="text-gray-700 hover:text-amber-700">
//               Events
//             </Link>
//             <Link href="/about" className="text-gray-700 hover:text-amber-700">
//               About
//             </Link>
//             <Link href="/contact" className="text-gray-700 hover:text-amber-700">
//               Contact
//             </Link>
//           </nav>
//           <div className="flex items-center gap-4">
//             <Link href="/login">
//               <Button variant="outline" className="border-amber-700 text-amber-700 hover:bg-amber-700 hover:text-white">
//                 Sign In
//               </Button>
//             </Link>
//             <Link href="/register" className="hidden md:block">
//               <Button className="bg-amber-700 hover:bg-amber-800 text-white">Register</Button>
//             </Link>
//           </div>
//         </div>
//       </header>

//       <HeroCarousel />

//       <section className="bg-white py-8 px-4 -mt-16 md:-mt-24 relative z-10 container mx-auto rounded-lg shadow-lg">
//         <SearchForm />
//       </section>

//       <section className="container mx-auto py-12 px-4">
//         <h2 className="text-3xl font-bold mb-8 text-center">Experience Luxury & Comfort</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <FeatureCard
//             title="Luxurious Rooms"
//             description="Experience comfort like never before in our elegantly designed rooms with modern amenities."
//             icon="🛏️"
//           />
//           <FeatureCard
//             title="Fine Dining"
//             description="Indulge in exquisite culinary delights prepared by our master chefs using the finest ingredients."
//             icon="🍽️"
//           />
//           <FeatureCard
//             title="Event Spaces"
//             description="Perfect venues for your special occasions, business meetings, and celebrations."
//             icon="🎉"
//           />
//         </div>
//       </section>

//       <PopularDestinations />
//       <Footer />
//     </main>
//   )
// }

// function SearchForm() {
//   const [checkIn, setCheckIn] = useState(new Date())
//   const [checkOut, setCheckOut] = useState(new Date(new Date().setDate(new Date().getDate() + 1)))

//   return (
//     <div className="flex flex-col md:flex-row gap-4">
//       <div className="flex-1 relative">
//         <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//         <Input placeholder="Where are you going?" className="pl-10 py-6 bg-gray-50" />
//       </div>

//       <div className="grid grid-cols-2 gap-4 md:w-1/2">
//         <Popover>
//           <PopoverTrigger asChild>
//             <Button variant="outline" className="justify-start text-left font-normal bg-gray-50 h-[46px]">
//               <CalendarIcon className="mr-2 h-4 w-4" />
//               {checkIn ? format(checkIn, "PPP") : <span>Check-in</span>}
//             </Button>
//           </PopoverTrigger>
//           <PopoverContent className="w-auto p-0">
//             <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} initialFocus />
//           </PopoverContent>
//         </Popover>

//         <Popover>
//           <PopoverTrigger asChild>
//             <Button variant="outline" className="justify-start text-left font-normal bg-gray-50 h-[46px]">
//               <CalendarIcon className="mr-2 h-4 w-4" />
//               {checkOut ? format(checkOut, "PPP") : <span>Check-out</span>}
//             </Button>
//           </PopoverTrigger>
//           <PopoverContent className="w-auto p-0">
//             <Calendar mode="single" selected={checkOut} onSelect={setCheckOut} initialFocus />
//           </PopoverContent>
//         </Popover>
//       </div>

//       <Button className="bg-amber-700 hover:bg-amber-800 h-[46px]">
//         <Search className="mr-2 h-4 w-4" />
//         Search
//       </Button>
//     </div>
//   )
// }

// function FeatureCard({ title, description, icon }) {
//   return (
//     <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
//       <div className="text-4xl mb-4">{icon}</div>
//       <h3 className="text-xl font-semibold mb-2">{title}</h3>
//       <p className="text-gray-600">{description}</p>
//     </div>
//   )
// }

