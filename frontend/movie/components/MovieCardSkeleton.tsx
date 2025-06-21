export const MovieCardSkeleton = () => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="p-6">
                {/* Header with Name and Status */}
                <div className="flex items-start justify-between mb-4">
                    <div className="h-6 bg-gray-200 rounded w-3/4 flex-1"></div>
                    <div className="h-6 bg-gray-200 rounded w-16 ml-2 flex-shrink-0"></div>
                </div>

                {/* Movie Image */}
                <div className="relative w-48 aspect-[9/16] bg-gray-200 mx-auto mb-4"></div>

                {/* Description */}
                <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>

                {/* Rating and Reviews */}
                <div className="flex items-center justify-between text-sm mb-3">
                    <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-8"></div>
                        <div className="h-4 bg-gray-200 rounded w-6"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>

                {/* Actors */}
                <div className="pt-3 border-t border-gray-100">
                    <div className="h-3 bg-gray-200 rounded w-12 mb-2"></div>
                    <div className="flex flex-wrap gap-1">
                        <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                        <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                        <div className="h-6 bg-gray-200 rounded-full w-14"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}; 