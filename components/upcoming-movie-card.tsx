import Image from "next/image"
import { CalendarDays } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { UpcomingMovie } from "@/lib/types"

interface UpcomingMovieCardProps {
  movie: UpcomingMovie
}

export function UpcomingMovieCard({ movie }: UpcomingMovieCardProps) {
  return (
    <div className="group overflow-hidden rounded-lg border bg-card shadow-sm">
      <div className="aspect-video relative overflow-hidden">
        <Image src={movie.imageUrl || "/placeholder.svg"} alt={movie.title} fill className="object-cover" />
        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          <CalendarDays className="inline-block h-3 w-3 mr-1" />
          {movie.releaseDate}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold mb-1">{movie.title}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{movie.description}</p>
        <Button variant="outline" size="sm" className="w-full">
          Remind Me
        </Button>
      </div>
    </div>
  )
}

