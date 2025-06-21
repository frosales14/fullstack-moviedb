import { Actor } from '@/models/interfaces/movie.interface';
import { Clapperboard } from 'lucide-react';

interface ActorInfoProps {
    actor: Actor;
}

export const ActorInfo = ({ actor }: ActorInfoProps) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Actor Information</h2>
                    <div className="space-y-3">
                        <div>
                            <span className="text-sm font-medium text-gray-500">Name:</span>
                            <p className="text-gray-900">{actor.name}</p>
                        </div>
                        <div>
                            <span className="text-sm font-medium text-gray-500">Status:</span>
                            <p className="text-gray-900">{actor.isActive ? 'Active' : 'Inactive'}</p>
                        </div>
                        <div>
                            <span className="text-sm font-medium text-gray-500">ID:</span>
                            <p className="text-gray-900 font-mono text-sm">{actor.id}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Movies</h2>
                    <div className="flex items-center space-x-2 mb-4">
                        <Clapperboard className="w-5 h-5 text-blue-500" />
                        <span className="text-lg font-medium text-gray-900">{actor.movies.length} movies</span>
                    </div>
                </div>
            </div>
        </div>
    );
}; 