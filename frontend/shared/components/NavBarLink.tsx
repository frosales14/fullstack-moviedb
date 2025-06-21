'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const NavBarLinks = () => {
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname === path;
    };
    return (
        <div className="flex items-center space-x-8">
            <Link
                href="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/')
                    ? 'bg-white text-blue-700'
                    : 'text-blue-100 hover:text-white hover:bg-blue-500'
                    }`}
            >
                Movies
            </Link>
            <Link
                href="/actors"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/actors')
                    ? 'bg-white text-blue-700'
                    : 'text-blue-100 hover:text-white hover:bg-blue-500'
                    }`}
            >
                Actors
            </Link>
        </div>
    )
}