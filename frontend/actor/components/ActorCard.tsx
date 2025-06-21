'use client';

import { Actor } from '@/models/interfaces/movie.interface';
import Link from 'next/link';

import { Contact } from 'lucide-react';

interface ActorCardProps {
    actor: Actor;
}

export const ActorCard = ({ actor }: ActorCardProps) => {
    return (
        <Link href={`/actors/${actor.id}`} className="block">
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden cursor-pointer">
                <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                            {actor.name}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${actor.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                            }`}>
                            {actor.isActive ? 'Active' : 'Inactive'}
                        </span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <span className="flex items-center space-x-1">
                            <Contact className="w-4 h-4 text-blue-500" />
                            <span>{actor.movies.length} movies</span>
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}; 