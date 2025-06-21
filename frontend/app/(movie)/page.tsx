import { MovieService } from '@/movie/services/movieService';
import { MovieList } from '@/movie/components/MovieList';
import Link from 'next/link';
import { Movie } from '@/models/interfaces/movie.interface';
import { IPagination } from '@/models/interfaces/pagination.interface';

interface MoviesPageProps {
    searchParams: Promise<{
        page?: string;
        limit?: string;
        search?: string;
    }>;
}

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
    const params = await searchParams;
    const page = parseInt(params.page || '1');
    const limit = parseInt(params.limit || '12');
    const search = params.search || '';

    let movies: Movie[] = [];
    let pagination: IPagination | null = null;
    let error: string | null = null;

    try {
        if (search.trim()) {
            // Search movies
            const response = await MovieService.getMovieByName(search, { page, limit });
            movies = response.data;
            pagination = response.pagination;
        } else {
            // Get all movies
            const response = await MovieService.getAllMovies({ page, limit });
            movies = response.data;
            pagination = response.pagination;
        }
    } catch (err) {
        error = err instanceof Error ? err.message : 'Failed to fetch movies';
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-600 mb-4">Error: {error}</div>
                    <Link
                        href="/"
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
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Movies</h1>
                    <p className="text-gray-600">Discover and explore your favorite movies</p>
                </header>

                <MovieList
                    initialMovies={movies}
                    initialPagination={pagination}
                    initialSearch={search}
                    initialPage={page}
                    initialLimit={limit}
                />
            </div>
        </div>
    );
}