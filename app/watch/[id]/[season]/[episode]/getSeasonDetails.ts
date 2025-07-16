import { Season } from "@/lib/types";

export async function getSeasonDetails({
    id,
    seasonNumber,
}: {
    id: string;
    seasonNumber: number;
}) {
    const url = `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?language=en-US`;
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
    const season = await res.json();

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
                videoUrl: `https://vidsrc.me/embed/tv?tmdb=${id}&season=${seasonNumber}&episode=${episode.episode_number}`,
            };
        }),
    };
}
