"use client";

import Image from "next/image";
import { Season } from "@/lib/types";
import { Bookmark, ChevronDown, ChevronUp, Play, Share2 } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const EpisodeList = ({ seasons }: { seasons: Season[] }) => {
    // console.log(seasons);
    // State for collapsible seasons
    const [expandedSeasons, setExpandedSeasons] = useState<number[]>([1]); // Default first season expanded

    const toggleSeason = (seasonNumber: number) => {
        setExpandedSeasons((prev) =>
            prev.includes(seasonNumber)
                ? prev.filter((s) => s !== seasonNumber)
                : [...prev, seasonNumber]
        );
    };

    return (
        <div className="space-y-6">
            {seasons.map((season) => (
                <div
                    key={season.seasonNumber}
                    className="border rounded-lg overflow-hidden animate-fade-in-up"
                >
                    <button
                        className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-colors"
                        onClick={() => toggleSeason(season.seasonNumber)}
                    >
                        <h3 className="text-xl font-bold flex items-center">
                            {season.title}
                        </h3>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                                {season.episodeCount} Episodes
                            </span>
                            {expandedSeasons.includes(season.seasonNumber) ? (
                                <ChevronUp className="h-5 w-5" />
                            ) : (
                                <ChevronDown className="h-5 w-5" />
                            )}
                        </div>
                    </button>

                    {expandedSeasons.includes(season.seasonNumber) && (
                        <div className="p-4 space-y-4 animate-accordion-down">
                            {season.episodes.map((episode) => (
                                <div
                                    key={episode.episodeNumber}
                                    className="border rounded-lg overflow-hidden hover:shadow-md transition-all hover:border-primary/30 group"
                                >
                                    <div className="flex flex-col md:flex-row">
                                        <div className="relative md:w-64 h-40">
                                            <Image
                                                src={
                                                    episode.posterUrl ||
                                                    "/placeholder.svg?height=300&width=500"
                                                }
                                                alt={episode.title}
                                                fill
                                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-start p-3">
                                                <Button
                                                    asChild
                                                    size="sm"
                                                    variant="secondary"
                                                >
                                                    <Link
                                                        href={`/watch/${episode.showId}/${season.seasonNumber}/${episode.episodeNumber}`}
                                                    >
                                                        <Play className="mr-1 h-3 w-3" />{" "}
                                                        Watch
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="p-4 flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="font-bold">
                                                    Episode{" "}
                                                    {episode.episodeNumber}
                                                </h4>
                                                <span className="text-sm text-muted-foreground">
                                                    {episode.duration}
                                                </span>
                                            </div>
                                            <h5 className="text-lg font-medium mb-2 group-hover:text-primary transition-colors">
                                                {episode.title}
                                            </h5>
                                            <p className="text-muted-foreground mb-4 line-clamp-2">
                                                {episode.description}
                                            </p>
                                            <div className="flex justify-between items-center">
                                                <Button asChild size="sm">
                                                    <Link
                                                        href={`/watch/${episode.showId}/${season.seasonNumber}/${episode.episodeNumber}`}
                                                    >
                                                        <Play className="mr-2 h-3 w-3" />{" "}
                                                        Watch
                                                    </Link>
                                                </Button>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 hover:bg-primary/10 transition-colors"
                                                    >
                                                        <Bookmark className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 hover:bg-primary/10 transition-colors"
                                                    >
                                                        <Share2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default EpisodeList;
