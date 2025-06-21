import { Actor } from '@/models/interfaces/movie.interface';

export const ActorHeader = ({ actor }: { actor: Actor }) => (
    <header className="mb-8">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{actor.name}</h1>
                <p className="text-gray-600">Actor Details</p>
            </div>
            <span className={`px-4 py-2 text-sm font-medium rounded-full ${actor.isActive
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
                }`}>
                {actor.isActive ? 'Active' : 'Inactive'}
            </span>
        </div>
    </header>
);