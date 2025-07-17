"use server";

import { MovieGenres, TvGenres, Movie } from "@/lib/types";

export async function getSearchSuggestions(query: string) {
    if (query.trim() === "") {
        return [];
    }

    const url = `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`;
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
    };

    let res = await fetch(url, options);
    if (!res.ok) {
        return [];
    }
    let results = await res.json();

    results = results.results.filter(
        (item: any) => item.media_type === "movie" || item.media_type === "tv"
    );
    results = results.map((m: any) => ({
        id: m.id,
        title: m.media_type === "movie" ? m.title : m.name,
        description: m.overview,
        year:
            m.media_type === "movie"
                ? new Date(m.release_date).getFullYear()
                : new Date(m.first_air_date).getFullYear(),
        posterUrl: `https://image.tmdb.org/t/p/w45${m.poster_path}`,
        backdropUrl: `https://image.tmdb.org/t/p/original${m.backdrop_path}`,
        type: m.media_type,
        adult: m.adult,
        genre:
            m.media_type === "movie"
                ? m.genre_ids.map((g: any) => MovieGenres[g])
                : m.genre_ids.map((g: any) => TvGenres[g]),
        language: m.original_language,
        rating: Math.round(m.vote_average),
    }));
    return results.slice(0, 5);
}
