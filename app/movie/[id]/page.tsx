import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Star,
    Award,
    Play,
    Share2,
    Heart,
    Plus,
    ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MovieCard } from "@/components/movie-card";
import { CastMember } from "@/components/cast-member";
import { allMovies } from "@/lib/data";
import { cn } from "@/lib/utils";
import { getMovieDetails } from "../util";
import PhotoGallery from "@/components/ui/photo-gallery";

export default async function MovieDetails({
    params,
}: {
    params: { id: string };
}) {
    const { id } = await params;
    const movie = await getMovieDetails(id);

    if (!movie) {
        return <div className="container py-10">Movie not found</div>;
    }

    // Check if it's a TV show
    const isTvShow = movie.type === "tv";

    // Movie media gallery - simulated images
    const movieMedia = [
        {
            type: "image",
            url: "/placeholder.svg?height=720&width=1280",
            alt: "Movie scene 1",
        },
        {
            type: "image",
            url: "/placeholder.svg?height=720&width=1280",
            alt: "Movie scene 2",
        },
        {
            type: "image",
            url: "/placeholder.svg?height=720&width=1280",
            alt: "Movie scene 3",
        },
        {
            type: "image",
            url: "/placeholder.svg?height=720&width=1280",
            alt: "Behind the scenes",
        },
        {
            type: "image",
            url: "/placeholder.svg?height=720&width=1280",
            alt: "Movie poster",
        },
    ];

    return (
        <main className="min-h-screen bg-background">
            {/* Hero Section with Backdrop */}
            <section className="relative h-[50vh] md:h-[70vh] overflow-hidden">
                <Image
                    src={movie.backdropUrl || "/placeholder.svg"}
                    alt={movie.title}
                    fill
                    className="object-cover animate-ken-burns"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                    <div className="container">
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="relative hidden md:block flex-shrink-0 animate-float">
                                <Image
                                    src={movie.posterUrl || "/placeholder.svg"}
                                    alt={movie.title}
                                    width={250}
                                    height={375}
                                    className="rounded-lg shadow-lg"
                                />
                            </div>

                            <div className="flex-1">
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-white drop-shadow-md animate-fade-in">
                                    {movie.title}
                                </h1>

                                <div
                                    className="flex flex-wrap items-center gap-3 mb-4 animate-fade-in-up"
                                    style={{ animationDelay: "0.2s" }}
                                >
                                    <Badge
                                        variant="secondary"
                                        className="font-medium"
                                    >
                                        {movie.mpaaRating || "PG-13"}
                                    </Badge>

                                    {movie.genre.map((genre) => (
                                        <Badge
                                            variant="outline"
                                            key={genre}
                                            className="text-white border-white/30"
                                        >
                                            {genre}{" "}
                                        </Badge>
                                    ))}

                                    <span className="text-white/80 text-sm">
                                        {movie.year.toString()}
                                    </span>
                                    <span className="text-white/80 text-sm">
                                        {movie.duration}
                                    </span>
                                </div>

                                <div
                                    className="flex items-center mb-6 animate-fade-in-up"
                                    style={{ animationDelay: "0.3s" }}
                                >
                                    <div className="flex items-center mr-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={cn(
                                                    "h-5 w-5 mr-0.5",
                                                    i <
                                                        Math.floor(
                                                            movie.rating / 2
                                                        )
                                                        ? "text-yellow-400 fill-yellow-400"
                                                        : "text-gray-400"
                                                )}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-white font-medium">
                                        {movie.rating}/10
                                    </span>
                                </div>

                                <p
                                    className="text-white/90 max-w-3xl mb-6 text-lg animate-fade-in-up"
                                    style={{ animationDelay: "0.4s" }}
                                >
                                    {movie.description}
                                </p>

                                <div
                                    className="flex flex-wrap gap-3 animate-fade-in-up"
                                    style={{ animationDelay: "0.5s" }}
                                >
                                    <Button
                                        size="lg"
                                        asChild
                                        className="group animate-pulse-subtle"
                                    >
                                        <Link
                                            href={
                                                isTvShow
                                                    ? `/watch/${movie.id}/1/1`
                                                    : `/watch/${movie.id}`
                                            }
                                        >
                                            <Play className="mr-2 h-4 w-4 group-hover:animate-ping-once" />{" "}
                                            {isTvShow
                                                ? "Watch First Episode"
                                                : "Watch Now"}
                                        </Link>
                                    </Button>

                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="group"
                                    >
                                        <Plus className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />{" "}
                                        Add to Watchlist
                                    </Button>

                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="rounded-full hover:animate-pulse"
                                    >
                                        <Heart className="h-5 w-5 hover:fill-red-500 hover:text-red-500 transition-colors" />
                                        <span className="sr-only">
                                            Add to favorites
                                        </span>
                                    </Button>

                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="rounded-full hover:animate-pulse"
                                    >
                                        <Share2 className="h-5 w-5 hover:rotate-45 transition-transform duration-300" />
                                        <span className="sr-only">Share</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Overview Section */}
            <section className="container py-8">
                <h2 className="text-2xl font-bold mb-6">Overview</h2>

                <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-8">
                    <div className="space-y-6">
                        <div className="animate-fade-in-up">
                            <h3 className="text-xl font-bold mb-4">Synopsis</h3>
                            <p className="text-lg">{movie.description}</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="md:hidden animate-float">
                            <Image
                                src={movie.posterUrl || "/placeholder.svg"}
                                alt={movie.title}
                                width={300}
                                height={450}
                                className="rounded-lg shadow-lg mx-auto"
                            />
                        </div>
                        <div className="border rounded-lg p-4 space-y-4 hover:shadow-md transition-shadow animate-fade-in">
                            <h3 className="font-bold text-lg">Details</h3>

                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Release Date:
                                </span>
                                <span>{movie.year.toString()}</span>
                            </div>

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

                            {movie.language && (
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Language:
                                    </span>
                                    <span>{movie.language}</span>
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
                                                    className="text-sm bg-muted px-2 py-1 rounded hover:bg-primary/10 transition-colors cursor-pointer"
                                                >
                                                    {location}
                                                </span>
                                            )
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div
                            className="border rounded-lg p-4 hover:shadow-md transition-shadow animate-fade-in"
                            style={{ animationDelay: "0.2s" }}
                        >
                            <h3 className="font-bold text-lg mb-3">Share</h3>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 hover:bg-blue-500 hover:text-white transition-colors"
                                >
                                    Facebook
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 hover:bg-sky-500 hover:text-white transition-colors"
                                >
                                    Twitter
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 hover:bg-primary hover:text-white transition-colors"
                                >
                                    Copy Link
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Media Section */}
            <section className="container py-8 border-t">
                <h2 className="text-2xl font-bold mb-6">Media</h2>

                <div className="space-y-6">
                    {/* Trailer */}
                    <div className="animate-fade-in-up">
                        <h3 className="text-xl font-bold mb-4">Trailer</h3>
                        <div className="aspect-video max-w-4xl mx-auto bg-black rounded-lg overflow-hidden shadow-lg">
                            <iframe
                                src={movie.trailerUrl}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title={`${movie.title} Trailer`}
                            />
                        </div>
                    </div>

                    {/* Photo Gallery */}
                    <PhotoGallery movieMedia={movieMedia} />
                </div>
            </section>

            {/* Cast Section */}
            <section className="container py-8 border-t">
                <h2 className="text-2xl font-bold mb-6">Cast & Crew</h2>

                <div className="space-y-8">
                    <div className="animate-fade-in-up">
                        <h3 className="text-xl font-bold mb-4">Cast</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                            {(movie.cast || []).length > 0
                                ? (movie.cast || []).map((cast) => (
                                      <CastMember key={cast.id} cast={cast} />
                                  ))
                                : [...Array(12)].map((_, i) => (
                                      <CastMember
                                          key={i}
                                          cast={{
                                              id: `placeholder-${i}`,
                                              name: `Actor ${i + 1}`,
                                              character: `Character ${i + 1}`,
                                              photoUrl:
                                                  "/placeholder.svg?height=200&width=200",
                                          }}
                                      />
                                  ))}
                        </div>
                    </div>

                    <div
                        className="animate-fade-in-up"
                        style={{ animationDelay: "0.2s" }}
                    >
                        <h3 className="text-xl font-bold mb-4">Crew</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {(movie.crew || []).filter(
                                (crew_m) => crew_m.job === "Director"
                            ).length > 0 && (
                                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <h4 className="font-medium text-muted-foreground mb-1">
                                        Director
                                    </h4>
                                    <span className="font-bold">
                                        {(movie.crew || [])
                                            .filter(
                                                (crew_m) =>
                                                    crew_m.job === "Director"
                                            )
                                            .map((director) => (
                                                <p key={director.id}>
                                                    {director.name}
                                                </p>
                                            ))}
                                    </span>
                                </div>
                            )}

                            {(movie.crew || []).filter(
                                (crew_m) => crew_m.job === "Writer"
                            ).length > 0 && (
                                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <h4 className="font-medium text-muted-foreground mb-1">
                                        Writers
                                    </h4>
                                    <span className="font-bold">
                                        {(movie.crew || [])
                                            .filter(
                                                (crew_m) =>
                                                    crew_m.job === "Writer"
                                            )
                                            .map((writer) => (
                                                <p key={writer.id}>
                                                    {writer.name}
                                                </p>
                                            ))}
                                    </span>
                                </div>
                            )}

                            {(movie.crew || []).filter(
                                (crew_m) => crew_m.job === "Producer"
                            ).length > 0 && (
                                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <h4 className="font-medium text-muted-foreground mb-1">
                                        Producer
                                    </h4>
                                    <span className="font-bold">
                                        {(movie.crew || [])
                                            .filter(
                                                (crew_m) =>
                                                    crew_m.job === "Producer"
                                            )
                                            .map((producer) => (
                                                <p key={producer.id}>
                                                    {producer.name}
                                                </p>
                                            ))}
                                    </span>
                                </div>
                            )}

                            {(movie.crew || []).filter(
                                (crew_m) => crew_m.job === "Editor"
                            ).length > 0 && (
                                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <h4 className="font-medium text-muted-foreground mb-1">
                                        Editor
                                    </h4>
                                    <span className="font-bold">
                                        {(movie.crew || [])
                                            .filter(
                                                (crew_m) =>
                                                    crew_m.job === "Editor"
                                            )
                                            .map((editor) => (
                                                <p key={editor.id}>
                                                    {editor.name}
                                                </p>
                                            ))}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Similar Movies */}
            <section className="container py-8 border-t">
                <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>

                <div className="animate-fade-in-up">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {movie?.similarMovies?.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>

                    <div className="mt-6 text-center">
                        <Button asChild>
                            <Link
                                href={`/search?genre=${movie.genre}`}
                                className="flex items-center gap-2"
                            >
                                See more {movie.genre} movies{" "}
                                <ChevronRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
}
