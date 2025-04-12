import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { CalendarDays, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { newsItems, featuredNews } from "@/lib/data"

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Featured News */}
      <section className="bg-muted">
        <div className="container py-8 md:py-12">
          <h1 className="text-3xl font-bold mb-8">Latest Movie News</h1>

          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
            {/* Main Featured Article */}
            <div className="relative overflow-hidden rounded-xl">
              <Link href="#" className="group block">
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
                  <Image
                    src={featuredNews.imageUrl || "/placeholder.svg?height=720&width=1280"}
                    alt={featuredNews.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-3 text-white/80 text-sm mb-2">
                    <span className="bg-primary/90 text-white px-3 py-1 rounded-full">{featuredNews.category}</span>
                    <span className="flex items-center">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      {featuredNews.date}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {featuredNews.readTime} min read
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-primary/90 transition-colors">
                    {featuredNews.title}
                  </h2>
                  <p className="text-white/80 line-clamp-2 md:line-clamp-3 mb-4">{featuredNews.summary}</p>
                  <Button className="group-hover:bg-primary group-hover:text-white transition-colors">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Link>
            </div>

            {/* Secondary Featured Articles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {featuredNews.relatedNews.map((news, index) => (
                <Link
                  href="#"
                  key={index}
                  className="group flex gap-4 p-3 rounded-lg hover:bg-background transition-colors"
                >
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden">
                    <Image
                      src={news.imageUrl || "/placeholder.svg?height=200&width=200"}
                      alt={news.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-primary font-medium">{news.category}</span>
                      <span className="text-xs text-muted-foreground">{news.date}</span>
                    </div>
                    <h3 className="font-bold line-clamp-2 group-hover:text-primary transition-colors">{news.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* News Categories */}
      <section className="container py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Browse by Category</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {["Hollywood", "Indie", "Streaming", "Box Office", "Awards", "Reviews"].map((category) => (
            <Link
              href={`#${category.toLowerCase()}`}
              key={category}
              className="bg-muted hover:bg-muted/80 rounded-lg p-4 text-center transition-colors"
            >
              <h3 className="font-medium">{category}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* All News Articles */}
      <section className="container py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Latest Articles</h2>
          <Button variant="outline">View All</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((news) => (
            <Link href="#" key={news.id} className="group">
              <div className="bg-card border rounded-lg overflow-hidden transition-all hover:shadow-md">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={news.imageUrl || "/placeholder.svg"}
                    alt={news.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 bg-primary/90 text-white text-xs px-2 py-1 rounded-full">
                    {news.category}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
                    <CalendarDays className="h-3 w-3" />
                    <span>{news.date}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-muted-foreground line-clamp-3 mb-4">{news.summary}</p>
                  <div className="flex justify-end">
                    <span className="text-sm font-medium text-primary flex items-center group-hover:underline">
                      Read More <ArrowRight className="ml-1 h-3 w-3" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="bg-muted/50 py-12 mt-8">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-2">Stay Updated</h2>
            <p className="text-muted-foreground mb-6">
              Subscribe to our newsletter to get the latest movie news and updates delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <Input type="email" placeholder="Enter your email" className="flex-1" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

