"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MovieCard } from "@/components/movie-card"
import { ProfileSidebar } from "@/components/profile-sidebar"
import { allMovies } from "@/lib/data"
import { Bookmark, Filter, Grid, List, Trash2, X } from "lucide-react"

export default function WatchlistPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Get some random movies for watchlist
  const allWatchlist = allMovies.slice(0, 15)

  // Filter watchlist based on search and genre
  const filteredWatchlist = allWatchlist.filter((movie) => {
    const matchesSearch = searchQuery === "" || movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGenre = selectedGenre === null || movie.genre === selectedGenre
    return matchesSearch && matchesGenre
  })

  // Get unique genres from watchlist
  const genres = Array.from(new Set(allWatchlist.map((movie) => movie.genre)))

  return (
    <main className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <ProfileSidebar activePage="watchlist" />

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <h1 className="text-3xl font-bold">My Watchlist</h1>

              <div className="flex gap-2">
                <Input
                  type="search"
                  placeholder="Search watchlist..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full md:w-auto"
                />
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <div className="border rounded-md flex">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="icon"
                    className="rounded-none"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="icon"
                    className="rounded-none"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Genre filters */}
            {genres.length > 0 && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedGenre === null ? "default" : "outline"}
                    onClick={() => setSelectedGenre(null)}
                    className="text-sm"
                  >
                    All
                  </Button>
                  {genres.map((genre) => (
                    <Button
                      key={genre}
                      variant={selectedGenre === genre ? "default" : "outline"}
                      onClick={() => setSelectedGenre(genre)}
                      className="text-sm"
                    >
                      {genre}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Clear watchlist button */}
            <div className="flex justify-end mb-6">
              <Button variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10">
                <Trash2 className="h-4 w-4 mr-2" /> Clear Watchlist
              </Button>
            </div>

            {filteredWatchlist.length === 0 ? (
              <div className="text-center py-12 border rounded-lg">
                <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-muted flex items-center justify-center">
                  <Bookmark className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">Your watchlist is empty</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  {searchQuery || selectedGenre
                    ? "Try adjusting your search or filters to find what you're looking for."
                    : "Add movies and shows to your watchlist to keep track of what you want to watch."}
                </p>
                {(searchQuery || selectedGenre) && (
                  <Button
                    variant="link"
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedGenre(null)
                    }}
                  >
                    Clear filters
                  </Button>
                )}
                <div className="mt-4">
                  <Button asChild>
                    <Link href="/">Browse Movies</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="animate-fade-in">
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {filteredWatchlist.map((movie) => (
                      <div key={movie.id} className="relative group">
                        <MovieCard movie={movie} />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredWatchlist.map((movie) => (
                      <WatchlistItem key={movie.id} item={movie} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

// Watchlist item component for list view
function WatchlistItem({ item }) {
  return (
    <div className="flex border rounded-lg overflow-hidden hover:shadow-md transition-shadow group">
      <div className="relative w-24 md:w-40 flex-shrink-0">
        <Image
          src={item.posterUrl || "/placeholder.svg"}
          alt={item.title}
          width={160}
          height={240}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-bold group-hover:text-primary transition-colors">
              <Link href={item.type === "tv" ? `/tv/${item.id}` : `/movie/${item.id}`}>{item.title}</Link>
            </h3>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <span>{item.year}</span>
            <span className="mx-2">•</span>
            <span>{item.duration}</span>
            <span className="mx-2">•</span>
            <span>{item.genre}</span>
            <span className="mx-2">•</span>
            <span>{item.rating}/10</span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{item.description}</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" asChild>
            <Link href={item.type === "tv" ? `/watch/${item.id}/1/1` : `/watch/${item.id}`}>Watch Now</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href={item.type === "tv" ? `/tv/${item.id}` : `/movie/${item.id}`}>Details</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

