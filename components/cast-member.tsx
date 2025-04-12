import Image from "next/image"
import Link from "next/link"
import type { Cast } from "@/lib/types"

interface CastMemberProps {
  cast: Cast
}

export function CastMember({ cast }: CastMemberProps) {
  return (
    <Link href="#" className="group">
      <div className="flex flex-col items-center text-center">
        <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden mb-2 border-2 border-transparent group-hover:border-primary transition-all">
          <Image src={cast.photoUrl || "/placeholder.svg"} alt={cast.name} fill className="object-cover" />
        </div>
        <h4 className="font-medium text-sm group-hover:text-primary transition-colors">{cast.name}</h4>
        <p className="text-xs text-muted-foreground">{cast.character}</p>
      </div>
    </Link>
  )
}

