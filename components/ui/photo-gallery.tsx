"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, X } from "lucide-react";
import { cn } from "@/lib/utils";
interface movieMediaProps {
    type: string;
    url: string;
    alt: string;
}
[];

const PhotoGallery = ({ movieMedia }: { movieMedia: movieMediaProps[] }) => {
    // State for media gallery
    const [showGallery, setShowGallery] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);

    const nextImage = () => {
        setCurrentImage((prev) =>
            prev === movieMedia.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentImage((prev) =>
            prev === 0 ? movieMedia.length - 1 : prev - 1
        );
    };
    return (
        <>
            <div
                className="animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
            >
                <h3 className="text-xl font-bold mb-4">Photos</h3>
                <div className="relative">
                    <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-thin scrollbar-thumb-primary scrollbar-track-muted">
                        {movieMedia.map((media, index) => (
                            <div
                                key={index}
                                className="relative flex-shrink-0 w-72 aspect-video rounded-lg overflow-hidden cursor-pointer group"
                                onClick={() => {
                                    setCurrentImage(index);
                                    setShowGallery(true);
                                }}
                            >
                                <Image
                                    src={media.url || "/placeholder.svg"}
                                    alt={media.alt}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Button variant="secondary" size="sm">
                                        View
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Fullscreen Gallery Modal */}
            {showGallery && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
                    <div className="relative w-full max-w-6xl mx-auto">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-4 right-4 text-white z-10 rounded-full bg-black/50"
                            onClick={() => setShowGallery(false)}
                        >
                            <X className="h-6 w-6" />
                        </Button>

                        <div className="relative aspect-video">
                            <Image
                                src={
                                    movieMedia[currentImage].url ||
                                    "/placeholder.svg"
                                }
                                alt={movieMedia[currentImage].alt}
                                fill
                                className="object-contain"
                            />
                        </div>

                        <div className="absolute inset-y-0 left-4 flex items-center">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full bg-black/50 text-white"
                                onClick={prevImage}
                            >
                                <ChevronLeft className="h-8 w-8" />
                            </Button>
                        </div>

                        <div className="absolute inset-y-0 right-4 flex items-center">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full bg-black/50 text-white"
                                onClick={nextImage}
                            >
                                <ChevronRight className="h-8 w-8" />
                            </Button>
                        </div>

                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                            {movieMedia.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImage(index)}
                                    className={cn(
                                        "w-2 h-2 rounded-full transition-all",
                                        index === currentImage
                                            ? "bg-white w-4"
                                            : "bg-white/50"
                                    )}
                                    aria-label={`Go to image ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PhotoGallery;
