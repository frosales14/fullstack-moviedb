import { apiGet } from '@/lib/axios';
import { Actor } from '@/models/interfaces/movie.interface';
import { paginationResponse } from '@/models/interfaces/pagination.interface';

export interface ActorSearchParams {
    page?: number;
    limit?: number;
}

export class ActorService {
    // Get all actors with pagination
    static async getAllActors(params?: ActorSearchParams): Promise<paginationResponse<Actor>> {
        const searchParams = new URLSearchParams();
        if (params?.page) searchParams.append('page', params.page.toString());
        if (params?.limit) searchParams.append('limit', params.limit.toString());

        const queryString = searchParams.toString();
        const url = queryString ? `/api/actor?${queryString}` : '/api/actor';

        return apiGet<paginationResponse<Actor>>(url);
    }

    // Get actors by name with pagination
    static async getActorByName(actorName: string, params?: ActorSearchParams): Promise<paginationResponse<Actor>> {
        const searchParams = new URLSearchParams();
        if (params?.page) searchParams.append('page', params.page.toString());
        if (params?.limit) searchParams.append('limit', params.limit.toString());

        const queryString = searchParams.toString();
        const url = queryString
            ? `/api/actor/name/${encodeURIComponent(actorName)}?${queryString}`
            : `/api/actor/name/${encodeURIComponent(actorName)}`;

        return apiGet<paginationResponse<Actor>>(url);
    }

    // Get actor by ID
    static async getActorById(actorId: string): Promise<Actor> {
        return apiGet<Actor>(`/api/actor/${actorId}`);
    }
} 