'use client';

import { Actor } from '@/models/interfaces/movie.interface';
import { IPagination } from '@/models/interfaces/pagination.interface';
import { SearchBar } from '@/shared/components/SearchBar';
import { ActorCard } from './ActorCard';
import { ActorCardSkeleton } from './ActorCardSkeleton';
import { Pagination } from '@/shared/components/Pagination';
import { PaginationInfo } from '@/shared/components/PaginationInfo';
import { PageSelector } from '@/shared/components/PageSelector';
import { useActors } from '../hooks/useActors';

interface ActorListProps {
    initialActors?: Actor[];
    initialPagination?: IPagination | null;
    initialSearch?: string;
    initialPage?: number;
    initialLimit?: number;
}

export const ActorList = ({
    initialActors = [],
    initialPagination = null,
    initialSearch = '',
    initialPage = 1,
    initialLimit = 12
}: ActorListProps) => {
    const {
        filteredActors,
        pagination,
        itemsPerPage,
        searchTerm,
        searchLoading,
        paginationLoading,
        error,
        handlePageChange,
        handleItemsPerPageChange,
        handleSearch,
        retry,
    } = useActors({
        initialActors,
        initialPagination,
        initialSearch,
        initialPage,
        initialLimit,
    });

    if (error && !searchLoading && !paginationLoading) {
        return (
            <div className="text-center py-8">
                <div className="text-red-600 mb-4">Error: {error}</div>
                <button
                    onClick={retry}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <>
            <SearchBar placeHolder="Search actors by name or movie name" onSearch={handleSearch} />

            {/* Search results info */}
            {searchTerm.trim() && (
                <div className="mt-4 text-sm text-gray-600">
                    Search results for: <span className="font-medium">"{searchTerm}"</span>
                </div>
            )}

            {/* Items per page selector */}
            {!searchLoading && pagination && (
                <div className="mt-6 flex flex-col items-center justify-between gap-4">
                    <div className="mb-4 ">
                        <PageSelector
                            value={itemsPerPage}
                            onChange={handleItemsPerPageChange}
                            disabled={paginationLoading}
                        />
                    </div>

                    <PaginationInfo
                        pagination={pagination}
                        loading={paginationLoading}
                        itemType="actors"
                    />
                </div>
            )}

            <div className="mt-8">
                {searchLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <ActorCardSkeleton key={index} />
                        ))}
                    </div>
                ) : filteredActors.length === 0 ? (
                    <div className="text-center py-8">
                        <div className="text-gray-500">
                            {searchTerm.trim() ? `No actors found for "${searchTerm}"` : 'No actors found'}
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredActors.map((actor) => (
                                <ActorCard key={actor.id} actor={actor} />
                            ))}
                        </div>

                        {pagination && !searchLoading && (
                            <Pagination
                                currentPage={pagination.page}
                                totalPages={pagination.totalPages}
                                onPageChange={handlePageChange}
                                hasNext={pagination.hasNext}
                                hasPrev={pagination.hasPrev}
                            />
                        )}
                    </>
                )}
            </div>
        </>
    );
}; 