import { useState, useEffect } from 'react';
import { ActorService } from '@/actor/services/actorService';
import { Actor } from '@/models/interfaces/movie.interface';

interface UseActorProps {
    id: string;
}

interface UseActorReturn {
    actor: Actor | null;
    loading: boolean;
    error: string | null;
    retry: () => void;
}

export const useActor = ({ id }: UseActorProps): UseActorReturn => {
    const [actor, setActor] = useState<Actor | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchActor = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await ActorService.getActorById(id);
            setActor(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch actor');
        } finally {
            setLoading(false);
        }
    };

    const retry = () => {
        fetchActor();
    };

    useEffect(() => {
        fetchActor();
    }, [id]);

    return {
        actor,
        loading,
        error,
        retry,
    };
}; 