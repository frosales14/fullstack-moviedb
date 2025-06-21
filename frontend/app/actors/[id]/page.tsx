'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { useActor } from '@/actor/hooks/useActor';
import { ActorInfo } from '@/actor/components/ActorInfo';
import { ActorMovies } from '@/actor/components/ActorMovies';
import { ActorHeader } from '@/actor/components/ActorHeader';

interface ActorDetailPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default function ActorDetailPage({ params }: ActorDetailPageProps) {
    const { id } = use(params);
    const router = useRouter();
    const { actor, loading, error, retry } = useActor({ id });

    const handleBack = () => {
        router.back();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-lg">Loading actor...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-600 mb-4">Error: {error}</div>
                    <button
                        onClick={retry}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-4"
                    >
                        Retry
                    </button>
                    <button
                        onClick={handleBack}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    if (!actor) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-gray-500 mb-4">Actor not found</div>
                    <button
                        onClick={handleBack}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                {/* Back Button */}
                <div className="mb-6">
                    <button
                        onClick={handleBack}
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back
                    </button>
                </div>

                {/* Actor Header */}
                <ActorHeader actor={actor} />

                {/* Actor Information */}
                <ActorInfo actor={actor} />

                {/* Movies List */}
                <ActorMovies actor={actor} />

            </div>
        </div>
    );
} 