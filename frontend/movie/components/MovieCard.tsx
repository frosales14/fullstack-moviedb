'use client';

import { Movie } from '@/models/interfaces/movie.interface';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Star } from 'lucide-react';

interface MovieCardProps {
    movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
    const [imageError, setImageError] = useState(false);
    const averageRating = movie.ratings.length > 0
        ? movie.ratings.reduce((sum, rating) => sum + rating.rating, 0) / movie.ratings.length
        : 0;

    return (
        <Link href={`/${movie.id}`} className="block">
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden cursor-pointer">
                <div className="p-6">
                    {/* Header with Name and Status */}
                    <div className="flex items-start justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1">
                            {movie.name}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ml-2 flex-shrink-0 ${movie.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                            }`}>
                            {movie.isActive ? 'Active' : 'Inactive'}
                        </span>
                    </div>

                    {/* Movie Image */}
                    <div className="relative w-48 aspect-[9/16] bg-gray-200 mx-auto mb-4">
                        {!imageError ? (
                            <Image
                                src={movie.imgUrl}
                                alt={movie.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                onError={() => setImageError(true)}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                </svg>
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {movie.description}
                    </p>

                    {/* Rating and Reviews */}
                    <div className="flex items-center justify-between text-sm mb-3">
                        <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span className="font-medium text-gray-900">
                                {averageRating.toFixed(1)}
                            </span>
                            <span className="text-gray-500">/10</span>
                        </div>

                        <div className="text-gray-500">
                            {movie.ratings.length} reviews
                        </div>
                    </div>

                    {/* Actors */}
                    {movie.actors.length > 0 && (
                        <div className="pt-3 border-t border-gray-100">
                            <div className="text-xs text-gray-500 mb-1">Actors:</div>
                            <div className="flex flex-wrap gap-1">
                                {movie.actors.slice(0, 3).map((actor) => (
                                    <span
                                        key={actor.id}
                                        className={`px-2 py-1 text-xs rounded-full ${actor.isActive
                                            ? 'bg-blue-100 text-blue-800'
                                            : 'bg-gray-100 text-gray-600'
                                            }`}
                                    >
                                        {actor.name}
                                    </span>
                                ))}
                                {movie.actors.length > 3 && (
                                    <span className="px-2 py-1 text-xs text-gray-500">
                                        +{movie.actors.length - 3} more
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}; 