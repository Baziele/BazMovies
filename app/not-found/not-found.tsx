import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
            <h1 className="text-9xl font-bold text-primary">4004</h1>
            <h2 className="text-3xl font-bold mt-6 mb-2">Page Not Found</h2>
            <p className="text-xl text-muted-foreground mb-8">
                Looks like this scene didn't make the final cut.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                    <Link href="/" className="flex items-center gap-2">
                        <Home className="h-5 w-5" />
                        Back to Home
                    </Link>
                </Button>
                <Button variant="outline" asChild size="lg">
                    <Link href="/search" className="flex items-center gap-2">
                        <Search className="h-5 w-5" />
                        Find Movies
                    </Link>
                </Button>
            </div>

            <div className="mt-12 text-muted-foreground">
                <p>Error Code: SCENE_404_NOT_FOUND</p>
            </div>
        </div>
    );
}
