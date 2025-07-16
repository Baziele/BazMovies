import Image from "next/image";
import Link from "next/link";
import {
    Star,
    Award,
    Play,
    Share2,
    Heart,
    Bookmark,
    Plus,
    ChevronRight,
    ChevronLeft,
    X,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MovieCard } from "@/components/movie-card";
import { CastMember } from "@/components/cast-member";
import { allMovies, tvSeasons } from "@/lib/data";
import { cn } from "@/lib/utils";
import { getShowDetails } from "./utils";
import PhotoGallery from "@/components/ui/photo-gallery";
import EpisodeList from "@/components/episode-list";

export default async function TvShowDetails({
    params,
}: {
    params: { id: string };
}) {
    const { id } = await params;
    const show = await getShowDetails(id);

    if (!show) {
        return <div className="container py-10">Movie not found</div>;
    }

    // // Find the TV show by ID
    // const show = allMovies.find((m) => m.id === params.id && m.type === "tv")

    // Find similar shows (same genre)

    if (!show) {
        return <div className="container py-10">TV Show not found</div>;
    }

    // Show media gallery - simulated images
    const showMedia = [
        {
            type: "image",
            url: "/placeholder.svg?height=720&width=1280",
            alt: "Show scene 1",
        },
        {
            type: "image",
            url: "/placeholder.svg?height=720&width=1280",
            alt: "Show scene 2",
        },
        {
            type: "image",
            url: "/placeholder.svg?height=720&width=1280",
            alt: "Show scene 3",
        },
        {
            type: "image",
            url: "/placeholder.svg?height=720&width=1280",
            alt: "Behind the scenes",
        },
        {
            type: "image",
            url: "/placeholder.svg?height=720&width=1280",
            alt: "Show poster",
        },
    ];

    return (
        <main className="min-h-screen bg-background">
            {/* Hero Section with Backdrop */}
            <section className="relative h-[50vh] md:h-[70vh] overflow-hidden">
                <Image
                    src={show.backdropUrl || "/placeholder.svg"}
                    alt={show.title}
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
                                    src={show.posterUrl || "/placeholder.svg"}
                                    alt={show.title}
                                    width={250}
                                    height={375}
                                    className="rounded-lg shadow-lg"
                                />
                            </div>

                            <div className="flex-1">
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-white drop-shadow-md animate-fade-in">
                                    {show.title}
                                </h1>

                                <div
                                    className="flex flex-wrap items-center gap-3 mb-4 animate-fade-in-up"
                                    style={{ animationDelay: "0.2s" }}
                                >
                                    <Badge
                                        variant="secondary"
                                        className="font-medium"
                                    >
                                        {show.mpaaRating || "TV-MA"}
                                    </Badge>
                                    <Badge
                                        variant="outline"
                                        className="text-white border-white/30"
                                    >
                                        {show.genre}
                                    </Badge>
                                    <span className="text-white/80 text-sm">
                                        {show.year}
                                    </span>
                                    <span className="text-white/80 text-sm">
                                        {show.duration}
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
                                                            show.rating / 2
                                                        )
                                                        ? "text-yellow-400 fill-yellow-400"
                                                        : "text-gray-400"
                                                )}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-white font-medium">
                                        {show.rating}/10
                                    </span>
                                </div>

                                <p
                                    className="text-white/90 max-w-3xl mb-6 text-lg animate-fade-in-up"
                                    style={{ animationDelay: "0.4s" }}
                                >
                                    {show.description}
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
                                        <Link href={`/watch/${show.id}/1/1`}>
                                            <Play className="mr-2 h-4 w-4 group-hover:animate-ping-once" />{" "}
                                            Watch First Episode
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
                            <p className="text-lg">{show.description}</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="md:hidden animate-float">
                            <Image
                                src={show.posterUrl || "/placeholder.svg"}
                                alt={show.title}
                                width={300}
                                height={450}
                                className="rounded-lg shadow-lg mx-auto"
                            />
                        </div>

                        <div className="border rounded-lg p-4 space-y-4 hover:shadow-md transition-shadow animate-fade-in">
                            <h3 className="font-bold text-lg">Details</h3>

                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    First Aired:
                                </span>
                                <span>{show.year}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Status:
                                </span>
                                <span>Running</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Seasons:
                                </span>
                                <span>{show.seasonCount}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Episodes:
                                </span>
                                <span>{show.episodeCount}</span>
                            </div>

                            {show.language && (
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Language:
                                    </span>
                                    <span>{show.language}</span>
                                </div>
                            )}

                            {show.filmingLocations && (
                                <div>
                                    <h4 className="text-muted-foreground mb-1">
                                        Filming Locations:
                                    </h4>
                                    <div className="flex flex-wrap gap-1">
                                        {show.filmingLocations.map(
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
                                src={show.trailerUrl}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title={`${show.title} Trailer`}
                            />
                        </div>
                    </div>

                    {/* Photo Gallery */}
                    <PhotoGallery movieMedia={showMedia} />
                </div>
            </section>

            {/* Episodes Section */}
            <section className="container py-8 border-t">
                <h2 className="text-2xl font-bold mb-6">Episodes</h2>
                <EpisodeList seasons={show.seasons} />
            </section>

            {/* Cast Section */}
            <section className="container py-8 border-t">
                <h2 className="text-2xl font-bold mb-6">Cast & Crew</h2>

                <div className="space-y-8">
                    <div className="animate-fade-in-up">
                        <h3 className="text-xl font-bold mb-4">Cast</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                            {(show.cast || []).length > 0
                                ? (show.cast || []).map((cast) => (
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
                            {(show.crew || []).filter(
                                (crew_m) => crew_m.job === "Director"
                            ).length > 0 && (
                                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <h4 className="font-medium text-muted-foreground mb-1">
                                        Director
                                    </h4>
                                    <p className="font-bold">
                                        {(show.crew || [])
                                            .filter(
                                                (crew_m) =>
                                                    crew_m.job === "Director"
                                            )
                                            .map((director) => (
                                                <p key={director.id}>
                                                    {director.name}
                                                </p>
                                            ))}
                                    </p>
                                </div>
                            )}

                            {(show.crew || []).filter(
                                (crew_m) => crew_m.job === "Writer"
                            ).length > 0 && (
                                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <h4 className="font-medium text-muted-foreground mb-1">
                                        Writers
                                    </h4>
                                    <p className="font-bold">
                                        {(show.crew || [])
                                            .filter(
                                                (crew_m) =>
                                                    crew_m.job === "Writer"
                                            )
                                            .map((writer) => (
                                                <p key={writer.id}>
                                                    {writer.name}
                                                </p>
                                            ))}
                                    </p>
                                </div>
                            )}

                            {(show.crew || []).filter(
                                (crew_m) => crew_m.job === "Producer"
                            ).length > 0 && (
                                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <h4 className="font-medium text-muted-foreground mb-1">
                                        Producer
                                    </h4>
                                    <p className="font-bold">
                                        {(show.crew || [])
                                            .filter(
                                                (crew_m) =>
                                                    crew_m.job === "Producer"
                                            )
                                            .map((producer) => (
                                                <p key={producer.id}>
                                                    {producer.name}
                                                </p>
                                            ))}
                                    </p>
                                </div>
                            )}

                            {(show.crew || []).filter(
                                (crew_m) => crew_m.job === "Editor"
                            ).length > 0 && (
                                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <h4 className="font-medium text-muted-foreground mb-1">
                                        Editor
                                    </h4>
                                    <p className="font-bold">
                                        {(show.crew || [])
                                            .filter(
                                                (crew_m) =>
                                                    crew_m.job === "Editor"
                                            )
                                            .map((editor) => (
                                                <p key={editor.id}>
                                                    {editor.name}
                                                </p>
                                            ))}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Similar Shows */}
            <section className="container py-8 border-t">
                <h2 className="text-2xl font-bold mb-6">Similar TV Shows</h2>

                <div className="animate-fade-in-up">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {show?.similarShows?.map((show) => (
                            <MovieCard key={show.id} movie={show} />
                        ))}
                    </div>

                    <div className="mt-6 text-center">
                        <Button asChild>
                            <Link
                                href={`/search?genre=${show.genre}&type=tv`}
                                className="flex items-center gap-2"
                            >
                                See more {show.genre} TV shows{" "}
                                <ChevronRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
}
