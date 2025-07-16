"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { MovieCard } from "@/components/movie-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Search,
    Filter,
    X,
    Sparkles,
    Film,
    Calendar,
    Star,
    Clock,
} from "lucide-react";
import { allMovies } from "@/lib/data";
import type { Movie } from "@/lib/types";
import { cn } from "@/lib/utils";

// Define the list of genres
const genreList = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Music",
    "Mystery",
    "Romance",
    "Science Fiction",
    "TV Movie",
    "Thriller",
    "War",
    "Western",
];

export default function SearchPage() {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get("q") || "";
    const initialType = searchParams.get("type") || "all";
    const initialAiMode = searchParams.get("ai") === "true";

    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
    const [showFilters, setShowFilters] = useState(false);
    const [contentType, setContentType] = useState(initialType);
    const [aiMode, setAiMode] = useState(initialAiMode);
    const [aiPrompt, setAiPrompt] = useState("");
    const [isAiSearching, setIsAiSearching] = useState(false);
    const [aiResults, setAiResults] = useState<Movie[]>([]);

    // Filter states
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [yearRange, setYearRange] = useState<[number, number]>([1970, 2025]);
    const [ratingRange, setRatingRange] = useState<[number, number]>([0, 10]);
    const [sortBy, setSortBy] = useState<string>("relevance");

    // Handle genre selection
    const toggleGenre = (genre: string) => {
        setSelectedGenres((prev) =>
            prev.includes(genre)
                ? prev.filter((g) => g !== genre)
                : [...prev, genre]
        );
    };

    // Apply filters and search
    useEffect(() => {
        let results = [...allMovies];

        // Apply content type filter
        if (contentType === "movie") {
            results = results.filter(
                (item) => item.type === "movie" || !item.type
            ); // Default to movie if type not specified
        } else if (contentType === "tv") {
            results = results.filter((item) => item.type === "tv");
        }

        // Apply search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            results = results.filter(
                (movie) =>
                    movie.title.toLowerCase().includes(query) ||
                    movie.description.toLowerCase().includes(query)
            );
        }

        // Apply genre filter
        if (selectedGenres.length > 0) {
            results = results.filter((movie) =>
                selectedGenres.includes(movie.genre)
            );
        }

        // Apply year range filter
        results = results.filter(
            (movie) => movie.year >= yearRange[0] && movie.year <= yearRange[1]
        );

        // Apply rating filter
        results = results.filter(
            (movie) =>
                movie.rating >= ratingRange[0] && movie.rating <= ratingRange[1]
        );

        // Apply sorting
        switch (sortBy) {
            case "title-asc":
                results.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case "title-desc":
                results.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case "year-desc":
                results.sort((a, b) => b.year - a.year);
                break;
            case "year-asc":
                results.sort((a, b) => a.year - b.year);
                break;
            case "rating-desc":
                results.sort((a, b) => b.rating - a.rating);
                break;
            default:
                // Default is relevance, which is already handled by the search
                break;
        }

        setFilteredMovies(results);
    }, [
        searchQuery,
        selectedGenres,
        yearRange,
        ratingRange,
        sortBy,
        contentType,
    ]);

    // Reset all filters
    const resetFilters = () => {
        setSelectedGenres([]);
        setYearRange([1970, 2025]);
        setRatingRange([0, 10]);
        setSortBy("relevance");
    };

    // Set page title based on content type
    const getPageTitle = () => {
        if (aiMode) {
            return "AI-Powered Search";
        } else if (searchQuery) {
            return `Search Results for "${searchQuery}"`;
        } else if (contentType === "movie") {
            return "Movies";
        } else if (contentType === "tv") {
            return "TV Shows";
        } else {
            return "Search";
        }
    };

    // Handle AI search
    const handleAiSearch = () => {
        if (!aiPrompt.trim()) return;

        setIsAiSearching(true);

        // Simulate AI processing
        setTimeout(() => {
            // This is a mock implementation - in a real app, you would call an AI API
            const prompt = aiPrompt.toLowerCase();

            // Simple keyword matching for demo purposes
            const results = allMovies
                .filter((movie) => {
                    const description = movie.description.toLowerCase();
                    const title = movie.title.toLowerCase();
                    const genre = movie.genre.toLowerCase();

                    // Check for genre keywords
                    if (prompt.includes("action") && genre.includes("action"))
                        return true;
                    if (prompt.includes("drama") && genre.includes("drama"))
                        return true;
                    if (prompt.includes("comedy") && genre.includes("comedy"))
                        return true;
                    if (
                        prompt.includes("sci-fi") &&
                        (genre.includes("sci-fi") ||
                            genre.includes("science fiction"))
                    )
                        return true;

                    // Check for time period keywords
                    if (
                        prompt.includes("80s") &&
                        movie.year >= 1980 &&
                        movie.year < 1990
                    )
                        return true;
                    if (
                        prompt.includes("90s") &&
                        movie.year >= 1990 &&
                        movie.year < 2000
                    )
                        return true;
                    if (
                        prompt.includes("2000s") &&
                        movie.year >= 2000 &&
                        movie.year < 2010
                    )
                        return true;

                    // Check for plot elements in description
                    if (description.includes(prompt) || title.includes(prompt))
                        return true;

                    // Check for specific themes
                    if (
                        prompt.includes("space") &&
                        (description.includes("space") ||
                            title.includes("space"))
                    )
                        return true;
                    if (
                        prompt.includes("love") &&
                        (description.includes("love") ||
                            description.includes("romance"))
                    )
                        return true;
                    if (
                        prompt.includes("war") &&
                        (description.includes("war") || title.includes("war"))
                    )
                        return true;

                    return false;
                })
                .slice(0, 12); // Limit to 12 results

            setAiResults(results);
            setIsAiSearching(false);
        }, 1500);
    };

    // Toggle between AI and regular search
    const toggleSearchMode = () => {
        setAiMode(!aiMode);
        setAiResults([]);
        setAiPrompt("");
    };

    return (
        <main className="min-h-screen bg-background">
            <div className="container py-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <h1 className="text-3xl font-bold">{getPageTitle()}</h1>

                    <Button
                        variant="outline"
                        onClick={toggleSearchMode}
                        className={cn(
                            "flex items-center gap-2",
                            aiMode
                                ? "border-purple-500 text-purple-500 hover:bg-purple-500/10"
                                : ""
                        )}
                    >
                        {aiMode ? (
                            <>
                                <Search className="h-4 w-4" />
                                Regular Search
                            </>
                        ) : (
                            <>
                                <Sparkles className="h-4 w-4" />
                                AI Search
                            </>
                        )}
                    </Button>
                </div>

                {/* AI Search Interface */}
                {aiMode ? (
                    <div className="mb-8">
                        <div className="bg-card border rounded-lg p-6 mb-6">
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-2 text-purple-500 mb-2">
                                    <Sparkles className="h-5 w-5" />
                                    <h2 className="text-xl font-medium">
                                        Describe what you're looking for
                                    </h2>
                                </div>

                                <Textarea
                                    placeholder="Describe the movie or show you're looking for in natural language. For example: 'A sci-fi movie with robots where humans fight for survival' or 'A romantic comedy set in New York with a happy ending'"
                                    className="min-h-[120px] text-base"
                                    value={aiPrompt}
                                    onChange={(e) =>
                                        setAiPrompt(e.target.value)
                                    }
                                />

                                <div className="flex justify-end">
                                    <Button
                                        onClick={handleAiSearch}
                                        disabled={
                                            isAiSearching || !aiPrompt.trim()
                                        }
                                        className="bg-purple-600 hover:bg-purple-700 text-white"
                                    >
                                        {isAiSearching ? (
                                            <>
                                                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                                                Searching...
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles className="mr-2 h-4 w-4" />
                                                Find Movies & Shows
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* AI Search Results */}
                        {aiResults.length > 0 && (
                            <div>
                                <h2 className="text-xl font-medium mb-4">
                                    AI Recommendations
                                </h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                                    {aiResults.map((movie) => (
                                        <MovieCard
                                            key={movie.id}
                                            movie={movie}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {/* Enhanced Regular Search Interface */}
                        <div className="bg-card border rounded-lg p-6 mb-8">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Search for movies, TV shows, actors..."
                                        className="pl-10 h-12 text-lg"
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="flex gap-2">
                                    <Select
                                        value={contentType}
                                        onValueChange={setContentType}
                                    >
                                        <SelectTrigger className="w-[140px]">
                                            <div className="flex items-center gap-2">
                                                <Film className="h-4 w-4" />
                                                <SelectValue placeholder="Content Type" />
                                            </div>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">
                                                All Content
                                            </SelectItem>
                                            <SelectItem value="movie">
                                                Movies
                                            </SelectItem>
                                            <SelectItem value="tv">
                                                TV Shows
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <Button
                                        variant={
                                            showFilters ? "default" : "outline"
                                        }
                                        onClick={() =>
                                            setShowFilters(!showFilters)
                                        }
                                        className="flex items-center gap-2"
                                    >
                                        <Filter className="h-4 w-4" />
                                        Filters
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Quick Filter Pills */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {genreList.slice(0, 8).map((genre) => (
                                <Badge
                                    key={genre}
                                    variant={
                                        selectedGenres.includes(genre)
                                            ? "default"
                                            : "outline"
                                    }
                                    className="cursor-pointer text-sm py-1.5 px-3"
                                    onClick={() => toggleGenre(genre)}
                                >
                                    {genre}
                                </Badge>
                            ))}

                            {!showFilters && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-sm"
                                    onClick={() => setShowFilters(true)}
                                >
                                    More Filters...
                                </Button>
                            )}
                        </div>

                        {/* Active Filters */}
                        {(selectedGenres.length > 0 ||
                            ratingRange[0] > 0 ||
                            ratingRange[1] < 10 ||
                            yearRange[0] !== 1970 ||
                            yearRange[1] !== 2025) && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {selectedGenres.map((genre) => (
                                    <Badge
                                        key={genre}
                                        variant="secondary"
                                        className="flex items-center gap-1"
                                    >
                                        {genre}
                                        <X
                                            className="h-3 w-3 cursor-pointer"
                                            onClick={() => toggleGenre(genre)}
                                        />
                                    </Badge>
                                ))}

                                {(ratingRange[0] > 0 ||
                                    ratingRange[1] < 10) && (
                                    <Badge
                                        variant="secondary"
                                        className="flex items-center gap-1"
                                    >
                                        {ratingRange[0]} - {ratingRange[1]}{" "}
                                        Rating
                                        <X
                                            className="h-3 w-3 cursor-pointer"
                                            onClick={() =>
                                                setRatingRange([0, 10])
                                            }
                                        />
                                    </Badge>
                                )}

                                {(yearRange[0] !== 1970 ||
                                    yearRange[1] !== 2025) && (
                                    <Badge
                                        variant="secondary"
                                        className="flex items-center gap-1"
                                    >
                                        {yearRange[0]} - {yearRange[1]}
                                        <X
                                            className="h-3 w-3 cursor-pointer"
                                            onClick={() =>
                                                setYearRange([1970, 2025])
                                            }
                                        />
                                    </Badge>
                                )}

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={resetFilters}
                                    className="h-6 px-2"
                                >
                                    Clear All
                                </Button>
                            </div>
                        )}

                        {/* Detailed Filters */}
                        {showFilters && (
                            <div className="bg-card border rounded-lg p-4 mb-8">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-medium">
                                        Advanced Filters
                                    </h2>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={resetFilters}
                                    >
                                        <X className="h-4 w-4 mr-1" /> Reset
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {/* Genre Filter */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Film className="h-4 w-4 text-primary" />
                                            <h3 className="font-medium">
                                                Genre
                                            </h3>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-2">
                                            {genreList.map((genre) => (
                                                <div
                                                    key={genre}
                                                    className="flex items-center space-x-2"
                                                >
                                                    <Checkbox
                                                        id={`genre-${genre}`}
                                                        checked={selectedGenres.includes(
                                                            genre
                                                        )}
                                                        onCheckedChange={() =>
                                                            toggleGenre(genre)
                                                        }
                                                    />
                                                    <Label
                                                        htmlFor={`genre-${genre}`}
                                                        className="text-sm"
                                                    >
                                                        {genre}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Year Range Filter */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Calendar className="h-4 w-4 text-primary" />
                                            <h3 className="font-medium">
                                                Year Range
                                            </h3>
                                        </div>
                                        <div className="px-2">
                                            <Slider
                                                defaultValue={yearRange}
                                                min={1970}
                                                max={2025}
                                                step={1}
                                                value={yearRange}
                                                onValueChange={(value) =>
                                                    setYearRange(
                                                        value as [
                                                            number,
                                                            number
                                                        ]
                                                    )
                                                }
                                                className="mb-2"
                                            />
                                            <div className="flex justify-between text-sm text-muted-foreground">
                                                <span>{yearRange[0]}</span>
                                                <span>{yearRange[1]}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Rating Range Filter */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Star className="h-4 w-4 text-primary" />
                                            <h3 className="font-medium">
                                                Rating Range
                                            </h3>
                                        </div>
                                        <div className="px-2">
                                            <Slider
                                                defaultValue={ratingRange}
                                                min={0}
                                                max={10}
                                                step={0.5}
                                                value={ratingRange}
                                                onValueChange={(value) =>
                                                    setRatingRange(
                                                        value as [
                                                            number,
                                                            number
                                                        ]
                                                    )
                                                }
                                                className="mb-2"
                                            />
                                            <div className="flex justify-between text-sm text-muted-foreground">
                                                <span>{ratingRange[0]}</span>
                                                <span>{ratingRange[1]}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sort By */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Clock className="h-4 w-4 text-primary" />
                                            <h3 className="font-medium">
                                                Sort By
                                            </h3>
                                        </div>
                                        <Select
                                            value={sortBy}
                                            onValueChange={setSortBy}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Sort by" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="relevance">
                                                    Relevance
                                                </SelectItem>
                                                <SelectItem value="title-asc">
                                                    Title (A-Z)
                                                </SelectItem>
                                                <SelectItem value="title-desc">
                                                    Title (Z-A)
                                                </SelectItem>
                                                <SelectItem value="year-desc">
                                                    Newest First
                                                </SelectItem>
                                                <SelectItem value="year-asc">
                                                    Oldest First
                                                </SelectItem>
                                                <SelectItem value="rating-desc">
                                                    Highest Rated
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Results */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-medium">
                                    {filteredMovies.length}{" "}
                                    {filteredMovies.length === 1
                                        ? "Result"
                                        : "Results"}
                                </h2>

                                <Select
                                    value={sortBy}
                                    onValueChange={setSortBy}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="relevance">
                                            Relevance
                                        </SelectItem>
                                        <SelectItem value="title-asc">
                                            Title (A-Z)
                                        </SelectItem>
                                        <SelectItem value="title-desc">
                                            Title (Z-A)
                                        </SelectItem>
                                        <SelectItem value="year-desc">
                                            Newest First
                                        </SelectItem>
                                        <SelectItem value="year-asc">
                                            Oldest First
                                        </SelectItem>
                                        <SelectItem value="rating-desc">
                                            Highest Rated
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {filteredMovies.length > 0 ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                                    {filteredMovies.map((movie) => (
                                        <MovieCard
                                            key={movie.id}
                                            movie={movie}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <h3 className="text-lg font-medium mb-2">
                                        No results found
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Try adjusting your search or filters to
                                        find what you're looking for.
                                    </p>
                                    <Button
                                        variant="outline"
                                        onClick={toggleSearchMode}
                                        className="mt-4 border-purple-500 text-purple-500 hover:bg-purple-500/10"
                                    >
                                        <Sparkles className="mr-2 h-4 w-4" />
                                        Try AI Search
                                    </Button>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}
