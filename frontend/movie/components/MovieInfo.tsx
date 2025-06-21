import { Movie } from '@/models/interfaces/movie.interface';
import { Star, MessageCircle, Contact } from 'lucide-react';

interface MovieInfoProps {
    movie: Movie;
    averageRating: number;
}

export const MovieInfo = ({ movie, averageRating }: MovieInfoProps) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Movie Information</h2>
                    <div className="space-y-3">
                        <div>
                            <span className="text-sm font-medium text-gray-500">Name:</span>
                            <p className="text-gray-900">{movie.name}</p>
                        </div>
                        <div>
                            <span className="text-sm font-medium text-gray-500">Description:</span>
                            <p className="text-gray-900">{movie.description}</p>
                        </div>
                        <div>
                            <span className="text-sm font-medium text-gray-500">Status:</span>
                            <p className="text-gray-900">{movie.isActive ? 'Active' : 'Inactive'}</p>
                        </div>
                        <div>
                            <span className="text-sm font-medium text-gray-500">ID:</span>
                            <p className="text-gray-900 font-mono text-sm">{movie.id}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Statistics</h2>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <Star className="w-5 h-5 text-yellow-400" />
                            <span className="text-lg font-medium text-gray-900">
                                {averageRating.toFixed(1)}/10
                            </span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <MessageCircle className="w-5 h-5 text-blue-500" />
                            <span className="text-lg font-medium text-gray-900">
                                {movie.ratings.length} reviews
                            </span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Contact className="w-5 h-5 text-blue-500" />
                            <span className="text-lg font-medium text-gray-900">
                                {movie.actors.length} actors
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}; 