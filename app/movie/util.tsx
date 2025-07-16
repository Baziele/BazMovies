import { Movie, MovieGenres, TvGenres } from "@/lib/types";

export async function getMovieDetails(id: string) {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
    };

    const url = `https://api.themoviedb.org/3/movie/${id}?include_adult=false&append_to_response=videos%2Cimages%2Csimilar%2Ccredits&language=en-US`;
    let res = await fetch(url, options);
    if (!res.ok) {
        return false;
    }
    let movieData = await res.json();
    let trailerUrl = "";
    if (movieData.videos?.results.length === 0) {
        trailerUrl = `https://www.youtube.com/embed/dQw4w9WgXcQ`;
    } else {
        const trailer = movieData.videos?.results.filter(
            (v: any) => v.type === "Trailer" && v.site === "YouTube"
        )[0];
        if (!trailer) {
            trailerUrl = `https://www.youtube.com/embed/dQw4w9WgXcQ`;
        } else trailerUrl = `https://www.youtube.com/embed/${trailer.key}`;
    }

    const movie: Movie = {
        id: movieData.id.toString(),
        title: movieData.title,
        description: movieData.overview,
        year: new Date(movieData.release_date).getFullYear(),
        genre: movieData.genres.map((g: any) => g.name),
        duration: `${Math.floor(movieData.runtime / 60)}h ${
            movieData.runtime % 60
        }m`,
        rating: Math.round(movieData.vote_average),
        posterUrl: `https://image.tmdb.org/t/p/original${movieData.poster_path}`,
        backdropUrl: `https://image.tmdb.org/t/p/original${movieData.backdrop_path}`,
        videoUrl: "#",
        trailerUrl: trailerUrl,
        studio: movieData.production_companies?.[0]?.name || "Unknown",
        language: movieData.original_language,
        awards: movieData.awards || "N/A",
        budget: movieData.budget,
        boxOffice: movieData.revenue,
        mpaaRating:
            movieData.release_dates?.results?.find(
                (r: any) => r.iso_3166_1 === "US"
            )?.release_dates?.[0]?.certification || "N/A",
        filmingLocations:
            movieData.production_countries?.map((c: any) => c.name) || [],
        type: "movie",
        cast:
            movieData.credits?.cast?.slice(0, 8)?.map((c: any) => ({
                id: c.id.toString(),
                name: c.name,
                character: c.character,
                photoUrl: c.profile_path
                    ? `https://image.tmdb.org/t/p/original${c.profile_path}`
                    : "/placeholder.svg?height=200&width=200",
            })) || [],
        adult: movieData.adult,
        crew:
            movieData.credits?.crew?.map((m: any) => {
                return {
                    gender: m.gender,
                    id: m.id,
                    name: m.name,
                    profile_path: m.profile_path,
                    job: m.job,
                };
            }) || [],
        similarMovies: movieData.similar.results.map((m: any) => ({
            id: m.id,
            title: m.title,
            description: m.overview,
            year: new Date(m.release_date).getFullYear(),
            posterUrl: `https://image.tmdb.org/t/p/original${m.poster_path}`,
            backdropUrl: `https://image.tmdb.org/t/p/original${m.backdrop_path}`,
            type: m.media_type,
            adult: m.adult,
            genre:
                m.media_type === "movie"
                    ? m.genre_ids.map((g: any) => MovieGenres[g])
                    : m.genre_ids.map((g: any) => TvGenres[g]),
            language: m.original_language,
            rating: Math.round(m.vote_average),
        })),
    };
    // console.log(movie.similarMovies);
    return movie;
}
