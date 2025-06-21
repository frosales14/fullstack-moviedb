import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Movie } from '@/models/interfaces/movie.interface';
import { IPagination } from '@/models/interfaces/pagination.interface';
import { MovieService } from '@/movie/services/movieService';
import { useDebouncer } from '@/shared/hooks/useDebouncer';

interface UseMoviesProps {
    initialMovies: Movie[];
    initialPagination: IPagination | null;
    initialSearch?: string;
    initialPage?: number;
    initialLimit?: number;
}

interface UseMoviesReturn {
    // State
    movies: Movie[];
    filteredMovies: Movie[];
    pagination: IPagination | null;
    currentPage: number;
    itemsPerPage: number;
    searchTerm: string;
    searchLoading: boolean;
    paginationLoading: boolean;
    error: string | null;

    // Actions
    handlePageChange: (page: number) => void;
    handleItemsPerPageChange: (limit: number) => void;
    handleSearch: (searchTerm: string) => void;
    retry: () => void;
}

export const useMovies = ({
    initialMovies,
    initialPagination,
    initialSearch = '',
    initialPage = 1,
    initialLimit = 12
}: UseMoviesProps): UseMoviesReturn => {
    const router = useRouter();

    // State
    const [movies, setMovies] = useState<Movie[]>(initialMovies);
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>(initialMovies);
    const [searchLoading, setSearchLoading] = useState(false);
    const [paginationLoading, setPaginationLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState<IPagination | null>(initialPagination);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [itemsPerPage, setItemsPerPage] = useState(initialLimit);
    const [searchTerm, setSearchTerm] = useState(initialSearch);

    // URL update helper
    const updateURL = useCallback((page: number, limit: number, search: string) => {
        const params = new URLSearchParams();
        if (page > 1) params.set('page', page.toString());
        if (limit !== 12) params.set('limit', limit.toString());
        if (search.trim()) params.set('search', search.trim());

        const queryString = params.toString();
        const newURL = queryString ? `/?${queryString}` : '/';
        router.push(newURL, { scroll: false });
    }, [router]);

    // Fetch movies
    const fetchMovies = useCallback(async (page: number = 1, limit: number = 12) => {
        try {
            setPaginationLoading(true);
            setError(null);
            const response = await MovieService.getAllMovies({ page, limit });
            setMovies(response.data);
            setFilteredMovies(response.data);
            setPagination(response.pagination);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch movies');
        } finally {
            setPaginationLoading(false);
        }
    }, []);

    // Search movies
    const performSearch = useCallback(async (searchTerm: string, page: number = 1, limit: number = itemsPerPage) => {
        if (!searchTerm.trim()) {
            try {
                setSearchLoading(true);
                setError(null);
                const response = await MovieService.getAllMovies({ page: 1, limit: itemsPerPage });
                setMovies(response.data);
                setFilteredMovies(response.data);
                setPagination(response.pagination);
                setCurrentPage(1);
                setSearchTerm('');
                updateURL(1, itemsPerPage, '');
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch movies');
            } finally {
                setSearchLoading(false);
            }
            return;
        }

        try {
            setSearchLoading(true);
            setError(null);
            const response = await MovieService.getMovieByName(searchTerm, { page, limit });
            setFilteredMovies(response.data);
            setPagination(response.pagination);
            setCurrentPage(page);
            setSearchTerm(searchTerm);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to search movies');
            // Fallback to client-side filtering if API fails
            const filtered = movies.filter(movie =>
                movie.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                movie.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredMovies(filtered);
            setPagination(null);
        } finally {
            setSearchLoading(false);
        }
    }, [movies, itemsPerPage, updateURL]);

    // Debounced search
    const debouncedSearch = useDebouncer(performSearch, 2000);

    // Page change handler
    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
        if (searchTerm.trim()) {
            performSearch(searchTerm, page);
        } else {
            fetchMovies(page, itemsPerPage);
        }
        updateURL(page, itemsPerPage, searchTerm);
    }, [searchTerm, itemsPerPage, performSearch, fetchMovies, updateURL]);

    // Items per page change handler
    const handleItemsPerPageChange = useCallback((limit: number) => {
        setItemsPerPage(limit);
        setCurrentPage(1);
        if (searchTerm.trim()) {
            performSearch(searchTerm, 1, limit);
        } else {
            fetchMovies(1, limit);
        }
        updateURL(1, limit, searchTerm);
    }, [searchTerm, performSearch, fetchMovies, updateURL]);

    // Search handler
    const handleSearch = useCallback((searchTerm: string) => {
        if (searchTerm.trim()) {
            setSearchLoading(true);
        } else {
            setSearchLoading(true);
        }
        debouncedSearch(searchTerm);
    }, [debouncedSearch]);

    // Retry handler
    const retry = useCallback(() => {
        if (searchTerm.trim()) {
            performSearch(searchTerm, currentPage, itemsPerPage);
        } else {
            fetchMovies(currentPage, itemsPerPage);
        }
    }, [searchTerm, currentPage, itemsPerPage, performSearch, fetchMovies]);

    return {
        // State
        movies,
        filteredMovies,
        pagination,
        currentPage,
        itemsPerPage,
        searchTerm,
        searchLoading,
        paginationLoading,
        error,

        // Actions
        handlePageChange,
        handleItemsPerPageChange,
        handleSearch,
        retry,
    };
}; 