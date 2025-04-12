"use client"

import { useState } from "react"
import { X } from "lucide-react"
import type { Movie } from "@/lib/types"

interface TrailerCardProps {
  movie: Movie
  onClose: () => void
}

export function TrailerCard({ movie, onClose }: TrailerCardProps) {
  const [isPlaying, setIsPlaying] = useState(true)

  return (
    <div className="bg-card rounded-lg shadow-xl overflow-hidden w-[350px]">
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-10 p-1 rounded-full bg-black/50 text-white hover:bg-black/70"
          aria-label="Close trailer"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="aspect-video bg-black">
          <iframe
            src={`${movie.trailerUrl}${isPlaying ? "?autoplay=1&mute=1" : ""}`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={`${movie.title} Trailer`}
          />
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{movie.title} - Official Trailer</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          Watch the official trailer for {movie.title}, coming to theaters {movie.year}.
        </p>
      </div>
    </div>
  )
}

