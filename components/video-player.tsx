"use client"

import { useState } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

interface VideoPlayerProps {
  videoUrl: string
}

export function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(true)

  // In a real app, you would track progress, handle fullscreen, etc.

  return (
    <div
      className="relative aspect-video max-w-full mx-auto bg-black"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        src={videoUrl}
        poster="/placeholder.svg?height=720&width=1280"
        className="w-full h-full"
        onClick={() => setIsPlaying(!isPlaying)}
        muted={isMuted}
      />

      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300",
          showControls ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="flex flex-col gap-2">
          <Slider defaultValue={[0]} max={100} step={1} className="w-full" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button className="p-1 rounded-full hover:bg-white/10" onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? <Pause className="h-5 w-5 text-white" /> : <Play className="h-5 w-5 text-white" />}
              </button>

              <button className="p-1 rounded-full hover:bg-white/10">
                <SkipBack className="h-5 w-5 text-white" />
              </button>

              <button className="p-1 rounded-full hover:bg-white/10">
                <SkipForward className="h-5 w-5 text-white" />
              </button>

              <button className="p-1 rounded-full hover:bg-white/10" onClick={() => setIsMuted(!isMuted)}>
                {isMuted ? <VolumeX className="h-5 w-5 text-white" /> : <Volume2 className="h-5 w-5 text-white" />}
              </button>

              <span className="text-xs text-white">00:00 / 02:30</span>
            </div>

            <div>
              <button className="p-1 rounded-full hover:bg-white/10">
                <Maximize className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

