export interface Movie {
    id: string;
    title: string;
    description: string;
    year: number;
    genre: string[];
    duration: string;
    rating: number;
    posterUrl: string;
    backdropUrl: string;
    videoUrl: string;
    trailerUrl: string;
    cast?: Cast[];
    director?: string;
    crew?: Crew[];
    studio?: string;
    language?: string;
    awards?: string;
    budget?: number;
    boxOffice?: number;
    mpaaRating?: string;
    filmingLocations?: string[];
    type?: "movie" | "tv";
    adult?: boolean;
    similarMovies?: Movie[];
}

export interface Show {
    id: string;
    title: string;
    description: string;
    year: number;
    genre: string[];
    duration: string;
    rating: number;
    posterUrl: string;
    backdropUrl: string;
    videoUrl: string;
    trailerUrl: string;
    seasons: Season[];
    cast?: Cast[];
    director?: string;
    crew?: Crew[];
    studio?: string;
    language?: string;
    awards?: string;
    budget?: number;
    boxOffice?: number;
    mpaaRating?: string;
    filmingLocations?: string[];
    type?: "movie" | "tv";
    adult?: boolean;
    seasonCount: number;
    episodeCount: number;
    similarShows?: Show[];
}

export const MovieGenres: { id: number; name: string }[] = [
    {
        id: 28,
        name: "Action",
    },
    {
        id: 12,
        name: "Adventure",
    },
    {
        id: 16,
        name: "Animation",
    },
    {
        id: 35,
        name: "Comedy",
    },
    {
        id: 80,
        name: "Crime",
    },
    {
        id: 99,
        name: "Documentary",
    },
    {
        id: 18,
        name: "Drama",
    },
    {
        id: 10751,
        name: "Family",
    },
    {
        id: 14,
        name: "Fantasy",
    },
    {
        id: 36,
        name: "History",
    },
    {
        id: 27,
        name: "Horror",
    },
    {
        id: 10402,
        name: "Music",
    },
    {
        id: 9648,
        name: "Mystery",
    },
    {
        id: 10749,
        name: "Romance",
    },
    {
        id: 878,
        name: "Science Fiction",
    },
    {
        id: 10770,
        name: "TV Movie",
    },
    {
        id: 53,
        name: "Thriller",
    },
    {
        id: 10752,
        name: "War",
    },
    {
        id: 37,
        name: "Western",
    },
];

export const TvGenres: { id: number; name: string }[] = [
    {
        id: 10759,
        name: "Action & Adventure",
    },
    {
        id: 16,
        name: "Animation",
    },
    {
        id: 35,
        name: "Comedy",
    },
    {
        id: 80,
        name: "Crime",
    },
    {
        id: 99,
        name: "Documentary",
    },
    {
        id: 18,
        name: "Drama",
    },
    {
        id: 10751,
        name: "Family",
    },
    {
        id: 10762,
        name: "Kids",
    },
    {
        id: 9648,
        name: "Mystery",
    },
    {
        id: 10763,
        name: "News",
    },
    {
        id: 10764,
        name: "Reality",
    },
    {
        id: 10765,
        name: "Sci-Fi & Fantasy",
    },
    {
        id: 10766,
        name: "Soap",
    },
    {
        id: 10767,
        name: "Talk",
    },
    {
        id: 10768,
        name: "War & Politics",
    },
    {
        id: 37,
        name: "Western",
    },
];

export interface Cast {
    id: string;
    name: string;
    character: string;
    photoUrl: string;
}

export interface Crew {
    gender: number;
    id: string;
    name: string;
    profile_path: string;
    job: string;
}

export interface News {
    id: string;
    title: string;
    summary: string;
    date: string;
    category: string;
    imageUrl: string;
    readTime?: number;
}

export interface FeaturedNews extends News {
    relatedNews: {
        title: string;
        category: string;
        date: string;
        imageUrl: string;
    }[];
}

export interface UpcomingMovie {
    id: string;
    title: string;
    description: string;
    releaseDate: string;
    imageUrl: string;
}

export interface Episode {
    episodeNumber: number;
    title: string;
    description: string;
    seasonNumber: number;
    showId: string;
    rating: number;
    duration: string;
    posterUrl: string;
    videoUrl: string;
}

export interface Season {
    id: string;
    title: string;
    description: string;
    posterUrl: string;
    rating: number;
    releaseDate: string;
    seasonNumber: number;
    episodeCount: number;
    episodes: Episode[];
}
