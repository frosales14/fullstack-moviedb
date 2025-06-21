export interface IPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export interface paginationResponse<T> {
    data: T[];
    pagination: IPagination;
}