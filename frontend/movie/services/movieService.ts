import { apiGet } from '@/lib/axios';
import { Movie } from '@/models/interfaces/movie.interface';
import { paginationResponse } from '@/models/interfaces/pagination.interface';

export interface MovieSearchParams {
    page?: number;
    limit?: number;
}

export class MovieService {
    // Get all movies with pagination
    static async getAllMovies(params?: MovieSearchParams): Promise<paginationResponse<Movie>> {
        const searchParams = new URLSearchParams();
        if (params?.page) searchParams.append('page', params.page.toString());
        if (params?.limit) searchParams.append('limit', params.limit.toString());

        const queryString = searchParams.toString();
        const url = queryString ? `/api/movie?${queryString}` : '/api/movie';

        return apiGet<paginationResponse<Movie>>(url);
    }

    // Get movies by name with pagination
    static async getMovieByName(movieName: string, params?: MovieSearchParams): Promise<paginationResponse<Movie>> {
        const searchParams = new URLSearchParams();
        if (params?.page) searchParams.append('page', params.page.toString());
        if (params?.limit) searchParams.append('limit', params.limit.toString());

        const queryString = searchParams.toString();
        const url = queryString
            ? `/api/movie/name/${encodeURIComponent(movieName)}?${queryString}`
            : `/api/movie/name/${encodeURIComponent(movieName)}`;

        return apiGet<paginationResponse<Movie>>(url);
    }

    // Get movie by ID
    static async getMovieById(movieId: string): Promise<Movie> {
        return apiGet<Movie>(`/api/movie/${movieId}`);
    }
} 