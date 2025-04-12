"use client"

import Link from "next/link"
import { User, Settings, CreditCard, LogOut, Heart, Bookmark, History } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface ProfileSidebarProps {
  activePage: "profile" | "watchlist" | "favorites" | "history" | "settings" | "billing"
}

export function ProfileSidebar({ activePage }: ProfileSidebarProps) {
  return (
    <div className="md:w-64 flex-shrink-0">
      <nav className="space-y-1">
        <Link
          href="/profile"
          className={`flex items-center px-3 py-2 rounded-md ${
            activePage === "profile"
              ? "bg-primary/10 text-primary font-medium"
              : "hover:bg-muted text-muted-foreground hover:text-foreground"
          }`}
        >
          <User className="mr-2 h-4 w-4" />
          Profile
        </Link>
        <Link
          href="/profile/watchlist"
          className={`flex items-center px-3 py-2 rounded-md ${
            activePage === "watchlist"
              ? "bg-primary/10 text-primary font-medium"
              : "hover:bg-muted text-muted-foreground hover:text-foreground"
          }`}
        >
          <Bookmark className="mr-2 h-4 w-4" />
          Watchlist
        </Link>
        <Link
          href="/profile/favorites"
          className={`flex items-center px-3 py-2 rounded-md ${
            activePage === "favorites"
              ? "bg-primary/10 text-primary font-medium"
              : "hover:bg-muted text-muted-foreground hover:text-foreground"
          }`}
        >
          <Heart className="mr-2 h-4 w-4" />
          Favorites
        </Link>
        <Link
          href="/profile/history"
          className={`flex items-center px-3 py-2 rounded-md ${
            activePage === "history"
              ? "bg-primary/10 text-primary font-medium"
              : "hover:bg-muted text-muted-foreground hover:text-foreground"
          }`}
        >
          <History className="mr-2 h-4 w-4" />
          Watch History
        </Link>
        <Separator className="my-2" />
        <Link
          href="/profile/settings"
          className={`flex items-center px-3 py-2 rounded-md ${
            activePage === "settings"
              ? "bg-primary/10 text-primary font-medium"
              : "hover:bg-muted text-muted-foreground hover:text-foreground"
          }`}
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Link>
        <Link
          href="/profile/billing"
          className={`flex items-center px-3 py-2 rounded-md ${
            activePage === "billing"
              ? "bg-primary/10 text-primary font-medium"
              : "hover:bg-muted text-muted-foreground hover:text-foreground"
          }`}
        >
          <CreditCard className="mr-2 h-4 w-4" />
          Billing
        </Link>
        <Link
          href="/logout"
          className="flex items-center px-3 py-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Link>
      </nav>
    </div>
  )
}

