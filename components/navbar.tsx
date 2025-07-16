"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { allMovies } from "@/lib/data";
import { getSearchSuggestions } from "@/app/actions/searchActions";
import { set } from "date-fns";
import { useDebouncedCallback } from "use-debounce";

export function Navbar() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState<typeof allMovies>([]);
    const searchRef = useRef<HTMLDivElement>(null);

    // Handle click outside to close suggestions
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target as Node)
            ) {
                setShowSuggestions(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handelSearchChange = useDebouncedCallback(
        async (searchQuery: string) => {
            if (searchQuery.length > 1) {
                const movieSuggestions = await getSearchSuggestions(
                    searchQuery
                );
                setSuggestions(movieSuggestions);
                setShowSuggestions(movieSuggestions.length > 0);
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        },
        250
    );

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setShowSuggestions(false);
        } else {
            router.push("/search");
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (suggestion: (typeof allMovies)[0]) => {
        setSearchQuery(suggestion.title);
        const path =
            suggestion.type === "tv"
                ? `/tv/${suggestion.id}`
                : `/movie/${suggestion.id}`;
        router.push(path);
        setShowSuggestions(false);
    };

    return (
        <header className="w-full border-b sticky top-0 bg-background z-50">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden"
                            >
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <div className="flex flex-col space-y-4 mt-8">
                                <Link
                                    href="/"
                                    className="text-lg font-medium hover:text-primary"
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/search?type=movie"
                                    className="text-lg font-medium hover:text-primary"
                                >
                                    Movies
                                </Link>
                                <Link
                                    href="/search?type=tv"
                                    className="text-lg font-medium hover:text-primary"
                                >
                                    TV Shows
                                </Link>
                                <Link
                                    href="/news"
                                    className="text-lg font-medium hover:text-primary"
                                >
                                    News
                                </Link>
                                <Link
                                    href="/search"
                                    className="text-lg font-medium hover:text-primary flex items-center gap-2"
                                >
                                    <Search className="h-5 w-5" />
                                    Search
                                </Link>
                            </div>
                        </SheetContent>
                    </Sheet>

                    <Link
                        href="/"
                        className="text-2xl font-black text-primary ml-2 md:ml-0"
                    >
                        Baz
                        <span className="text-white">Movies</span>
                    </Link>
                </div>

                <div className="hidden md:flex items-center space-x-6">
                    <Link
                        href="/"
                        className="text-sm font-medium hover:text-primary"
                    >
                        Home
                    </Link>
                    <Link
                        href="/search?type=movie"
                        className="text-sm font-medium hover:text-primary"
                    >
                        Movies
                    </Link>
                    <Link
                        href="/search?type=tv"
                        className="text-sm font-medium hover:text-primary"
                    >
                        TV Shows
                    </Link>
                    <Link
                        href="/news"
                        className="text-sm font-medium hover:text-primary"
                    >
                        News
                    </Link>
                </div>

                <div className="flex items-center space-x-4">
                    <div
                        ref={searchRef}
                        className="relative hidden md:flex items-center"
                    >
                        <form
                            onSubmit={handleSearch}
                            className="flex items-center"
                        >
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search movies..."
                                    className="w-[200px] pl-8 md:w-[250px] lg:w-[300px] pr-10"
                                    onChange={(e) =>
                                        handelSearchChange(e.target.value)
                                    }
                                    onFocus={() => {
                                        if (suggestions.length > 0) {
                                            setShowSuggestions(true);
                                        }
                                    }}
                                />
                            </div>
                            <Button type="submit" size="icon" className="ml-2">
                                <Search className="h-4 w-4" />
                                <span className="sr-only">Search</span>
                            </Button>
                        </form>

                        {/* Enhanced Autocomplete suggestions */}
                        {showSuggestions && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-card border rounded-md shadow-lg z-50">
                                <ul className="py-1">
                                    {suggestions.map((suggestion, index) => (
                                        <li
                                            key={index}
                                            className="px-2 py-2 hover:bg-muted cursor-pointer"
                                            onClick={() =>
                                                handleSuggestionClick(
                                                    suggestion
                                                )
                                            }
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className="relative w-10 h-14 flex-shrink-0">
                                                    <Image
                                                        src={
                                                            suggestion.posterUrl ||
                                                            "/placeholder.svg"
                                                        }
                                                        alt={suggestion.title}
                                                        fill
                                                        className="object-cover rounded"
                                                    />
                                                </div>
                                                <div>
                                                    <div className="font-medium">
                                                        {suggestion.title}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                                                        <span>
                                                            {suggestion.year}
                                                        </span>
                                                        <span>•</span>
                                                        <span>
                                                            {suggestion.type ===
                                                            "tv"
                                                                ? "TV Show"
                                                                : "Movie"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <Link href="/search" className="md:hidden">
                        <Button variant="ghost" size="icon">
                            <Search className="h-5 w-5" />
                            <span className="sr-only">Search</span>
                        </Button>
                    </Link>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full"
                            >
                                <User className="h-5 w-5" />
                                <span className="sr-only">User menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href="/login">Sign In</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/signup">Sign Up</Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
