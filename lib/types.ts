export interface Movie {
  id: string
  title: string
  description: string
  year: number
  genre: string
  duration: string
  rating: number
  posterUrl: string
  backdropUrl: string
  videoUrl: string
  trailerUrl: string
  cast: Cast[]
  director?: string
  writers?: string
  studio?: string
  language?: string
  awards?: string
  budget?: number
  boxOffice?: number
  mpaaRating?: string
  filmingLocations?: string[]
  type?: "movie" | "tv"
}

export interface Cast {
  id: string
  name: string
  character: string
  photoUrl: string
}

export interface News {
  id: string
  title: string
  summary: string
  date: string
  category: string
  imageUrl: string
  readTime?: number
}

export interface FeaturedNews extends News {
  relatedNews: {
    title: string
    category: string
    date: string
    imageUrl: string
  }[]
}

export interface UpcomingMovie {
  id: string
  title: string
  description: string
  releaseDate: string
  imageUrl: string
}

export interface Episode {
  episodeNumber: number
  title: string
  description: string
  duration: string
  imageUrl: string
  videoUrl: string
}

export interface Season {
  seasonNumber: number
  episodes: Episode[]
}

export interface TvSeasons {
  [showId: string]: Season[]
}

