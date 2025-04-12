"use client"

import { cn } from "@/lib/utils"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProfileSidebar } from "@/components/profile-sidebar"
import { allMovies } from "@/lib/data"
import { Clock, Calendar, Filter, X, Trash2, Play } from "lucide-react"

export default function WatchHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)

  // Get some random movies for history
  const allHistory = allMovies.slice(12, 30)

  // Filter history based on search and genre
  const filteredHistory = allHistory.filter((movie) => {
    const matchesSearch = searchQuery === "" || movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGenre = selectedGenre === null || movie.genre === selectedGenre
    return matchesSearch && matchesGenre
  })

  // Get unique genres from history
  const genres = Array.from(new Set(allHistory.map((movie) => movie.genre)))

  // Group history by date
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  const lastWeek = new Date(today)
  lastWeek.setDate(lastWeek.getDate() - 7)

  const todayHistory = filteredHistory.slice(0, 3)
  const yesterdayHistory = filteredHistory.slice(3, 6)
  const lastWeekHistory = filteredHistory.slice(6)

  return (
    <main className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <ProfileSidebar activePage="history" />

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <h1 className="text-3xl font-bold">Watch History</h1>

              <div className="flex gap-2">
                <Input
                  type="search"
                  placeholder="Search history..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full md:w-auto"
                />
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
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

            {/* Clear history button */}
            <div className="flex justify-end mb-6">
              <Button variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10">
                <Trash2 className="h-4 w-4 mr-2" /> Clear History
              </Button>
            </div>

            {filteredHistory.length === 0 ? (
              <div className="text-center py-12 border rounded-lg">
                <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-muted flex items-center justify-center">
                  <Clock className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No watch history found</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  {searchQuery || selectedGenre
                    ? "Try adjusting your search or filters to find what you're looking for."
                    : "Start watching movies and shows to build your history."}
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
              </div>
            ) : (
              <div className="space-y-8 animate-fade-in">
                {/* Today */}
                {todayHistory.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <h2 className="text-xl font-bold">Today</h2>
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20">{todayHistory.length}</Badge>
                    </div>
                    <div className="space-y-4">
                      {todayHistory.map((item, index) => (
                        <HistoryItem key={`today-${index}`} item={item} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Yesterday */}
                {yesterdayHistory.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <h2 className="text-xl font-bold">Yesterday</h2>
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                        {yesterdayHistory.length}
                      </Badge>
                    </div>
                    <div className="space-y-4">
                      {yesterdayHistory.map((item, index) => (
                        <HistoryItem key={`yesterday-${index}`} item={item} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Last Week */}
                {lastWeekHistory.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <h2 className="text-xl font-bold">Last Week</h2>
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20">{lastWeekHistory.length}</Badge>
                    </div>
                    <div className="space-y-4">
                      {lastWeekHistory.map((item, index) => (
                        <HistoryItem key={`lastweek-${index}`} item={item} />
                      ))}
                    </div>
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

// History item component
function HistoryItem({ item }) {
  return (
    <div className="flex border rounded-lg overflow-hidden hover:shadow-md transition-shadow group">
      <div className="relative w-32 md:w-48 flex-shrink-0">
        <Image
          src={item.backdropUrl || "/placeholder.svg"}
          alt={item.title}
          width={192}
          height={108}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent md:opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button variant="secondary" size="sm" asChild className="ml-2">
            <Link href={item.type === "tv" ? `/watch/${item.id}/1/1` : `/watch/${item.id}`}>
              <Play className="h-3 w-3 mr-1" /> Resume
            </Link>
          </Button>
        </div>
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
            <span className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" /> {item.year}
            </span>
            <span className="mx-2">•</span>
            <span>{item.duration}</span>
            <span className="mx-2">•</span>
            <span>{item.genre}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">Watched 2 hours ago • 45 minutes watched</div>
          <div className="w-full max-w-24 bg-muted rounded-full h-1.5 overflow-hidden">
            <div className="bg-primary h-full" style={{ width: "60%" }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Badge component for this page
function Badge({ children, className }) {
  return <span className={cn("px-2 py-1 text-xs rounded-full", className)}>{children}</span>
}

