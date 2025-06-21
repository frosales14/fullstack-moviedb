export const ActorCardSkeleton = () => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="p-6">
                {/* Name and status badge */}
                <div className="flex items-start justify-between mb-4">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                </div>

                {/* ID */}
                <div className="flex items-center justify-between">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
            </div>
        </div>
    );
}; 