import { Button } from "@/components/ui/button"

const destinations = [
  "Delhi",
  "Mumbai",
  "Jaipur",
  "Agra",
  "Varanasi",
  "Udaipur",
  "Goa",
  "Kolkata",
  "Chennai",
  "Bangalore",
]

export default function PopularDestinations() {
  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Popular Destinations</h2>
        <div className="flex flex-wrap gap-3">
          {destinations.map((destination) => (
            <Button
              key={destination}
              variant="outline"
              className="rounded-full bg-white hover:bg-amber-50 border-gray-200"
            >
              {destination}
            </Button>
          ))}
        </div>
      </div>
    </section>
  )
}

