import { useState, useEffect, use } from 'react';
import { MovieService } from '@/movie/services/movieService';
import { Movie } from '@/models/interfaces/movie.interface';

interface UseMovieProps {
    id: string;
}

interface UseMovieReturn {
    movie: Movie | null;
    loading: boolean;
    error: string | null;
    imageError: boolean;
    activeTab: 'reviews' | 'actors';
    averageRating: number;
    retry: () => void;
    setActiveTab: (tab: 'reviews' | 'actors') => void;
    setImageError: (error: boolean) => void;
}

export const useMovie = ({ id }: UseMovieProps): UseMovieReturn => {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [imageError, setImageError] = useState(false);
    const [activeTab, setActiveTab] = useState<'reviews' | 'actors'>('reviews');

    const fetchMovie = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await MovieService.getMovieById(id);
            setMovie(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch movie');
        } finally {
            setLoading(false);
        }
    };

    const retry = () => {
        fetchMovie();
    };

    useEffect(() => {
        fetchMovie();
    }, [id]);

    const averageRating = movie?.ratings.length
        ? movie.ratings.reduce((sum, rating) => sum + rating.rating, 0) / movie.ratings.length
        : 0;

    return {
        movie,
        loading,
        error,
        imageError,
        activeTab,
        averageRating,
        retry,
        setActiveTab,
        setImageError,
    };
}; 