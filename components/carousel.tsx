"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Play, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Movie } from "@/lib/types"

interface CarouselProps {
  movies: Movie[]
}

export function Carousel({ movies }: CarouselProps) {
  const [current, setCurrent] = useState(0)

  // Auto-advance the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === movies.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [movies.length])

  const next = () => {
    setCurrent((prev) => (prev === movies.length - 1 ? 0 : prev + 1))
  }

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? movies.length - 1 : prev - 1))
  }

  return (
    <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
      {movies.map((movie, index) => (
        <div
          key={movie.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            index === current ? "opacity-100" : "opacity-0 pointer-events-none",
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
          <Image
            src={movie.backdropUrl || "/placeholder.svg"}
            alt={movie.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-20">
            <div className="container">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-white drop-shadow-md">
                    {movie.title}
                  </h1>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center mr-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-4 w-4 mr-0.5",
                            i < Math.floor(movie.rating / 2) ? "text-yellow-400 fill-yellow-400" : "text-gray-400",
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-white/90 text-sm font-medium">{movie.rating}/10</span>
                    <span className="mx-2 text-white/50">•</span>
                    <span className="text-white/90 text-sm">{movie.year}</span>
                    <span className="mx-2 text-white/50">•</span>
                    <span className="text-white/90 text-sm">{movie.duration}</span>
                  </div>
                  <p className="text-white/90 max-w-xl mb-4 line-clamp-2 md:line-clamp-3 drop-shadow-md">
                    {movie.description}
                  </p>
                  <div className="flex gap-4">
                    <Button asChild>
                      <Link href={`/watch/${movie.id}`}>
                        <Play className="mr-2 h-4 w-4" /> Watch Now
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href={movie.type === "tv" ? `/tv/${movie.id}` : `/movie/${movie.id}`}>More Info</Link>
                    </Button>
                  </div>
                </div>

                {/* Smaller trailer positioned at the bottom right */}
                <div className="hidden lg:block w-80 flex-shrink-0">
                  <div className="bg-black/80 rounded-lg shadow-xl overflow-hidden border border-white/20 hover:border-white/40 transition-colors">
                    <div className="aspect-video">
                      <iframe
                        src={`${movie.trailerUrl}?autoplay=0&mute=1`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={`${movie.title} Trailer`}
                      />
                    </div>
                    <div className="p-2 text-xs text-white/80 text-center">Official Trailer</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-background/20 backdrop-blur-sm text-white hover:bg-background/40 transition"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-background/20 backdrop-blur-sm text-white hover:bg-background/40 transition"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={cn("w-2 h-2 rounded-full transition-all", index === current ? "bg-white w-4" : "bg-white/50")}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

