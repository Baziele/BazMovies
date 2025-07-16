import { MovieGenres, Show, TvGenres } from "@/lib/types";

export async function getShowDetails(id: string) {
    const url = `https://api.themoviedb.org/3/tv/${id}?append_to_response=videos%2Cimages%2Csimilar%2Ccredits%2Ccontent_ratings&language=en-US`;
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
    };

    let res = await fetch(url, options);
    if (!res.ok) {
        return false;
    }
    let showData = await res.json();

    for (let i = 0; i < showData.seasons.length; i++) {
        const seasonUrl = `https://api.themoviedb.org/3/tv/${id}/season/${showData.seasons[i].season_number}?language=en-US`;

        let seasons = await (await fetch(seasonUrl, options)).json();
        showData.seasons[i]["episodes"] = seasons.episodes;
    }
    let trailerUrl = "";
    if (showData.videos?.results.length === 0) {
        trailerUrl = `https://www.youtube.com/embed/dQw4w9WgXcQ`;
    } else {
        const trailer = showData.videos?.results.filter(
            (v: any) => v.type === "Trailer" && v.site === "YouTube"
        )[0];
        if (!trailer) {
            trailerUrl = `https://www.youtube.com/embed/dQw4w9WgXcQ`;
        } else trailerUrl = `https://www.youtube.com/embed/${trailer.key}`;
    }
    console.log(showData);
    const show: Show = {
        id: showData.id.toString(),
        title: showData.name,
        description: showData.overview,
        year: new Date(showData.first_air_date).getFullYear(),
        genre: showData.genres.map((g: any) => g.name),
        duration:
            /* `${Math.floor(showData.runtime / 60)}h ${showData.runtime % 60}m` */ "30m",
        rating: Math.round(showData.vote_average),
        posterUrl: `https://image.tmdb.org/t/p/original${showData.poster_path}`,
        backdropUrl: `https://image.tmdb.org/t/p/original${showData.backdrop_path}`,
        videoUrl: "#",
        trailerUrl: trailerUrl,
        seasons: showData.seasons.map((season: any) => {
            return {
                id: season.id.toString(),
                title: season.name,
                description: season.overview,
                posterUrl: `https://image.tmdb.org/t/p/original${season.poster_path}`,
                rating: Math.round(season.vote_average),
                releaseDate: season.first_air_date,
                seasonNumber: season.season_number,
                episodeCount: season.episode_count,
                episodes: season.episodes.map((episode: any) => {
                    return {
                        episodeNumber: episode.episode_number,
                        title: episode.name,
                        description: episode.overview,
                        seasonNumber: episode.season_number,
                        showId: episode.show_id.toString(),
                        rating: Math.round(episode.vote_average),
                        duration: episode.runtime,
                        posterUrl: episode.still_path
                            ? `https://image.tmdb.org/t/p/original${episode.still_path}`
                            : `https://image.tmdb.org/t/p/original${season.poster_path}`,
                        videoUrl: "#",
                    };
                }),
            };
        }),
        studio: showData.production_companies?.[0]?.name || "Unknown",
        language: showData.original_language,
        awards: showData.awards || "N/A",
        mpaaRating:
            showData.content_ratings.results.length > 0
                ? showData.content_ratings.results[0].rating
                : false || "N/A",
        filmingLocations:
            showData.production_countries?.map((c: any) => c.name) || [],
        type: "tv",
        cast:
            showData.credits?.cast?.slice(0, 8)?.map((c: any) => ({
                id: c.id.toString(),
                name: c.name,
                character: c.character,
                photoUrl: c.profile_path
                    ? `https://image.tmdb.org/t/p/original${c.profile_path}`
                    : "/placeholder.svg?height=200&width=200",
            })) || [],
        adult: showData.adult,
        crew:
            showData.credits?.crew?.map((m: any) => {
                return {
                    gender: m.gender,
                    id: m.id,
                    name: m.name,
                    profile_path: m.profile_path,
                    job: m.job,
                };
            }) || [],
        seasonCount: showData.number_of_seasons,
        episodeCount: showData.number_of_episodes,
        similarShows: showData.similar.results.map((m: any) => ({
            id: m.id,
            title: m.name,
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
    console.log(show.title, showData.title);
    return show;
}
