import Image from "next/image"
import Link from "next/link"
import type { News } from "@/lib/types"

interface NewsCardProps {
  news: News
}

export function NewsCard({ news }: NewsCardProps) {
  return (
    <Link
      href="#"
      className="group block overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md"
    >
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={news.imageUrl || "/placeholder.svg"}
          alt={news.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-muted-foreground">{news.date}</span>
          <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">{news.category}</span>
        </div>
        <h3 className="font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">{news.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{news.summary}</p>
      </div>
    </Link>
  )
}

