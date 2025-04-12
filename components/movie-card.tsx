import Image from "next/image"
import Link from "next/link"
import { Play, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Movie } from "@/lib/types"

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  // Determine the correct link based on content type
  const detailsLink = movie.type === "tv" ? `/tv/${movie.id}` : `/movie/${movie.id}`

  return (
    <div className="group relative overflow-hidden rounded-lg">
      <Link href={detailsLink} className="block">
        <div className="aspect-[2/3] relative overflow-hidden rounded-lg">
          <Image
            src={movie.posterUrl || "/placeholder.svg"}
            alt={movie.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button size="icon" variant="secondary" className="rounded-full">
              <Play className="h-5 w-5" />
              <span className="sr-only">Watch {movie.title}</span>
            </Button>
          </div>
        </div>
        <div className="mt-2">
          <h3 className="font-medium line-clamp-1">{movie.title}</h3>
          <div className="flex items-center mt-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3 w-3 mr-0.5",
                    i < Math.floor(movie.rating / 2) ? "text-yellow-400 fill-yellow-400" : "text-gray-400",
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground ml-1">{movie.rating}/10</span>
          </div>
          <p className="text-sm text-muted-foreground">{movie.year}</p>
        </div>
      </Link>
    </div>
  )
}

