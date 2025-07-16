import { Movie } from "@/lib/types";

export async function getFeaturedMovies(): Promise<Movie[]> {
    const trendingUrl =
        "https://api.themoviedb.org/3/trending/movie/week?language=en-US";
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
    };

    const detailUrl = "https://api.themoviedb.org/3/movie/";

    const res = await (await fetch(trendingUrl, options)).json();

    const featuredMovies: Movie[] = await Promise.all(
        res.results.map(async (movie: any) => {
            const details = await (
                await fetch(
                    `${detailUrl}/${movie.id}?append_to_response=videos&language=en-US`,
                    options
                )
            ).json();
            let trailer = details.videos?.results.filter(
                (v: any) => v.type === "Trailer" && v.site === "YouTube"
            )[0];
            if (!trailer) {
                trailer = `https://www.youtube.com/embed/dQw4w9WgXcQ`;
            } else trailer = `https://www.youtube.com/embed/${trailer.key}`;
            return {
                id: movie.id.toString(),
                title: movie.title,
                description: movie.overview,
                year: new Date(movie.release_date).getFullYear(),
                genre: details.genres.map((g: any) => g.name),
                duration: `${Math.floor(details.runtime / 60)}h ${
                    details.runtime % 60
                }m`,
                rating: Math.round(movie.vote_average),
                posterUrl: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
                backdropUrl: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
                videoUrl: "#",
                trailerUrl: trailer,
                studio: details.production_companies?.[0]?.name || "Unknown",
                language: details.original_language,
                awards: details.awards || "N/A",
                budget: details.budget,
                boxOffice: details.revenue,
                mpaaRating:
                    details.release_dates?.results?.find(
                        (r: any) => r.iso_3166_1 === "US"
                    )?.release_dates?.[0]?.certification || "N/A",
                filmingLocations:
                    details.production_countries?.map((c: any) => c.name) || [],
                type: "movie",
                cast:
                    details.credits?.cast?.slice(0, 8)?.map((c: any) => ({
                        id: c.id.toString(),
                        name: c.name,
                        character: c.character,
                        photoUrl: c.profile_path
                            ? `https://image.tmdb.org/t/p/original${c.profile_path}`
                            : "/placeholder.svg?height=200&width=200",
                    })) || [],
                adult: details.adult,
            };
        })
    );
    return featuredMovies;
}

export async function getMovieList(
    genre: string,
    isMovieList: boolean = true,
    keywords: string = ""
): Promise<Movie[]> {
    let url = "";
    if (isMovieList) {
        url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}`;
    } else {
        url = `https://api.themoviedb.org/3/discover/tv?include_adult=true&include_video=false&language=en-US&page=1&sort_by=vote_count.desc&with_genres=${genre}&with_keywords=${keywords}`;
    }
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
    };

    const res = await (await fetch(url, options)).json();
    const movieList = res.results.map((movie: any) => {
        return {
            id: movie.id.toString(),
            title: isMovieList ? movie.title : movie.name,
            description: movie.overview,
            year: isMovieList
                ? new Date(movie.release_date).getFullYear()
                : new Date(movie.first_air_date).getFullYear(),
            genre: genre,
            rating: Math.round(movie.vote_average),
            posterUrl: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
            backdropUrl: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
            language: movie.original_language,
            type: isMovieList ? "movie" : "tv",
            adult: movie.adult,
        };
    });

    return movieList;
}
