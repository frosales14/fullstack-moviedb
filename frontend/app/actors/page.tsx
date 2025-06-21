import { ActorList } from '@/actor/components/ActorList';
import { ActorService } from '@/actor/services/actorService';
import { Actor } from '@/models/interfaces/movie.interface';
import { IPagination } from '@/models/interfaces/pagination.interface';
import Link from 'next/link';

interface ActorsPageProps {
    searchParams: Promise<{
        page?: string;
        limit?: string;
        search?: string;
    }>;
}

export default async function ActorsPage({ searchParams }: ActorsPageProps) {
    const params = await searchParams;
    const page = parseInt(params.page || '1');
    const limit = parseInt(params.limit || '12');
    const search = params.search || '';

    let actors: Actor[] = [];
    let pagination: IPagination | null = null;
    let error: string | null = null;

    try {
        if (search.trim()) {
            // Search actors
            const response = await ActorService.getActorByName(search, { page, limit });
            actors = response.data;
            pagination = response.pagination;
        } else {
            // Get all actors
            const response = await ActorService.getAllActors({ page, limit });
            actors = response.data;
            pagination = response.pagination;
        }
    } catch (err) {
        error = err instanceof Error ? err.message : 'Failed to fetch actors';
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-600 mb-4">Error: {error}</div>
                    <Link
                        href="/actors"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Retry
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Actors</h1>
                    <p className="text-gray-600">Discover and explore your favorite actors</p>
                </header>

                <ActorList
                    initialActors={actors}
                    initialPagination={pagination}
                    initialSearch={search}
                    initialPage={page}
                    initialLimit={limit}
                />
            </div>
        </div>
    );
} 