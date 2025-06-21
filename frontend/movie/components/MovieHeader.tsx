import Image from 'next/image';
import { Movie } from '@/models/interfaces/movie.interface';

interface MovieHeaderProps {
    movie: Movie;
    imageError: boolean;
    onImageError: () => void;
}

export const MovieHeader = ({ movie, imageError, onImageError }: MovieHeaderProps) => {
    return (
        <header className="mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Movie Image */}
                <div className="relative w-48 aspect-[9/16] bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    {!imageError ? (
                        <Image
                            src={movie.imgUrl}
                            alt={movie.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 192px"
                            onError={onImageError}
                            priority
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                            <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                        </div>
                    )}
                </div>

                <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <h1 className="text-4xl font-bold text-gray-900">{movie.name}</h1>
                        <span className={`px-4 py-2 text-sm font-medium rounded-full ${movie.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                            }`}>
                            {movie.isActive ? 'Active' : 'Inactive'}
                        </span>
                    </div>
                    <p className="text-gray-600 text-lg">{movie.description}</p>
                </div>
            </div>
        </header>
    );
}; 