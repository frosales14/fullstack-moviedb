import { useState, useEffect, useCallback } from 'react';
import { ActorService } from '@/actor/services/actorService';
import { Actor } from '@/models/interfaces/movie.interface';
import { IPagination } from '@/models/interfaces/pagination.interface';
import { useDebouncer } from '@/shared/hooks/useDebouncer';

interface UseActorsProps {
    initialActors?: Actor[];
    initialPagination?: IPagination | null;
    initialSearch?: string;
    initialPage?: number;
    initialLimit?: number;
}

interface UseActorsReturn {
    // State
    actors: Actor[];
    filteredActors: Actor[];
    pagination: IPagination | null;
    currentPage: number;
    itemsPerPage: number;
    searchTerm: string;
    loading: boolean;
    searchLoading: boolean;
    paginationLoading: boolean;
    error: string | null;

    // Actions
    handlePageChange: (page: number) => void;
    handleItemsPerPageChange: (limit: number) => void;
    handleSearch: (searchTerm: string) => void;
    retry: () => void;
}

export const useActors = ({
    initialActors = [],
    initialPagination = null,
    initialSearch = '',
    initialPage = 1,
    initialLimit = 12
}: UseActorsProps = {}): UseActorsReturn => {
    // State
    const [actors, setActors] = useState<Actor[]>(initialActors);
    const [filteredActors, setFilteredActors] = useState<Actor[]>(initialActors);
    const [loading, setLoading] = useState(initialActors.length === 0);
    const [searchLoading, setSearchLoading] = useState(false);
    const [paginationLoading, setPaginationLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState<IPagination | null>(initialPagination);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [itemsPerPage, setItemsPerPage] = useState(initialLimit);
    const [searchTerm, setSearchTerm] = useState(initialSearch);

    // Fetch actors
    const fetchActors = useCallback(async (page: number = 1, limit: number = 12) => {
        try {
            if (page === 1 && limit === 12 && actors.length === 0) {
                setLoading(true);
            } else {
                setPaginationLoading(true);
            }
            setError(null);
            const response = await ActorService.getAllActors({ page, limit });
            setActors(response.data);
            setFilteredActors(response.data);
            setPagination(response.pagination);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch actors');
        } finally {
            setLoading(false);
            setPaginationLoading(false);
        }
    }, [actors.length]);

    // Search actors
    const performSearch = useCallback(async (searchTerm: string, page: number = 1, limit: number = itemsPerPage) => {
        if (!searchTerm.trim()) {
            // When search is empty, fetch all actors again
            try {
                setSearchLoading(true);
                setError(null);
                const response = await ActorService.getAllActors({ page: 1, limit: itemsPerPage });
                setActors(response.data);
                setFilteredActors(response.data);
                setPagination(response.pagination);
                setCurrentPage(1);
                setSearchTerm('');
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch actors');
            } finally {
                setSearchLoading(false);
            }
            return;
        }

        try {
            setSearchLoading(true);
            setError(null);
            const response = await ActorService.getActorByName(searchTerm, { page, limit });
            setFilteredActors(response.data);
            setPagination(response.pagination);
            setCurrentPage(page);
            setSearchTerm(searchTerm);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to search actors');
            // Fallback to client-side filtering if API fails
            const filtered = actors.filter(actor =>
                actor.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredActors(filtered);
            setPagination(null);
        } finally {
            setSearchLoading(false);
        }
    }, [actors, itemsPerPage]);

    // Debounced search
    const debouncedSearch = useDebouncer(performSearch, 2000);

    // Page change handler
    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
        if (searchTerm.trim()) {
            // If searching, fetch search results for the new page
            performSearch(searchTerm, page);
        } else {
            // If not searching, fetch all actors for the new page
            fetchActors(page, itemsPerPage);
        }
    }, [searchTerm, itemsPerPage, performSearch, fetchActors]);

    // Items per page change handler
    const handleItemsPerPageChange = useCallback((limit: number) => {
        setItemsPerPage(limit);
        setCurrentPage(1);
        if (searchTerm.trim()) {
            // If searching, fetch search results with new limit
            performSearch(searchTerm, 1, limit);
        } else {
            // If not searching, fetch all actors with new limit
            fetchActors(1, limit);
        }
    }, [searchTerm, performSearch, fetchActors]);

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
            fetchActors(currentPage, itemsPerPage);
        }
    }, [searchTerm, currentPage, itemsPerPage, performSearch, fetchActors]);

    // Initial data fetch - only if no initial data provided
    useEffect(() => {
        if (initialActors.length === 0 && !searchTerm.trim()) {
            fetchActors(currentPage, itemsPerPage);
        }
    }, [currentPage, itemsPerPage, searchTerm, fetchActors, initialActors.length]);

    return {
        // State
        actors,
        filteredActors,
        pagination,
        currentPage,
        itemsPerPage,
        searchTerm,
        loading,
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