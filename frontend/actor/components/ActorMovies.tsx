import Link from 'next/link';
import { Actor } from '@/models/interfaces/movie.interface';

interface ActorMoviesProps {
    actor: Actor;
}

export const ActorMovies = ({ actor }: ActorMoviesProps) => {
    if (actor.movies.length === 0) {
        return (
            <div className="text-center py-8">
                <div className="text-gray-500">No movies found for this actor</div>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Movies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {actor.movies.map((movie) => (
                    <Link key={movie.id} href={`/${movie.id}`} className="block">
                        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{movie.name}</h3>
                            <p className="text-gray-600 text-sm mb-3">{movie.description}</p>
                            <div className="flex items-center justify-between">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${movie.isActive
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-800'
                                    }`}>
                                    {movie.isActive ? 'Active' : 'Inactive'}
                                </span>
                                <span className="text-xs text-gray-500 font-mono">{movie.id.slice(0, 8)}...</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}; 