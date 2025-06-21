import Link from 'next/link';
import { Star } from 'lucide-react';
import { Movie } from '@/models/interfaces/movie.interface';

interface MovieTabsProps {
    movie: Movie;
    activeTab: 'reviews' | 'actors';
    setActiveTab: (tab: 'reviews' | 'actors') => void;
}

export const MovieTabs = ({ movie, activeTab, setActiveTab }: MovieTabsProps) => (
    <div className="mb-8">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
                <button
                    onClick={() => setActiveTab('reviews')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'reviews'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                >
                    Reviews & Ratings ({movie.ratings.length})
                </button>
                <button
                    onClick={() => setActiveTab('actors')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'actors'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                >
                    Cast ({movie.actors.length})
                </button>
            </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'reviews' && (
            <div>
                {movie.ratings.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {movie.ratings.map((rating) => (
                            <div key={rating.id} className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-2">
                                        <Star className="w-4 h-4 text-yellow-400" />
                                        <span className="font-medium text-gray-900">{rating.rating}/10</span>
                                    </div>
                                    <span className="text-xs text-gray-500 font-mono">{rating.id.slice(0, 8)}...</span>
                                </div>
                                <p className="text-gray-600 text-sm">{rating.review}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <div className="text-gray-500">No reviews found for this movie</div>
                    </div>
                )}
            </div>
        )}

        {activeTab === 'actors' && (
            <div>
                {movie.actors.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {movie.actors.map((actor) => (
                            <Link key={actor.id} href={`/actors/${actor.id}`} className="block">
                                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{actor.name}</h3>
                                    <div className="flex items-center justify-between">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${actor.isActive
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {actor.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                        <span className="text-xs text-gray-500 font-mono">{actor.id.slice(0, 8)}...</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <div className="text-gray-500">No actors found for this movie</div>
                    </div>
                )}
            </div>
        )}
    </div>
); 