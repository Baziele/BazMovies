import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, List } from "lucide-react"
import { VideoPlayer } from "@/components/video-player"
import { Button } from "@/components/ui/button"
import { allMovies, tvSeasons } from "@/lib/data"

export default function WatchEpisode({
  params,
}: {
  params: {
    id: string
    season: string
    episode: string
  }
}) {
  // Find the TV show by ID
  const show = allMovies.find((m) => m.id === params.id && m.type === "tv")

  if (!show) {
    return <div className="container py-10">TV Show not found</div>
  }

  // Get seasons for this show
  const seasons = tvSeasons[params.id] || []
  const seasonNumber = Number.parseInt(params.season)
  const episodeNumber = Number.parseInt(params.episode)

  // Find current season and episode
  const currentSeason = seasons.find((s) => s.seasonNumber === seasonNumber)
  const currentEpisode = currentSeason?.episodes.find((e) => e.episodeNumber === episodeNumber)

  if (!currentSeason || !currentEpisode) {
    return <div className="container py-10">Episode not found</div>
  }

  // Find next episode
  let nextEpisode = null
  let nextSeason = null

  // Check if there's another episode in the current season
  const nextEpisodeInSeason = currentSeason.episodes.find((e) => e.episodeNumber === episodeNumber + 1)

  if (nextEpisodeInSeason) {
    nextEpisode = nextEpisodeInSeason
    nextSeason = currentSeason
  } else {
    // Check if there's another season
    const nextSeasonData = seasons.find((s) => s.seasonNumber === seasonNumber + 1)
    if (nextSeasonData && nextSeasonData.episodes.length > 0) {
      nextSeason = nextSeasonData
      nextEpisode = nextSeasonData.episodes[0]
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Video Player */}
      <section className="w-full bg-black">
        <VideoPlayer videoUrl={currentEpisode.videoUrl || "#"} />
      </section>

      {/* Episode Information */}
      <section className="container py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link href={`/tv/${show.id}`} className="text-sm text-primary hover:underline flex items-center">
                <ChevronLeft className="h-4 w-4" />
                Back to {show.title}
              </Link>
            </div>
            <h1 className="text-2xl font-bold">{currentEpisode.title}</h1>
            <div className="text-sm text-muted-foreground">
              Season {seasonNumber}, Episode {episodeNumber} • {currentEpisode.duration}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/tv/${show.id}`}>
                <List className="h-4 w-4 mr-1" /> All Episodes
              </Link>
            </Button>

            {nextEpisode && nextSeason && (
              <Button size="sm" asChild>
                <Link href={`/watch/${show.id}/${nextSeason.seasonNumber}/${nextEpisode.episodeNumber}`}>
                  Next Episode <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            )}
          </div>
        </div>

        <p className="text-lg mb-8">{currentEpisode.description}</p>

        {/* Up Next */}
        {nextEpisode && nextSeason && (
          <div className="border-t pt-6">
            <h2 className="text-xl font-bold mb-4">Up Next</h2>
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <div className="relative w-full md:w-64 aspect-video rounded-lg overflow-hidden">
                <Image
                  src={nextEpisode.imageUrl || "/placeholder.svg?height=300&width=500"}
                  alt={nextEpisode.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Button variant="secondary" size="sm" asChild>
                    <Link href={`/watch/${show.id}/${nextSeason.seasonNumber}/${nextEpisode.episodeNumber}`}>
                      Watch Now
                    </Link>
                  </Button>
                </div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  Season {nextSeason.seasonNumber}, Episode {nextEpisode.episodeNumber} • {nextEpisode.duration}
                </div>
                <h3 className="text-lg font-bold mb-1">{nextEpisode.title}</h3>
                <p className="text-muted-foreground line-clamp-2">{nextEpisode.description}</p>
              </div>
            </div>
          </div>
        )}

        {/* More Episodes */}
        <div className="border-t pt-6 mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">More Episodes</h2>
            <Button variant="link" asChild>
              <Link href={`/tv/${show.id}`}>View All</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentSeason.episodes
              .filter((e) => e.episodeNumber !== episodeNumber)
              .slice(0, 3)
              .map((episode) => (
                <Link
                  key={episode.episodeNumber}
                  href={`/watch/${show.id}/${seasonNumber}/${episode.episodeNumber}`}
                  className="group"
                >
                  <div className="border rounded-lg overflow-hidden">
                    <div className="relative aspect-video">
                      <Image
                        src={episode.imageUrl || "/placeholder.svg?height=300&width=500"}
                        alt={episode.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {episode.duration}
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="text-xs text-muted-foreground mb-1">Episode {episode.episodeNumber}</div>
                      <h3 className="font-medium line-clamp-1 group-hover:text-primary transition-colors">
                        {episode.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </main>
  )
}

