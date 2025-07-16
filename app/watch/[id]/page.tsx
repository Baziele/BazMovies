import Image from "next/image";
import Link from "next/link";
import { Star, Clock, Calendar, Award, ChevronLeft } from "lucide-react";
import { VideoPlayer } from "@/components/video-player";
import { MovieCard } from "@/components/movie-card";
import { CastMember } from "@/components/cast-member";
import { allMovies } from "@/lib/data";
import { cn } from "@/lib/utils";
import { getMovieDetails } from "./getMovieDetails";
import { Badge } from "@/components/ui/badge";

export default async function WatchMovie({
    params,
}: {
    params: { id: string };
}) {
    const id = params.id;
    const movie = await getMovieDetails(id);

    if (!movie) {
        return <div className="container py-10">Movie not found</div>;
    }

    return (
        <main className="min-h-screen bg-background">
            {/* Video Player */}
            <section className=" aspect-video w-5/6 m-auto h-full bg-black">
                {/* <VideoPlayer videoUrl={movie.videoUrl} /> */}
                <iframe
                    src={movie.videoUrl}
                    className="w-full h-full"
                    allowFullScreen
                    referrerPolicy="origin"
                ></iframe>
            </section>

            {/* Movie Information */}
            <section className="container py-8">
                <div className="flex items-center gap-2 mb-4">
                    <Link
                        href={`/movie/${movie.id}`}
                        className="text-sm text-primary hover:underline flex items-center"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Back to movie details
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">
                            {movie.title}
                        </h1>

                        {/* Ratings and basic info */}
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={cn(
                                            "h-5 w-5 mr-0.5",
                                            i < Math.floor(movie.rating / 2)
                                                ? "text-yellow-400 fill-yellow-400"
                                                : "text-gray-400"
                                        )}
                                    />
                                ))}
                                <span className="ml-1 font-medium">
                                    {movie.rating}/10
                                </span>
                            </div>

                            {movie.genre.map((genre) => (
                                <Badge
                                    variant="outline"
                                    key={genre}
                                    className="text-white border-white/30"
                                >
                                    {genre}{" "}
                                </Badge>
                            ))}

                            <div className="flex items-center text-muted-foreground">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span>{movie.year}</span>
                            </div>

                            <div className="flex items-center text-muted-foreground">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>{movie.duration}</span>
                            </div>
                        </div>

                        {/* Movie details */}
                        <div className="space-y-6 mb-8">
                            <div>
                                <h2 className="text-2xl font-bold mb-2">
                                    Synopsis
                                </h2>
                                <p className="text-lg">{movie.description}</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {movie.studio && (
                                    <div>
                                        <h3 className="font-semibold text-muted-foreground mb-1">
                                            Studio
                                        </h3>
                                        <p>{movie.studio}</p>
                                    </div>
                                )}

                                {movie.language && (
                                    <div>
                                        <h3 className="font-semibold text-muted-foreground mb-1">
                                            Language
                                        </h3>
                                        <p>{movie.language}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Cast section */}
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Cast</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
                                {(movie.cast || []).length > 0
                                    ? (movie.cast || []).map((cast) => (
                                          <CastMember
                                              key={cast.id}
                                              cast={cast}
                                          />
                                      ))
                                    : [...Array(12)].map((_, i) => (
                                          <CastMember
                                              key={i}
                                              cast={{
                                                  id: `placeholder-${i}`,
                                                  name: `Actor ${i + 1}`,
                                                  character: `Character ${
                                                      i + 1
                                                  }`,
                                                  photoUrl:
                                                      "/placeholder.svg?height=200&width=200",
                                              }}
                                          />
                                      ))}
                            </div>
                        </div>
                    </div>

                    <div>
                        <Image
                            src={movie.posterUrl || "/placeholder.svg"}
                            alt={movie.title}
                            width={300}
                            height={450}
                            className="rounded-lg w-full h-auto object-cover shadow-lg mb-6"
                        />

                        {/* Additional movie details */}
                        <div className="space-y-4 border rounded-lg p-4">
                            <h3 className="font-bold text-lg mb-2">
                                Movie Details
                            </h3>

                            {movie.budget && (
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Budget:
                                    </span>
                                    <span>
                                        ${movie.budget.toLocaleString()}
                                    </span>
                                </div>
                            )}

                            {movie.boxOffice && (
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Box Office:
                                    </span>
                                    <span>
                                        ${movie.boxOffice.toLocaleString()}
                                    </span>
                                </div>
                            )}

                            {movie.budget && movie.boxOffice && (
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Profit:
                                    </span>
                                    <span
                                        className={
                                            movie.boxOffice - movie.budget > 0
                                                ? "text-green-500"
                                                : "text-red-500"
                                        }
                                    >
                                        $
                                        {(
                                            movie.boxOffice - movie.budget
                                        ).toLocaleString()}
                                    </span>
                                </div>
                            )}

                            {movie.mpaaRating && (
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        MPAA Rating:
                                    </span>
                                    <span>{movie.mpaaRating}</span>
                                </div>
                            )}

                            {movie.filmingLocations && (
                                <div>
                                    <h4 className="text-muted-foreground mb-1">
                                        Filming Locations:
                                    </h4>
                                    <div className="flex flex-wrap gap-1">
                                        {movie.filmingLocations.map(
                                            (location, index) => (
                                                <span
                                                    key={index}
                                                    className="text-sm bg-muted px-2 py-1 rounded"
                                                >
                                                    {location}
                                                </span>
                                            )
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Similar Movies */}
            <section className="container py-8 bg-muted/50">
                <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {movie?.similarMovies?.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </section>
        </main>
    );
}
