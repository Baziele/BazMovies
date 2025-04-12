import { Carousel } from "@/components/carousel"
import { MovieCard } from "@/components/movie-card"
import { NewsCard } from "@/components/news-card"
import { UpcomingMovieCard } from "@/components/upcoming-movie-card"
import { featuredMovies, actionMovies, comedyMovies, dramaMovies, newsItems, upcomingMovies } from "@/lib/data"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="w-full">
        <Carousel movies={featuredMovies} />
      </section>

      {/* Movie Categories */}
      <section className="container py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">Action Movies</h2>
          <Button variant="link" asChild>
            <Link href="/search?genre=Action" className="flex items-center gap-1 hover:gap-2 transition-all">
              See more <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {actionMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      <section className="container py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">Comedy Movies</h2>
          <Button variant="link" asChild>
            <Link href="/search?genre=Comedy" className="flex items-center gap-1 hover:gap-2 transition-all">
              See more <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {comedyMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      <section className="container py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">Drama Movies</h2>
          <Button variant="link" asChild>
            <Link href="/search?genre=Drama" className="flex items-center gap-1 hover:gap-2 transition-all">
              See more <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {dramaMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* News Section */}
      <section className="container py-8 bg-muted/50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">Latest Movie News</h2>
          <Button variant="link" asChild>
            <Link href="/news" className="flex items-center gap-1 hover:gap-2 transition-all">
              All news <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      </section>

      {/* Upcoming Movies */}
      <section className="container py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">Coming Soon</h2>
          <Button variant="link" asChild>
            <Link href="/search?upcoming=true" className="flex items-center gap-1 hover:gap-2 transition-all">
              See all upcoming <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {upcomingMovies.map((movie) => (
            <UpcomingMovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </main>
  )
}

